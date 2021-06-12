import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CheckoutItem } from '../interfaces/checkout.interface';
import { Currency } from '../../currency.enum';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})

export class BasketComponent implements OnChanges {

  @Input() checkoutItems: CheckoutItem[];
  @Input() currenciesRatio: Record<string, any>;
  @Output() removeEvent = new EventEmitter<string>();
  currencyKeys: string[];
  sum: Record<string, Record<string, any>> = {};
  currency = Currency;

  constructor() {
  }

  ngOnChanges(): void {
    if (this.currenciesRatio && this.checkoutItems) {
      this.currencyKeys = Object.keys(this.currenciesRatio);
      let amount = 0;
      this.checkoutItems.forEach(el => amount += (el.amount * el.product.price));
      this.sum[this.currency.usd] = {
        amount,
        currency: this.currency.usd,
      };
      this.currencyKeys.forEach((el, i) => {
        const key = this.currencyKeys[i];
        const sumCurrency = Number(this.currenciesRatio[key].toFixed(2));
        this.sum[key] = {
          amount: (amount * sumCurrency).toFixed(2),
          currency: key.replace(this.currency.usd, '')
        };
      });
    }
  }

  remove(id: string): void {
    this.removeEvent.emit(id);
  }

}