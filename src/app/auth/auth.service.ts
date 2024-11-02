import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = signal(false);

  constructor(private router: Router) {}

  login(): void {
    this.isAuthenticated.set(true);
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.isAuthenticated();
  }
}
