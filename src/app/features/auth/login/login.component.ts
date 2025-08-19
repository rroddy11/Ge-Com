import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginFormComponent } from '../../../../features/auth/components/login-form/login-form.component';
import { LoginRequest } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  template: '',
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  handleLogin(data: LoginRequest) {
    this.auth.login(data).subscribe({
      next: () => {
        this.toastr.success('Connexion réussie !', 'Bienvenue');
        this.router.navigate(['/admin/dashboard']);
      },
      error: () => {
        this.toastr.error('Identifiants invalides', 'Erreur');
      },
    });
  }
}
