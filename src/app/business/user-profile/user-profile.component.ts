import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  viewServices() {
    throw new Error('Method not implemented.');
  }

  user: UserModel | null = null;
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Error al cargar el perfil:', error);
        this.errorMessage = 'No se pudo cargar la información del usuario';
      },
    });
  }

  editProfile() {
    // Implementar lógica para editar perfil
    console.log('Editar perfil');
  }
}
