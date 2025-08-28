import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    console.log("AuthGuard: Vérification de l'authentification...");
    const isAuthenticated = this.authService.isAuthenticated();
    console.log(
      'AuthGuard: Token présent ?',
      localStorage.getItem('authToken')
    );
    console.log('AuthGuard: isAuthenticated ?', isAuthenticated);

    if (isAuthenticated) {
      console.log('AuthGuard: Accès autorisé à la route');
      return true;
    }

    console.log('AuthGuard: Accès refusé, redirection vers /login');
    return this.router.createUrlTree(['/login'], {
      queryParams: { returnUrl: this.router.url },
    });
  }
}
