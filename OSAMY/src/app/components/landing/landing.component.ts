import { Component , OnInit} from '@angular/core';
import { StoreServiceService } from 'src/app/services/store-service.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit{



  constructor(private store: StoreServiceService) {
    
  }

  pruductsData: any = [];
  ngOnInit(): void {
    this.store.getAllProducts().subscribe((allData)=>{
      console.log(allData)
      //assign to property
      this.pruductsData = allData;
    });
  }

}
