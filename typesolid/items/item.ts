export default class Item {
  constructor(public category: string, public description: string, public price: number) {
    this.category = category;
    this.description = description;
    this.price = price;
  }
}
