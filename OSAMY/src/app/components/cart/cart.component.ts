import { Component,OnInit } from '@angular/core';
import {StoreServiceService} from '../../services/store-service.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  grandTotal !: number;
  constructor(private store:CartService){}
  cartData:any=[];
  ngOnInit(): void {
    this.store.getProducts()
    .subscribe(res=>{
      this.cartData = res;
      this.grandTotal = this.store.getTotalPrice();
    })
  }
  removeItem(item: any){
    this.store.removeCartItem(item);
  }
  emptycart(){
    this.store.removeAllCart();
  }

}
