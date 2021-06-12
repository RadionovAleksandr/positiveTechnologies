import { Product } from './product.interface';

export interface CheckoutItem {
  product: Product;
  amount: number;
}

export interface Checkout {
  items: CheckoutItem[];
}
