

export class Product {
  id: string;
  title: string;
  photo: string;
  type: string;
  desc: string;
  qty: number;
  price: number;
  inStock: number;

  public updateFrom(src: Product): void {
    this.id = src.id;
    this.title = src.title;
    this.photo = src.photo;
    this.type = src.type;
    this.qty = src.qty;
    this.price = src.price;
    this.inStock = src.inStock;
  }
}


