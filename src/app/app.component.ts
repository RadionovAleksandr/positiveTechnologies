import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { PriceService } from './services/price.service';
import { FormGroup } from '@angular/forms';
import { CurrencyEnum } from './enums/currency.enum';
import { StoreService } from './services/store.service';
import { CheckoutItem } from './interfaces/checkout.interface';
import { Product } from './interfaces/product.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CheckoutService } from './services/checkout.service';
import { Quotable } from './interfaces/qutable.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Positive Technologies';
  form: FormGroup;
  checkoutProducts: CheckoutItem[] = [];
  currenciesRatio: Quotable;
  private destroy$ = new Subject();
  constructor(
    readonly storeService: StoreService,
    private readonly checkoutService: CheckoutService,
    private readonly priceService: PriceService,
  ) {}

  ngOnInit(): void {

    this.checkoutService.checkout$
    .pipe(takeUntil(this.destroy$))
    .subscribe((items) => this.checkoutProducts = [...items]);

    this.checkoutService.getCheckout();

    this.priceService.getCurrency(CurrencyEnum.usd, this.storeService.currencies)
    .pipe(takeUntil(this.destroy$))
    .subscribe(quota => {
      this.currenciesRatio = quota;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addProduct(item: Product): void {
    this.checkoutService.addProduct(item);
  }

  removeProduct(id: string): void {
    this.checkoutService.removeProduct(id);
  }

  trackByFn: TrackByFunction<Product> = (index, item) => item.id;
}

