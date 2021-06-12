import { Injectable } from '@angular/core';
import { Currency } from '../../currency.enum';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  currencies = [Currency.eur, Currency.cad, Currency.rub];
  items: Product[] = [
    { id: '1', name: 'Товар 1', price: 1 },
    { id: '2', name: 'Товар 2', price: 2 },
    { id: '3', name: 'Товар 3', price: 3 },
    { id: '4', name: 'Товар 4', price: 4 },
    { id: '5', name: 'Товар 5', price: 5 },
    ];
  elements = [
    { name: 'Доллар', currency: Currency.usd },
    { name: 'Евро', currency: Currency.eur },
    { name: 'Канадский доллар', currency: Currency.cad},
    { name: 'Рубль', currency: Currency.rub}
  ];
}
