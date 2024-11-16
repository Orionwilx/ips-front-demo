import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceModel } from '../../models/service.model';
import { environment } from '../../../../enviroment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiUrl = `${environment.apiUrl}/services/all`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllServices(): Observable<ServiceModel[]> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No hay token disponible');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ServiceModel[]>(this.apiUrl, { headers });
  }
}
