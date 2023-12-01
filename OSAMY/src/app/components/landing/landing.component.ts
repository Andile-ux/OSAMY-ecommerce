import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { StoreServiceService } from 'src/app/services/store-service.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit{



  public productList : any ;
  public filterCategory : any
  searchKey:string ="";

  constructor(private store: StoreServiceService,private cart: CartService, private router:Router) {
    
  }

  pruductsData: any = [];
  ngOnInit(): void {
    this.store.getAllProducts().subscribe((allData)=>{
      console.log(allData)
      //assign to property
      this.pruductsData = allData;
    });
    

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
