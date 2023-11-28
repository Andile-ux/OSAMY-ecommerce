import { Component , OnInit} from '@angular/core';

import { StoreServiceService } from 'src/app/services/store-service.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit{

  constructor(private store:StoreServiceService){};

  //create property to be called (same as array list)
  pruductsData: any = [];

  ngOnInit(): void {
    //call method and test via console
    this.store.getAllProducts().subscribe((allData)=>{
      console.log(allData)
      //assign to property
      this.pruductsData = allData;
    });
  }
}
