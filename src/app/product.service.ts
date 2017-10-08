import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  update(product: Object, productID: string) {
    return this.db.object('/products/' + productID).update(product);
  }

  getAll() {
    return this.db.list('/products');
  }

  getProduct(productID: string) {
    return this.db.object('/products/' + productID);
  }

}
