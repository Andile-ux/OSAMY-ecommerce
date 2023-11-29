import { Component,OnInit } from '@angular/core';
import {StoreServiceService} from '../../services/store-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(private store:StoreServiceService){}
  cartData:any=[];
  ngOnInit(): void {
    this.store.getAllProducts().subscribe((allData)=>{
      console.log(allData);
      this.cartData=allData;
    })
  }
  deleteItem(cart_id: any){
    this.store.deleteItem(cart_id).subscribe((result)=>{
      //console.log(result);
      this.ngOnInit(); 
    });
  }
}
