import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { CartItem } from "../models/cart-item.model";
import { CurrencyConversionOption } from "../models/currency-conversion-option.model";
import { Product } from "../models/product.model";
import { ShoppingCart } from "../models/shopping-cart.model";
import { CurrencyConversionOptionsDataService } from "../services/currency-conversion-options.service";
import { ProductsDataService } from "../services/products.service";
import { PopulatedCartRouteGuard } from '../route-guards/populated-cart.route-guard';


const CART_KEY = "cart";

@Injectable()
export class ShoppingCartService {
  private storage: Storage;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  private products: Product[];
  private arrayCurrencyRates: CurrencyConversionOption[];
  private baseCurrency = "EUR";

  public constructor(private storageService: StorageService,
                     private productService: ProductsDataService,
                     private currencyConversionOptionsDataService: CurrencyConversionOptionsDataService) {

    this.storage = this.storageService.get();
    this.productService.all().subscribe((products) => this.products = products);

    this.currencyConversionOptionsDataService.getCurrencyRates()
      .subscribe(data => {
        let arr = [];
        Object.entries(data).forEach((key,i) => {
          arr.push({'code': key[0], 'rate': Number(key[1])});
          this.arrayCurrencyRates = arr;
        });
      });

    this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
  }

  public get(): Observable<ShoppingCart> {
    return this.subscriptionObservable;
  }

  public addItem(product: Product, quantity: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === product.id);
    if (item === undefined) {
      item = new CartItem();
      item.productId = product.id;
      item.productTitle = product.title;
      cart.items.push(item);
    }

    item.quantity += quantity;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    if (cart.items.length === 0) {
      cart.currencyToConvert = undefined;
    }

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  public empty(): void {
    const newCart = new ShoppingCart();
    this.save(newCart);
    this.dispatch(newCart);
  }

  public setCurrencyConversionOption(currencyConversionOption: CurrencyConversionOption): void {
    const cart = this.retrieve();
    cart.currencyToConvert = currencyConversionOption.code;
    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  public setOrderAddress (orderAddress: string): void {
    const cart = this.retrieve();
    cart.orderAddress = orderAddress;
    this.save(cart);
    this.dispatch(cart);
  }

  public deliveryAddressFilledInCart() : boolean {
    var addressFilled = false;
    const cart = this.retrieve();
    if (cart.orderAddress != undefined) {
      addressFilled = true; 
    }
    return addressFilled;
  }

  private calculateCart(cart: ShoppingCart): void {
    cart.itemsTotal = cart.items
                          .map((item) => item.quantity * this.products.find((p) => p.id === item.productId).price)
                          .reduce((previous, current) => previous + current, 0);
    cart.currencyConversionTotal = cart.currencyToConvert ?
                          (this.arrayCurrencyRates.find((x) => x.code === cart.currencyToConvert).rate * cart.itemsTotal) : 0;                    
    let grossTotal = cart.currencyConversionTotal != 0 ? cart.currencyConversionTotal : cart.itemsTotal;
    cart.grossTotal = Math.round(grossTotal * 100) / 100;
    cart.orderCurrency =  cart.currencyToConvert ? cart.currencyToConvert : this.baseCurrency;
  }

  private retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    const storedCart = this.storage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }
    return cart;
  }

  private save(cart: ShoppingCart): void {
    this.storage.setItem(CART_KEY, JSON.stringify(cart));
  }

  private dispatch(cart: ShoppingCart): void {
    this.subscribers
        .forEach((sub) => {
          try {
            sub.next(cart);
          } catch (e) {
            // we want all subscribers to get the update even if one errors.
          }
        });
  }

}