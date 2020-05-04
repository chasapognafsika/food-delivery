import { Component, OnInit } from "@angular/core";
import { ShoppingCart } from "../../models/shopping-cart.model";
import { Observable } from "rxjs/Observable";
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: "order-list",
  styleUrls: ["./order-list.component.scss"],
  templateUrl: "./order-list.component.html"
})
export class OrderListComponent implements OnInit {
  public orders: Observable<ShoppingCart[]>;

  public constructor(private orderService: OrderService) {
  }

  public ngOnInit(): void {
    this.orders = this.orderService.getAllOrders();
  } 
}
