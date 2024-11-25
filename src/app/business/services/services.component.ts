import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceModel } from '../../models/service.model';
import { ServiceService } from '../../shared/service/service.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit {
  services: ServiceModel[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  isAdmin: boolean = false;

  constructor(private router: Router, private serviceService: ServiceService) {}
  ngOnInit(): void {
    this.loadServices();
    this.checkAdminStatus();
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
  createNewService(): void {
    // Por ahora solo navegamos a la ruta de creación
    this.router.navigate(['/services/new']);
  }

  private checkAdminStatus(): void {
    // Aquí implementarías la lógica para verificar si el usuario es admin
    // Por ahora lo dejamos como true para probar
    this.isAdmin = true;
  }
}
