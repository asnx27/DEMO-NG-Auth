import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormErrorComponent } from '../../../shared/form-error/form-error.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      image: [null, Validators.required],
    });
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedImage = file;

      this.registerForm.patchValue({ image: file });
      this.registerForm.get('image')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.registerForm.invalid || !this.selectedImage) return;

    const { name, email, password } = this.registerForm.value;

    this.authService
      .register({ name, email, password, image: this.selectedImage })
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => console.error('Registration error:', err),
      });
  }
}
