import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../models/product.model";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

@Injectable()
export class ProductsDataService {
  private REST_API_SERVER = "http://localhost:9000";
  private getItemsEndpoint = '/api/items';
  private httpClient: HttpClient;
  public constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public all(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.REST_API_SERVER + this.getItemsEndpoint)
      .pipe(map(res=> res['result'])
    );
  } 
}
