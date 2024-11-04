import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'print-form-input-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './print-form-input-error.component.html',
})
export class PrintFormInputErrorComponent {
  @Input() control: any | null = null;

  getErrorMessage(): string | null {
    if (this.control.errors) {
      const errorKey = Object.keys(this.control.errors)[0];
      switch (errorKey) {
        case 'required':
          return 'This field is required';
        case 'email':
          return 'Please enter a valid email';
        case 'minlength':
          const requiredLength =
            this.control.errors['minlength'].requiredLength;
          return `Minimum length is ${requiredLength} characters`;
        case 'maxlength':
          const maxLength = this.control.errors['maxlength'].requiredLength;
          return `Maximum length is ${maxLength} characters`;
        default:
          return null;
      }
    }
    return null;
  }
}
