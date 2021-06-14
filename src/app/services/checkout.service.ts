import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { Subject } from 'rxjs';
import { CheckoutItem } from '../interfaces/checkout.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  checkout$ = new Subject<CheckoutItem[]>();
  checkout: CheckoutItem[];
  removeProduct(id: string): void {
    this.checkout = this.checkout.map(el => {
      if (el.product.id === id) {
        el.amount -= 1;
      }
      return el;
    });

    this.checkout = this.checkout.filter(item => item.amount >= 1);
    this.setStorage(this.checkout);
    this.checkout$.next(this.checkout);
  }

  getCheckout(): void {
    this.checkout = this.getCheckoutFromStorage();
    this.checkout$.next(this.getCheckoutFromStorage());
  }

  addProduct(product: Product): void {
    let isFindElement = false;
    this.checkout.forEach(el => {
      if (el.product.id === product.id) {
        el.amount += 1;
        isFindElement = true;
      }
    });
    if (!isFindElement) {
      this.checkout.push({ product, amount: 1 });
    }
    this.setStorage(this.checkout);
    this.checkout$.next(this.checkout);
  }

  private setStorage(items: CheckoutItem[]): void {
    localStorage.setItem('checkoutItems', JSON.stringify(items));
  }

  private getCheckoutFromStorage(): CheckoutItem[] {
    let products;
    try {
      products = JSON.parse(localStorage.getItem('checkoutItems')) || [];
    } catch (error) {
      products = [];
    }
    return products;
  }
}

