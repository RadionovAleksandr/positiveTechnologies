import { Component, OnInit } from '@angular/core';
import { PriceService } from './components/services/price.service';
import { FormGroup } from '@angular/forms';
import { Currency } from './currency.enum';
import { StoreService } from './components/services/store.service';
import { ProductService } from './components/services/product.service';
import { CheckoutItem } from './components/interfaces/checkout.interface';
import { Product } from './components/interfaces/product.interface';
import { Quotable } from './components/interfaces/qutable.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Positive Technologies';
  form: FormGroup;
  checkoutProducts: CheckoutItem[] = [];
  currenciesRatio: Record<string, number>;

  constructor(
    readonly priceService: PriceService,
    readonly storeService: StoreService,
    readonly productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.productService.getCheckout().subscribe((items) => this.checkoutProducts = items);

    this.priceService.getCurrency(Currency.usd, this.storeService.currencies);
    // .subscribe(quota => this.currenciesRatio = quota);
    setTimeout(() => {
      this.currenciesRatio = {
        USDCAD: 1.212025,
        USDEUR: 0.821796,
        USDRUB: 72.3505,
      };
    });
  }

  addProduct(item: Product): void {
    this.checkoutProducts = this.productService.addProduct(item, this.checkoutProducts);
  }

  removeProduct(id: string): void {
    this.checkoutProducts = this.productService.removeProduct(id, this.checkoutProducts);
  }

  //USDCAD: 1.212025
  //USDEUR: 0.821796
  //USDRUB: 72.3505
}

