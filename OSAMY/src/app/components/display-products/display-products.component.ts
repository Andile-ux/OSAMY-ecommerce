import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StoreServiceService } from 'src/app/services/store-service.service';
import {CartService} from 'src/app/services/cart.service';
@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit{

  constructor(private store:StoreServiceService,private cart: CartService, private activatedRoute: ActivatedRoute){};

  //create property to be called (same as array list)
  pruductData: any = [];

  public productList : any ;
  public filterCategory : any
  searchKey:string ="";
  ngOnInit(): void {
    //call method and test via console
    /*this.store.getAllProducts().subscribe((allData)=>{
      console.log(allData)
      //assign to property
      this.pruductsData = allData;
    });*/
    let productid = this.activatedRoute.snapshot.paramMap.get("id");
    console.log(productid)

    this.store.getProductById(productid).subscribe(res=>{
      this.pruductData = res;

      console.log(res)
    })
    
  }
  addtocart(item: any){
    this.cart.addtoCart(item);
  }
  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }
}
