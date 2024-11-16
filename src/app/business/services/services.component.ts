import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceModel } from '../../models/service.model';
import { ServiceService } from '../../shared/service/service.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit {
  services: ServiceModel[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceService.getAllServices().subscribe({
      next: (services) => {
        this.services = services;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar los servicios:', error);
        this.errorMessage = 'Error al cargar los servicios';
        this.isLoading = false;
      },
    });
  }
}
