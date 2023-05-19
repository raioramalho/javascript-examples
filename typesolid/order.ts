import Item from "./item";
import TaxItem from "./taxItem";

export default class Order {
  items: Item[];
  constructor() {
    this.items = []
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

  printMessage() {
    const message = `Obrigado pela comprar o total foi de R$${this.getTotal()}, os impostos de R$${this.getTaxes()}.`;
    return message;
  }
}
