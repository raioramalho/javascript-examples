import Item from "./item";
import TaxItem from "./taxItem";
import ptMessage from './message/pt';
import enMessage from './message/en';

export default class Order {
  items: Item[];
  constructor() {
    this.items = [];
  }

  addItem(item: Item) {
    this.items.push(item);
  }

  getTotal() {
    let total = 0;
    for (const item of this.items) {
      total += item.price;
    }
    return total;
  }

  getTaxes() {
    let taxes = 0;
    for (const item of this.items) {
      if (item instanceof TaxItem) {
        taxes += item.calculateTax();
      }
    }
    return taxes;
  }

  printMessage(language: string) {
    if (language === "pt") {
      return ptMessage(this.getTotal(), this.getTaxes())

    }
    if (language === "en") {
      return enMessage(this.getTotal(), this.getTaxes())
    }

  }
}
