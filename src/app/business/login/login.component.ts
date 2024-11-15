import {
  HttpClient,
  HttpClientModule,
  HttpResponse,
} from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { AuthService } from '../../shared/service/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario válido:', this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Respuesta de login:', response);
          if (response && response.body) {
            localStorage.setItem('token', response.body);
            console.log('Token almacenado:', localStorage.getItem('token'));
            try {
              console.log('Intentando navegar a /user-profile');
              this.router.navigate(['/user-profile']).then(
                (success) => {
                  console.log('Navegación exitosa:', success);
                },
                (error) => {
                  console.error('Error en navegación:', error);
                }
              );
            } catch (e) {
              console.error('Error al intentar navegar:', e);
            }
          }
        },
        error: (error) => {
          console.error('Error de login:', error);
          this.errorMessage = 'Error en el inicio de sesión';
        },
      });
    }
  }
}
