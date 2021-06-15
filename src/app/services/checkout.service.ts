import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { Subject } from 'rxjs';
import { CheckoutItem } from '../interfaces/checkout.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  checkout$ = new Subject<Map<string, CheckoutItem>>();
  checkout: Map<string, CheckoutItem>;
  removeProduct(id: string): void {
    // this.checkout = this.checkout.map(el => {
    //   if (el.product.id === id) {
    //     el.amount -= 1;
    //   }
    //   return el;
    // });
    //
    // this.checkout = this.checkout.filter(item => item.amount >= 1);
    // this.setStorage(this.checkout);
    // this.checkout$.next(this.checkout);
  }

  getCheckout(): void {
    this.checkout = this.getCheckoutFromStorage();
    this.checkout$.next(this.getCheckoutFromStorage());
  }

  addProduct(product: Product): void {
    if (this.checkout.has(product.id)) {
      const addedProduct = this.checkout.get(product.id);
      this.checkout.set(product.id, { product, amount: addedProduct.amount++ });
    } else {
      this.checkout.set(product.id, { product, amount: 1 });
    }
    // let isFindElement = false;
    // this.checkout.forEach(el => {
    //   if (el.product.id === product.id) {
    //     el.amount += 1;
    //     isFindElement = true;
    //   }
    // });
    // if (!isFindElement) {
    //   this.checkout.push({ product, amount: 1 });
    // }
    this.setStorage(this.checkout);
    this.checkout$.next(this.checkout);
  }

  private setStorage(items: Map<string, CheckoutItem>): void {
    const storageObj = {};
    const keys = items.keys();
    items.forEach((el, i) => {
      storageObj[i] = el;
    })

    // for (const key in items) {
    //   storageObj[key] = items[key];
    // }

    localStorage.setItem('checkoutItems', JSON.stringify(storageObj));
  }

  private getCheckoutFromStorage(): Map<string, CheckoutItem> {
    let products;
    const productMap = new Map();
    try {
      products = JSON.parse(localStorage.getItem('checkoutItems')) || new Map();

      // tslint:disable-next-line:forin
      for (const key in products) {
        productMap.set(key, products[key]);
      }
    } catch (error) {
      products = new Map();
    }
    return productMap;
  }
}

