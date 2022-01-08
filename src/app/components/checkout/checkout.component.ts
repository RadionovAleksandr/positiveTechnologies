import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CheckoutItem } from '../../interfaces/checkout.interface';
import { CurrencyEnum } from '../../enums/currency.enum';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-basket',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CheckoutComponent implements OnChanges {

  @Input() checkoutItems: CheckoutItem[];
  @Input() currenciesRatio: Record<string, any>;
  @Output() removeEvent = new EventEmitter<string>();
  currentCurrencies: CurrencyEnum[];
  currentCur: CurrencyEnum;
  currencyKeys: string[];
  sum: number;

  constructor(private readonly storeService: StoreService) {}

  ngOnChanges(): void {
    if (this.currenciesRatio && this.checkoutItems) {
      this.currentCurrencies = this.storeService.currencies;
      this.currentCur = this.currentCur ? this.currentCur : this.storeService.defaultCur;
      this.calculateSum();
    }
  }

  remove(id: string): void {
    this.removeEvent.emit(id);
  }

  changeCurrency(currency: CurrencyEnum): void {
    this.currentCur = currency;
    this.calculateSum();
  }

  private calculateSum(): void {
    this.sum = 0;
    const ratio = this.currenciesRatio[this.storeService.defaultCur + this.currentCur];
    this.checkoutItems.forEach(item => this.sum += item.amount * item.product.price * ratio);
    this.sum = +this.sum.toFixed(2);
  }
}
