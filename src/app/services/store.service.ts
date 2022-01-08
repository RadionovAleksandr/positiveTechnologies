import { Injectable } from '@angular/core';
import { CurrencyEnum } from '../enums/currency.enum';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  defaultCur = CurrencyEnum.usd;
  currencies = [CurrencyEnum.usd, CurrencyEnum.eur, CurrencyEnum.cad, CurrencyEnum.rub];
  items: Product[] = [
    {
      id: '1',
      name: 'Товар 111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
      price: 1,
    },
    {
      id: '2',
      name: 'Товар 2',
      price: 2
    },
    {
      id: '3',
      name: 'Товар 3',
      price: 3
    },
    {
      id: '4',
      name: 'Товар 444444444444 44444444444444444444',
      price: 4
    },
    {
      id: '5',
      name: 'Товар 5',
      price: 5
    },
    ];
  elements = [
    { name: 'Доллар', currency: CurrencyEnum.usd },
    { name: 'Евро', currency: CurrencyEnum.eur },
    { name: 'Канадский доллар', currency: CurrencyEnum.cad},
    { name: 'Рубль', currency: CurrencyEnum.rub}
  ];
}
