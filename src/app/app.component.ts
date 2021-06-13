import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PriceService } from './services/price.service';
import { FormGroup } from '@angular/forms';
import { Currency } from './enums/currency.enum';
import { StoreService } from './services/store.service';
import { ProductService } from './services/product.service';
import { CheckoutItem } from './interfaces/checkout.interface';
import { Product } from './interfaces/product.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


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
  currenciesRatio: Record<string, number>;
  destroy$ = new Subject();

  constructor(
    public readonly storeService: StoreService,
    private readonly priceService: PriceService,
    private readonly productService: ProductService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.productService.getCheckout()
    .pipe(takeUntil(this.destroy$))
    .subscribe((items) => this.checkoutProducts = items);

    this.priceService.getCurrency(Currency.usd, this.storeService.currencies)
    // .subscribe(quota => this.currenciesRatio = quota);
    setTimeout(() => {
      this.currenciesRatio = {
        USDCAD: 1.212025,
        USDEUR: 0.821796,
        USDRUB: 72.3505,
      };
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addProduct(item: Product): void {
    this.checkoutProducts = this.productService.addProduct(item, this.checkoutProducts);
  }

  removeProduct(id: string): void {
    this.checkoutProducts = this.productService.removeProduct(id, this.checkoutProducts);
  }
}

