import { Component } from '@angular/core';

@Component({
  selector: 'prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.less'],
})
export class PricesComponent {
  text: string = '';
  price: number = 0;

  items: Item[] = [
    { id: 1, purchase: 'Хлеб', done: false, price: 15.9 },
    { id: 2, purchase: 'Масло', done: false, price: 60 },
    { id: 3, purchase: 'Миноксидил', done: true, price: 22.6 },
    { id: 4, purchase: 'Тирозин', done: false, price: 310 },
  ];

  _summ = 0;

  get summ() {
    return this.items.reduce(
      (prev, curr) => prev + (curr.done ? curr.price : 0),
      0
    );
  }

  get isRed() {
    return this._summ !== this.summ;
  }

  onSumm() {
    this._summ = this.summ;
  }

  addItem($event: any): void {
    console.log($event);

    if (!this.text?.trim() || !this.price) return;

    this.items.push(new Item(0, this.text, this.price));
  }

  trackByFn(index: number, item: Item): number {
    return item.id;
  }
}

class Item {
  id: number;
  purchase: string;
  done: boolean;
  price: number;

  constructor(id: number, purchase: string, price: number) {
    this.id = id;
    this.purchase = purchase;
    this.price = price;
    this.done = false;
  }
}
