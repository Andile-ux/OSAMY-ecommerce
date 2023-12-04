import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productQuantity: number = 1;
  grandTotal!: number;

  constructor(private store: CartService) { }

  cartData: any = [];

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.store.getProducts().subscribe(res => {
      this.cartData = res;
      this.calculateGrandTotal();
    });
  }

  calculateGrandTotal() {
    this.grandTotal = this.store.getTotalPriceConsideringQuantity();
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
    if (newQuantity >= this.productQuantity) {
      this.store.updateQuantity(item, newQuantity);
      this.calculateGrandTotal();
    }
  }

  changeQuantity(item: any, operation: string) {
    const productQuantity = item.quantity || 1;
    let newQuantity;

    if (operation === 'max') {
      newQuantity = productQuantity < 8 ? productQuantity + 1 : productQuantity;
    } else if (operation === 'min') {
      newQuantity = productQuantity > 1 ? productQuantity - 1 : productQuantity;
    }

    this.store.updateQuantity(item, newQuantity || 1);
    this.calculateGrandTotal();
  }
}
