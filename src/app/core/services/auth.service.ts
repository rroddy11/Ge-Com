import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginRequest } from '../models/login-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly mockUsers = [
    { username: 'testuser@example.com', password: 'password123' },
    { username: 'admin@example.com', password: 'admin123' },
  ];

  login(data: LoginRequest): Observable<any> {
    console.log('AuthService: Vérification des identifiants', data);
    const user = this.mockUsers.find(
      (u) => u.username === data.username && u.password === data.password
    );

    if (user) {
      const fakeToken = `fake-jwt-token-${data.username}-${Date.now()}`;
      console.log('AuthService: Token généré', fakeToken);
      return of({ token: fakeToken, user: { username: data.username } });
    } else {
      console.log('AuthService: Identifiants incorrects');
      return of({ error: 'Identifiants incorrects' });
    }
  }

  storeToken(token: string): void {
    console.log('AuthService: Stockage du token', token);
    localStorage.setItem('authToken', token);
  }

  isAuthenticated(): boolean {
    const isAuth = !!localStorage.getItem('authToken');
    console.log('AuthService: isAuthenticated', isAuth);
    return isAuth;
  }

  logout(): void {
    console.log('AuthService: Déconnexion');
    localStorage.removeItem('authToken');
  }
}
