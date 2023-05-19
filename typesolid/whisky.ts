import Item from "./item"
import TaxItem from "./taxItem";

export default class Whisky extends TaxItem {
  constructor(description: string, price: number) {
    super('Whisky', description, price)
  }
  getTax(): number {
    return 10;
  }
}
