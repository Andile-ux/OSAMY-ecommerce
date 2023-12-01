// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push({ ...product, quantity: 1 });
    this.productList.next(this.cartItemList);
  }

  addToCart(product: any) {
    const existingItem = this.cartItemList.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem = { ...product, quantity: 1, price: Number(product.price) };
      this.cartItemList.push(newItem);
    }

    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.price * a.quantity;
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    const index = this.cartItemList.findIndex((item: any) => item.id === product.id);
    if (index !== -1) {
      const removedItem = this.cartItemList[index];
      this.cartItemList.splice(index, 1);
      this.productList.next(this.cartItemList);
      this.getTotalPrice();
    }
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    this.getTotalPrice(); 
  }
}
