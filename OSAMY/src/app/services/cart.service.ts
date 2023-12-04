// cart.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000';
  public cartItemList: any[] = [];
  public productList = new BehaviorSubject<any[]>([]);
  public product: any;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.productList.asObservable();
  }

  addToCart(product: any) {
    const existingItem = this.cartItemList.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem = { ...product, quantity: 1, price: Number(product.price) };
      this.cartItemList.push(newItem);
    }

    this.productList.next([...this.cartItemList]);
    this.saveCartToServer();
    return this.getTotalPriceConsideringQuantity();
  }

  updateQuantity(updatedItem: any, newQuantity: number) {
    const index = this.cartItemList.findIndex((item: any) => item.id === updatedItem.id);

    if (index !== -1) {
      this.cartItemList[index].quantity = newQuantity;
      this.productList.next([...this.cartItemList]);
      this.saveCartToServer();
      return this.getTotalPriceConsideringQuantity();
    }
  }

  removeCartItem(product: any) {
    const index = this.cartItemList.findIndex((item: any) => item.id === product.id);
    if (index !== -1) {
      this.cartItemList.splice(index, 1);
      this.productList.next([...this.cartItemList]);
      this.saveCartToServer();
      return this.getTotalPriceConsideringQuantity();
    }
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next([...this.cartItemList]);
    this.saveCartToServer();
    return this.getTotalPriceConsideringQuantity();
  }

  private saveCartToServer() {
    this.http.post(`${this.apiUrl}/carts`, { cart: this.cartItemList }).subscribe(
      (response) => {
        console.log('Cart saved to server successfully', response);
      },
      (error) => {
        console.error('Error saving cart to server:', error);
      }
    );
  }

  public getTotalPriceConsideringQuantity(): any {
    let grandTotal = 0;
    this.cartItemList.forEach((item: any) => {
      grandTotal += item.price * item.quantity;
    });

    return grandTotal;
  }
}
