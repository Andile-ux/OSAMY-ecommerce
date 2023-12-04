import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });

    this.registerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      mobile: ['']
    });
  }

  login() {
    this.http.post<any>('http://localhost:3000/users', this.loginForm.value).subscribe(
      (response) => {
        console
        if (response) {
          console.log('Generated Token:', response.token);

          this.jwtService.saveToken(response.token);

          alert('Login Success');
          this.loginForm.reset();
          this.router.navigate(['landing']);
        } else {
          alert('Invalid credentials');
        }
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  register() {
    this.http.post<any>('http://localhost:3000/users', this.registerForm.value).subscribe(
      (response) => {
        if (response && response.token) {
          this.jwtService.saveToken(response.token);
          alert('Registered successfully');
          this.registerForm.reset();
          this.router.navigate(['landing']);
        } else {
          alert('Registration failed');
        }
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
}
