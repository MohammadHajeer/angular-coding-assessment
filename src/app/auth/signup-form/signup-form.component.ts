import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import gsap from 'gsap';
import { FormInputComponent } from '../../components/form-input/form-input.component';
import { SplitWordComponent } from '../../components/split-word/split-word.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { GsapAnimationsService } from '../../services/gsap/gsap-animations.service';
import { PrintFormInputErrorComponent } from '../../components/print-form-input-error/print-form-input-error.component';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    FormInputComponent,
    SplitWordComponent,
    RouterLink,
    ReactiveFormsModule,
    PrintFormInputErrorComponent,
  ],
  templateUrl: './signup-form.component.html',
})
export class SignupFormComponent {
  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  authService = inject(AuthService);
  gsapAnimation = inject(GsapAnimationsService);

  @ViewChild('form', { static: false }) form!: ElementRef;
  @ViewChild('title', { static: false }) title!: ElementRef;
  @ViewChild('button', { static: false }) button!: ElementRef;

  handleSignup() {
    if (this.signupForm.invalid) {
      if (gsap.isTweening(this.button.nativeElement)) {
        this.gsapAnimation.resetAnimation(this.button.nativeElement);
        this.gsapAnimation.resetAnimation(this.button.nativeElement.children);
      }
      return;
    }
    if (!gsap.isTweening(this.button.nativeElement)) {
      this.gsapAnimation.animateLoadingButton(this.button.nativeElement);
    }

    this.signupForm.disable();
  }

  ngAfterViewInit() {
    this.gsapAnimation.slideInWithFade(this.form.nativeElement);
    this.gsapAnimation.animateTitle(this.title.nativeElement);
  }

  ngOnDestroy() {
    
  }
}
