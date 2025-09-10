import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.staging';
import { LoginRequest } from '../models/login-request';
import { throwError } from 'rxjs';

// Define interfaces for better type safety
interface AuthResponse {
  token: string;
  user?: any; // Replace 'any' with a specific User interface if available
}

interface User {
  id?: string;
  role?: string;
  [key: string]: any; // Flexible for additional properties
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiBaseUrl;
  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  public readonly currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token || ''}`,
    });
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    console.log('✅ Login data before sending to backend:', data);
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap((res: AuthResponse) => {
        if (res.token) {
          localStorage.setItem('authToken', res.token);
          this.getMe().subscribe();
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(() => new Error('Registration failed'));
      })
    );
  }

  getMe(): Observable<User> {
    return this.http
      .get<User>(`${this.apiUrl}/me`, { headers: this.getHeaders() })
      .pipe(
        tap((user: User) => this.currentUserSubject.next(user)),
        catchError((error) => {
          console.error('Error fetching user data:', error);
          this.logout(); // Clear session on error
          return throwError(() => new Error('Failed to fetch user data'));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  isClient(): boolean {
    return this.currentUserSubject.value?.role === 'client';
  }
}
