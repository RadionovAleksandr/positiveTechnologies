import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrencyEnum } from '../enums/currency.enum';
import { Quotable } from '../interfaces/qutable.interface';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private API_KEY = 'aba18e2078d8be81739f8b81a6d86c7b';
  constructor(private http: HttpClient) { }

  getCurrency(source: CurrencyEnum, currencies: CurrencyEnum[]): Observable<Quotable> {
    const request = `http://apilayer.net/api/live?access_key=${this.API_KEY}&currencies=${currencies.join()}&source=${source}&format=1`;
    // return this.http.get<Record<string, Quotable>>(request)
    // .pipe(map(data => data.quotes));
    // todo: need to pay
    return of({
      USDEUR: 0.884795,
      USDCAD: 1.27299,
      USDRUB: 76.138497,
      USDUSD: 1,
    } as unknown as Quotable);
  }

}
