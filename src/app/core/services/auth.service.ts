import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginRequest } from '../models/login-request';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.staging';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiBaseUrl;
  private readonly currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('authToken', res.token);
        this.getMe().subscribe();
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  getMe(): Observable<any> {
    const token = localStorage.getItem('authToken') || '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http
      .get(`${this.apiUrl}/me`, { headers })
      .pipe(tap((user: any) => this.currentUserSubject.next(user)));
  }

  logout() {
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  isClient(): boolean {
    return this.currentUserSubject.value?.role === 'client';
  }
}
