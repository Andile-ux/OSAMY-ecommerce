import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  public loginForm!:FormGroup;
  public registerForm !: FormGroup;
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router:Router){

  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
    this.registerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      mobile: ['']
    });
  }
  login(){
    this.http.get<any>("http://localhost:3000/users").subscribe((results)=>{
      const user = results.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(this.registerForm==null){
        alert("Registered successfully");
      } else{
        alert("Invalid")
      } 
      if(user){
        alert("Login Success");
        this.loginForm.reset();
        this.router.navigate(['landing'])
      }else{
        alert("User not found");
      }
    },err=>{
      alert("Something went wrong");
    });
  }

  register(){
      this.http.post<any>("http://localhost:3000/users", this.registerForm.value).subscribe((results)=>{
      if(this.registerForm==null){
        alert("Registered successfully");
      } else{
        alert("Invalid")
      } 
      
        this.registerForm.reset();
        this.router.navigate(['login']);
      }, err=>{
        alert("Something went wrong")
      });
    }

}

