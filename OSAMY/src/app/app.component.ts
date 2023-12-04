import { Component } from '@angular/core';
import { JwtService } from './services/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OSAMY';

  constructor(private jwtService: JwtService) {}

  isLoggedIn(): boolean {
    return this.jwtService.isLoggedIn();
  }
}
