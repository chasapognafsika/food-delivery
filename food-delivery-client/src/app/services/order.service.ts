import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { ShoppingCart } from '../models/shopping-cart.model';
import { Observable } from "rxjs/Observable";
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
   
@Injectable()
export class OrderService {
  private REST_API_SERVER = "http://localhost:9000";
  private createOrderEndpoint = '/api/orders';
  private getAllOrdersEndpoint = '/api/orders';

  private httpClient: HttpClient;
  public constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public createOrder(order: ShoppingCart): Observable<ShoppingCart> {
    return this.httpClient.post<ShoppingCart>(this.REST_API_SERVER + this.createOrderEndpoint, order, httpOptions)
    .pipe(
      catchError(this.handleError) // then handle the error
     );
  }

  public getAllOrders(): Observable<ShoppingCart[]> {
    return this.httpClient.get<ShoppingCart[]>(this.REST_API_SERVER + this.getAllOrdersEndpoint)
      .pipe(map(res=> res['result']), catchError(this.handleError)
    );
  } 

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
