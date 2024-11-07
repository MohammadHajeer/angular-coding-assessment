import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { auth, database } from '../config/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithCustomToken,
  signOut,
} from 'firebase/auth';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../types';
import { doc, getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userData = signal<User>({} as User);
  private isAuthenticated = computed(() => !!this.userData().token);

  constructor(private router: Router, private cookieService: CookieService) {
    const userData = this.cookieService.get('user');
    if (userData) {
      this.userData.set(JSON.parse(userData));
    }
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!userData) {
          const docSnap = await getDoc(doc(database, 'users', user.uid));
          const userData = docSnap.data();
          if (userData) {
            this.logUserIn({
              ...userData,
              token: user.getIdToken(),
            } as unknown as User);
          }
          router.navigate(['/dashboard']);
        }
      } else {
        this.userData.set({} as User);
        this.cookieService.delete('user');
        this.router.navigate(['/login']);
      }
    });
  }

  logUserIn(user: User): void {
    this.userData.set(user);
    this.cookieService.set('user', JSON.stringify(user));
    this.router.navigate(['/dashboard']);
  }

  isLoggedIn() {
    return this.isAuthenticated();
  }

  isEmailVerified() {
    return this.userData().verified;
  }

  verifyEmail() {
    this.userData.set({ ...this.userData(), verified: true });
    this.cookieService.set('user', JSON.stringify(this.userData()));
    this.router.navigate(['/dashboard']);
  }

  async logout() {
    await signOut(auth);
  }
}
