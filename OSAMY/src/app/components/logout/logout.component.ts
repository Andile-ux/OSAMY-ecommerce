import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent implements OnInit {

  constructor(private jwtService: JwtService, private router: Router) {}

  ngOnInit(): void {
    
    this.jwtService.clearToken();
    this.router.navigate(['/landing']);
  }
}
