import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  authService = inject(AuthService);
}
