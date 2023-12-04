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
  deleteItem(id: any){
    return this.http.delete(`${this.usersURL}/${id}`);
  }

  getProductById(id: any){
    return this.http.get(`${this.pruductsURL}/${id}`)
  }
  getAllRings(){
    return this.http.get("http://localhost:3000/rings");
  }
  getAllNecklace(){
    return this.http.get("http://localhost:3000/necklace");
  }
  getAllBrace(){
    return this.http.get("http://localhost:3000/bracelets");
  }
  getAllEar(){
    return this.http.get("http://localhost:3000/earrings");
  }
  getAllWatch(){
    return this.http.get("http://localhost:3000/watches");
  }
}
