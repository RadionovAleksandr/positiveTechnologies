import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { Observable, of } from 'rxjs';
import { CheckoutItem } from '../interfaces/checkout.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() {
  }

  removeProduct(id: string, items: CheckoutItem[]): CheckoutItem[] {
    items = items.map(el => {
      if (el.product.id === id) {
        el.amount -= 1;
      }
      return el;
    });

    items = items.filter(item => item.amount >= 1);
    this.setStorage(items);
    return [...items];
  }

  getCheckout(): Observable<CheckoutItem[]> {
    return of(this.getCheckoutFromStorage());
  }

  addProduct(product: Product, items: CheckoutItem[]): CheckoutItem[] {
    const hasItem = !!items.find(el => el.product.id === product.id);
    if (hasItem) {
      items = items.map(el => {
        if (el.product.id === product.id) {
          el.amount += 1;
        }
        return el;
      });
    } else {
      items.push({ product, amount: 1 });
    }
    this.setStorage(items);
    return [...items];
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

