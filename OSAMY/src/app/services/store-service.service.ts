import { Injectable } from '@angular/core';
//httpClient to interact
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreServiceService {

  pruductsURL = "http://localhost:3000/products";
  usersURL = "http://localhost:3000/users";
  cartsURL = "http://localhost:3000/carts";

  constructor(private http:HttpClient) { }

  getAllProducts(){

    
    return this.http.get(this.pruductsURL);

  }
}
