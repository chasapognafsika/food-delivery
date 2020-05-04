import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CurrencyConversionOption } from "../models/currency-conversion-option.model";
import { map } from "rxjs/operators";

@Injectable()
export class CurrencyConversionOptionsDataService {
  private REST_API_SERVER = "http://data.fixer.io/api/latest?access_key=f2bc70af8606278334b40b75915b8480&base=EUR&&symbols=USD,GBP,JPY";
  private httpClient: HttpClient;
  public constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public getCurrencyRates(): Observable<CurrencyConversionOption> {
    return this.httpClient.get<CurrencyConversionOption>(this.REST_API_SERVER)
      .pipe(map(res=> res['rates'])
    );
  } 
}


 

