import Item from "./item"
import TaxItem from "./taxItem";

export default class Eletronic extends TaxItem {
  constructor(description: string, price: number) {
    super('Eletronic', description, price)
  }
  getTax(): number {
    return 30;
  }
}
