import { Component } from '@angular/core';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'verify-email',
  standalone: true,
  imports: [],
  templateUrl: './verify-email.component.html',
})
export class VerifyEmailComponent {
  errorMessage = false;

  constructor(private authService: AuthService) {}

  checkEmailVerified() {
    console.log(auth.currentUser);
    
    if(auth.currentUser?.emailVerified) {
      this.authService.verifyEmail();
    } else {
      this.errorMessage = true;
    }
  }

  async resendEmailVerificationLink() {
    await sendEmailVerification(auth.currentUser!);
  }
}
