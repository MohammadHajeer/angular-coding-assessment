import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormInputComponent } from '../../components/form-input/form-input.component';
import { GsapAnimationsService } from '../../services/gsap/gsap-animations.service';
import { SplitWordComponent } from '../../components/split-word/split-word.component';
import { RouterLink } from '@angular/router';
import { PrintFormInputErrorComponent } from '../../components/print-form-input-error/print-form-input-error.component';
import gsap from 'gsap';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { User } from '../../types';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormInputComponent,
    SplitWordComponent,
    RouterLink,
    ReactiveFormsModule,
    PrintFormInputErrorComponent,
  ],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  errorMessage = '';

  @ViewChild('form', { static: false }) form!: ElementRef;
  @ViewChild('title', { static: false }) title!: ElementRef;
  @ViewChild('button', { static: false }) button!: ElementRef;

  constructor(
    private authService: AuthService,
    private gsapAnimation: GsapAnimationsService
  ) {}

  async handleLogin() {
    if (this.loginForm.invalid) {
      if (gsap.isTweening(this.button.nativeElement)) {
        this.gsapAnimation.resetAnimation(this.button.nativeElement);
        this.gsapAnimation.resetAnimation(this.button.nativeElement.children);
      }
      return;
    }
    if (!gsap.isTweening(this.button.nativeElement)) {
      this.gsapAnimation.animateLoadingButton(this.button.nativeElement);
    }

    this.loginForm.disable();
    this.button.nativeElement.disabled = true;

    const userCredentials = await signInWithEmailAndPassword(
      auth,
      this.loginForm.get('email')?.value!,
      this.loginForm.get('password')?.value!
    ).catch((error) => {
      this.loginForm.enable();
      this.button.nativeElement.disabled = false;
      this.gsapAnimation.resetAnimation(this.button.nativeElement);
      this.gsapAnimation.resetAnimation(this.button.nativeElement.children);

      switch (error.code) {
        case 'auth/invalid-credential':
          this.errorMessage =
            'Invalid credentials provided. Please check your input or try again later.';
          break;
        default:
          this.errorMessage = 'An error occurred. Please try again.';
      }

      return;
    });

    if (!userCredentials) {
      return;
    }

    if (this.errorMessage) {
      this.errorMessage = '';
    }

    const { user } = userCredentials;

    const token = await user.getIdToken(true);

    const docSnap = await getDoc(doc(database, 'users', user.uid));

    if (!docSnap.exists()) {
      console.error('No user found, please contact support!');
      return;
    }

    const userData: User = {
      token: token!,
      verified: userCredentials.user.emailVerified,
      firstName: docSnap.data()?.['firstName'],
      lastName: docSnap.data()?.['lastName'],
      email: docSnap.data()?.['email'],
    };

    this.authService.logUserIn(userData);
  }

  ngAfterViewInit() {
    this.gsapAnimation.slideInWithFade(this.form.nativeElement);
    this.gsapAnimation.animateTitle(this.title.nativeElement);
  }
}
