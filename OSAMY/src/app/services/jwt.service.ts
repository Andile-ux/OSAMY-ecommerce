// jwt.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private apiUrl = 'http://localhost:3000';  // Update this with your server URL
  private tokenKey = '1234';

  constructor(private http: HttpClient) {}

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && token !== undefined;
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  loginUser(credentials: { email: string, password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  registerUser(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }
}
