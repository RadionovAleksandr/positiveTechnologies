import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() item;
  @Output() addEvent = new EventEmitter();
  ngOnInit(): void {
  }

  addBasket(item: Product): void {
    this.addEvent.emit(item);
  }
}
