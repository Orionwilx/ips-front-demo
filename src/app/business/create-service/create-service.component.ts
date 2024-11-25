// src/app/business/services/create-service/create-service.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../shared/service/service.service';

@Component({
  selector: 'app-create-service',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-service.component.html',
})
export class CreateServiceComponent {
  serviceForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    @Inject(ServiceService) private serviceService: ServiceService,
    private router: Router
  ) {
    this.serviceForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      provider: ['', Validators.required],
      cost: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      this.isLoading = true;
      this.serviceService.createService(this.serviceForm.value).subscribe({
        next: () => {
          this.router.navigate(['/services']);
        },
        error: (error) => {
          console.error('Error al crear el servicio:', error);
          this.errorMessage = 'Error al crear el servicio';
          this.isLoading = false;
        },
      });
    }
  }
}
