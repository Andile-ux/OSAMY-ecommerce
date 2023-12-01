// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productQuantity:number =1;
  grandTotal!: number;

  constructor(private store: CartService) { }

  cartData: any = [];

  ngOnInit(): void {
    this.store.getProducts().subscribe(res => {
      this.cartData = res;
      this.calculateGrandTotal();
    });
  }

  calculateGrandTotal() {
    this.grandTotal = this.store.getTotalPrice();
  }

  removeItem(item: any) {
    this.store.removeCartItem(item);
    this.calculateGrandTotal();
  }

  emptyCart() {
    this.store.removeAllCart();
    this.calculateGrandTotal();
  }

  updateQuantity(item: any, newQuantity: number) {
    if (newQuantity >= 1) {
      const updatedItem = { ...item, quantity: newQuantity };
      this.store.addToCart(updatedItem);
      this.calculateGrandTotal();
    }
  }

  changeQuantity(item:any){
    if(this.productQuantity < 8 && item == "max"){
      const newQuantity:number = this.productQuantity += 1;
      this.updateQuantity(item,newQuantity)
    }else if(this.productQuantity > 1 && item == "min"){
      const newQuantity = this.productQuantity -= 1;
      this.updateQuantity(item,newQuantity)
    }
  }

}
