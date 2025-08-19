import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
import { ApiHealthService } from './api-health.service';
import { Observable, of, switchMap, delay, map } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  user?: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiBaseUrl}/auth`;

  constructor(
    private http: HttpClient,
    private token: TokenService,
    private health: ApiHealthService
  ) {}

  login(body: LoginRequest): Observable<LoginResponse> {
    const tryMock = environment.useMockApi;

    const real$ = this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, body)
      .pipe(
        map((res) => {
          if (res?.token) this.token.set(res.token);
          return res;
        })
      );

    const mock$ = of({
      token: this.fakeJwt(60 * 60),
      user: { id: 1, email: body.username, roles: ['ADMIN'] },
    }).pipe(
      delay(400),
      map((res) => {
        this.token.set(res.token);
        return res;
      })
    );

    if (tryMock) return mock$;

    return this.health
      .isBackendAlive()
      .pipe(switchMap((alive) => (alive ? real$ : mock$)));
  }

  me(): Observable<any> {
    if (environment.useMockApi) {
      return of({ id: 1, email: 'admin@test.com', roles: ['ADMIN'] }).pipe(
        delay(200)
      );
    }
    return this.http.get(`${this.baseUrl}/me`);
  }

  isLoggedIn(): boolean {
    return !this.token.isExpired();
  }

  logout(): void {
    this.token.clear();
  }

  private fakeJwt(ttlSeconds: number): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
    const payload = btoa(
      JSON.stringify({
        sub: '1',
        email: 'admin@test.com',
        exp,
        roles: ['ADMIN'],
      })
    );
    const sig = 'mock-signature';
    return `${header}.${payload}.${sig}`;
  }
}
