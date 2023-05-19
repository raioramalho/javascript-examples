import TaxItem from "./taxItem";

export default class Soup extends TaxItem {
  constructor(description: string, price: number) {
    super('Soup', description, price)
  }
  getTax(): number {
    return 1;
  }
}
