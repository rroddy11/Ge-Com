import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.staging';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = environment.apiBaseUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  createUser(userData: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // récupère ton JWT

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // 🔥 très important
      'Content-Type': 'application/json', // en général requis
    });

    return this.http.post(`${this.apiUrl}/register`, userData, { headers });
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
  // Récupérer tous les utilisateurs
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`, {
      headers: this.getHeaders(),
    });
  }

  // Récupérer un utilisateur par ID
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Mettre à jour un utilisateur
  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData, {
      headers: this.getHeaders(),
    });
  }

  // Supprimer un utilisateur
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
