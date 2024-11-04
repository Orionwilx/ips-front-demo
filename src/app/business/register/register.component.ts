import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { environment } from '../../../../enviroment';
import {
  HttpClient,
  HttpClientModule,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^\d{3}\d{3}\d{4}$/)],
      ],
      address: ['', Validators.required],
      role: ['', Validators.required],
      status: ['activo'],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const formValues = this.registerForm.value;
      console.log('Formulario enviado:', formValues);

      this.http
        .post(`${environment.apiUrl}/register`, formValues, {
          observe: 'response',
          responseType: 'text', // Especifica que la respuesta es texto
        })
        .subscribe({
          next: (response: HttpResponse<string>) => {
            // Cambia el tipo a string
            this.isLoading = false;
            console.log('Respuesta completa:', response);
            if (
              response &&
              (response.status === 201 || response.status === 200)
            ) {
              console.log('Registro exitoso, redireccionando...');
              this.router.navigate(['/login']);
            } else {
              console.warn('Estado inesperado:', response.status);
              this.errorMessage = 'Registro no exitoso, estado inesperado.';
            }
          },
          error: (error: any) => {
            // Asegúrate de usar HttpErrorResponse
            this.isLoading = false;
            console.error('Error al registrar usuario:', error);
            if (error.status === 400) {
              this.errorMessage =
                'Datos inválidos. Por favor, revisa tu información.';
            } else if (error.status === 500) {
              this.errorMessage = 'Error del servidor. Intenta más tarde.';
            } else {
              this.errorMessage =
                'Error al registrar usuario, intenta de nuevo.';
            }
          },
        });
    }
  }

  // Métodos auxiliares para facilitar la validación en la plantilla
  get nombre() {
    return this.registerForm.get('nombre');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get contraseña() {
    return this.registerForm.get('contraseña');
  }

  get telefono() {
    return this.registerForm.get('telefono');
  }

  get rol() {
    return this.registerForm.get('rol');
  }
}
