import { Injectable } from '@angular/core';

const KEY = 'gc_token';

@Injectable({ providedIn: 'root' })
export class TokenService {
  get(): string | null {
    return localStorage.getItem(KEY);
  }
  set(token: string): void {
    localStorage.setItem(KEY, token);
  }
  clear(): void {
    localStorage.removeItem(KEY);
  }

  isExpired(token?: string | null): boolean {
    token = token ?? this.get();
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      const exp = payload?.exp;
      if (!exp) return false;
      return Date.now() >= exp * 1000;
    } catch {
      return false; // si ce n’est pas un JWT, on laisse passer en mode mock
    }
  }
}
