import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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
  authService = inject(AuthService);
  gsapAnimation = inject(GsapAnimationsService);

  @ViewChild('form', { static: false }) form!: ElementRef;
  @ViewChild('title', { static: false }) title!: ElementRef;
  @ViewChild('button', { static: false }) button!: ElementRef;

  handleLogin() {
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
  }

  ngAfterViewInit() {
    this.gsapAnimation.slideInWithFade(this.form.nativeElement);
    this.gsapAnimation.animateTitle(this.title.nativeElement);
  }
}
