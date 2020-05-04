import { CartItem } from "../models/cart-item.model";

export class ShoppingCart {
  public items: CartItem[] = new Array<CartItem>();
  public currencyToConvert: string;
  public grossTotal: number = 0;
  public currencyConversionTotal: number = 0;
  public itemsTotal: number = 0;
  public orderCurrency: string;
  public orderAddress: string;

  public updateFrom(src: ShoppingCart) {
    this.items = src.items;
    this.currencyToConvert = src.currencyToConvert;   
    this.grossTotal = src.grossTotal;
    this.currencyConversionTotal = src.currencyConversionTotal;
    this.itemsTotal = src.itemsTotal;
    this.orderCurrency = src.orderCurrency;  
    this.orderAddress = src.orderAddress;
  }
}