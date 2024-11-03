import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { FormInputComponent } from '../../components/form-input/form-input.component';
import gsap from 'gsap';
import { GsapAnimationsService } from '../../services/gsap/gsap-animations.service';
import { SplitWordComponent } from '../../components/split-word/split-word.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, FormInputComponent, SplitWordComponent, RouterLink],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  email: string = '';
  password: string = '';
  authService = inject(AuthService);
  gsapAnimation = inject(GsapAnimationsService);

  @ViewChild('form', { static: false }) form!: ElementRef;
  @ViewChild('title', { static: false }) title!: ElementRef;
  @ViewChild('button', { static: false }) button!: ElementRef;

  handleLogin(event: Event) {
    event.preventDefault();
  }

  ngAfterViewInit() {
    this.gsapAnimation.slideInWithFade(this.form.nativeElement);
    this.gsapAnimation.animateTitle(this.title.nativeElement);
    this.gsapAnimation.animateLoadingButton(this.button.nativeElement);
  }
}
