import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Currency } from '../../currency.enum';
import { Quotable } from '../interfaces/qutable.interface';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private API_KEY = 'aba18e2078d8be81739f8b81a6d86c7b';
  constructor(private http: HttpClient) { }

  getCurrency(source: Currency, currencies: Currency[]): Observable<Quotable> {
    const request = `http://apilayer.net/api/live?access_key=${this.API_KEY}&currencies=${currencies.join()}&source=${source}&format=1`;
    return this.http.get<Record<string, Quotable>>(request)
    .pipe(map(data => data.quotes));
  }

}
