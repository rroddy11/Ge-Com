import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { AuthService } from '../../../../../core/services/auth.service';
import { LoginRequest } from '../../../../../core/models/login-request';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastNotificationService } from '../../../../../core/services/toast-notification.service';
import { LoaderComponent } from '../../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, CommonModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  errorMessage: string | null = null;
  isLoading = false; // 👈 état local du loading

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastNotificationService: ToastNotificationService
  ) {}

  handleLogin(data: LoginRequest) {
    this.errorMessage = null;
    this.isLoading = true; // 👈 activer le loading

    this.authService.login(data).subscribe({
      next: (res) => {
        this.isLoading = false; // 👈 désactiver à la réponse
        if (res.token) {
          this.toastNotificationService.success(
            'Connexion réussie',
            'Vous êtes maintenant connecté à votre compte.'
          );
          this.router.navigate(['/admin/dashboard/accueil']);
        } else {
          this.errorMessage = 'Erreur de connexion';
          console.log('Erreur :', this.errorMessage);
          this.toastNotificationService.error(
            'Échec de connexion',
            this.errorMessage ?? 'Erreur inconnue'
          );
        }
      },
      error: (err) => {
        this.isLoading = false; // 👈 désactiver en cas d’erreur
        this.errorMessage = 'Erreur de connexion. Veuillez réessayer.';
        this.toastNotificationService.error(
          'Erreur de connexion',
          err.error?.message || this.errorMessage
        );
      },
    });
  }
}
