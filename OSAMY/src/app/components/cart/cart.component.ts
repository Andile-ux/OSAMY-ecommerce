import { Component,OnInit } from '@angular/core';
import {StoreServiceService} from '../../services/store-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(private student:StoreServiceService){}
  studentData:any=[];
  ngOnInit(): void {
    this.student.getAllProducts().subscribe((allData)=>{
      console.log(allData);
      this.studentData=allData;
    })
  }
  deleteItem(student_id: any){
    //console.log(student_id)
    this.student.deleteItem(student_id).subscribe((result)=>{
      //console.log(result);
      this.ngOnInit(); 
    });
  }
}
