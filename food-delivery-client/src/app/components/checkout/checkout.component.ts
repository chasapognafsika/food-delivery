import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { CartItem } from "../../models/cart-item.model";
import { CurrencyConversionOption } from "../../models/currency-conversion-option.model";
import { Product } from "../../models/product.model";
import { ShoppingCart } from "../../models/shopping-cart.model";
import { CurrencyConversionOptionsDataService } from "../../services/currency-conversion-options.service";
import { ProductsDataService } from "../../services/products.service";
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { OrderService } from '../../services/order.service';

interface ICartItemWithProduct extends CartItem {
  product: Product;
  totalCost: number;
}

@Component({
  selector: "app-checkout",
  styleUrls: ["./checkout.component.scss"],
  templateUrl: "./checkout.component.html"
})
export class CheckoutComponent implements OnInit, OnDestroy {

  public arrayCurrencyRates: CurrencyConversionOption[];
  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[];
  public itemCount: number;
  private products: Product[];
  private cartSubscription: Subscription;
  private orderToCreate: ShoppingCart;

  public constructor(private productsService: ProductsDataService,
                     private currencyConversionOptionsDataService: CurrencyConversionOptionsDataService,
                     private shoppingCartService: ShoppingCartService,
                     private orderService: OrderService) {
  }

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  public setCurrencyConversionOption(option: CurrencyConversionOption): void {
    this.shoppingCartService.setCurrencyConversionOption(option);
  }

  public setOrderAddress(orderAddress: string): void {
    if (orderAddress) {
      this.shoppingCartService.setOrderAddress(orderAddress);
    }
  }

  public deliveryAddressFilledInCart() : boolean {
    return this.shoppingCartService.deliveryAddressFilledInCart();
  }  

  public ngOnInit(): void {
    this.currencyConversionOptionsDataService.getCurrencyRates()
      .subscribe(data => {
        let arr = [];
        Object.entries(data).forEach((key,i) => {
          arr.push({'code': key[0], 'rate': Number(key[1])});
          this.arrayCurrencyRates = arr;
        });
      });

    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);

      this.productsService.all().subscribe((products) => {
        this.products = products;
        this.cartItems = cart.items
                           .map((item) => {
                              const product = this.products.find((p) => p.id === item.productId);
                              return {
                                ...item,
                                product,
                                totalCost: product.price * item.quantity };
                           });
      });
    });
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  public purchaseCartItem(newOrder: Observable<ShoppingCart>) : void {
      newOrder.subscribe((order) => this.orderToCreate = order);
  } 

}
