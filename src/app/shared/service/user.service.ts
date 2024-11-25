import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { environment } from '../../../../enviroment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCurrentUser(): Observable<UserModel> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No hay token disponible');
    }

    // Agrega logs para depuración
    console.log('Token usado:', token);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Añade el header Accept

    const email = this.getUserEmail();

    // Agrega más logs para depuración
    console.log('Token:', token);
    console.log('URL:', `${this.apiUrl}/${email}`);
    console.log('Headers:', {
      Authorization: headers.get('Authorization'),
      ContentType: headers.get('Content-Type'),
      Accept: headers.get('Accept'),
    });

    return this.http.get<UserModel>(`${this.apiUrl}/${email}`, {
      headers,
      observe: 'body',
      responseType: 'json' as 'json',
    });
  }

  private getUserEmail(): string {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No hay token disponible');
    }

    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      console.log('Token decodificado:', tokenData);
      // Verifica la estructura del token decodificado
      if (!tokenData.sub && !tokenData.email) {
        throw new Error('Token no contiene email o sub');
      }
      return tokenData.sub || tokenData.email;
    } catch (e) {
      console.error('Error al decodificar el token:', e);
      throw new Error('Token inválido');
    }
  }
}
