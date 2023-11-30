import { Injectable } from '@angular/core';
//httpClient to interact
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreServiceService {

  pruductsURL = "https://fakestoreapi.com/products";
  usersURL = "http://localhost:3000/users";
  cartsURL = "http://localhost:3000/carts";

  constructor(private http:HttpClient) { }

  getAllProducts(){

    return this.http.get(this.pruductsURL);

  }
  deleteItem(id: any){
    return this.http.delete(`${this.usersURL}/${id}`);
  }
}
