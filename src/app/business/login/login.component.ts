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
import { environment } from '../../../../enviroment';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

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
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('Formulario enviado con los valores:', this.loginForm.value);
    console.log('¿Formulario es válido?', this.loginForm.valid);

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.http
        .get(`${environment.apiUrl}/${email}`, { observe: 'response' })
        .subscribe({
          next: (response: HttpResponse<any>) => {
            if (response && response.status === 200) {
              console.log('Login successful, redireccionando...');
              //localStorage.setItem('token', response.token);
              this.router.navigate(['/user-profile']);
              console.log('Login successful');
            }
          },
          error: (error: HttpResponse<any>) => {
            if (error.status === 404) {
              this.errorMessage =
                'Usuario no encontrado. Por favor verifica tus credenciales.';
              console.log(
                'Usuario no encontrado. Por favor verifica tus credenciales.'
              );
            } else {
              this.errorMessage =
                'Error en el servidor. Inténtalo de nuevo más tarde.';
            }
          },
        });
    }
  }
}
