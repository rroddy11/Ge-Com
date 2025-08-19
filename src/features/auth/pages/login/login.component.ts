import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import {
  AuthService,
  LoginRequest,
} from '../../../../app/core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  template: `<app-login-form (submitForm)="onLogin($event)"></app-login-form>`,
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onLogin(credentials: { username: string; password: string }) {
    const body: LoginRequest = {
      username: credentials.username,
      password: credentials.password,
    };

    this.authService.login(body).subscribe({
      next: (res) => {
        console.log('Login response', res); // tu devrais voir token et user
        // this.toastr.success('Connexion réussie !', 'Succès');
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        console.error('Login error', err);
        this.toastr.error('Identifiants incorrects', 'Erreur');
      },
    });
  }
}
