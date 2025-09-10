import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { AuthService } from '../../../../../core/services/auth.service';
import { LoginRequest } from '../../../../../core/models/login-request';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastNotificationService } from '../../../../../core/services/toast-notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastNotificationService: ToastNotificationService
  ) {}

  handleLogin(data: LoginRequest) {
    this.errorMessage = null;
    console.log('Tentative de connexion avec :', data);

    this.authService.login(data).subscribe({
      next: (res) => {
        console.log('Réponse du service AuthService :', res);

        if (res.token) {
          console.log('Connexion réussie, token déjà stocké par AuthService.');

          this.toastNotificationService.success(
            'Connexion réussie',
            'Vous êtes maintenant connecté à votre compte.'
          );

          console.log('Redirection vers /admin/dashboard...');
          this.router.navigate(['/admin/dashboard/accueil']).then((success) => {
            console.log('Navigation réussie ?', success);
          });
        } else {
          this.errorMessage = 'Erreur de connexion';
          console.log('Erreur :', this.errorMessage);

          // Utilisation de l'opérateur de coalescence pour gérer le cas null
          this.toastNotificationService.error(
            'Échec de connexion',
            this.errorMessage ?? 'Erreur inconnue' // Fournit une valeur par défaut si null
          );
        }
      },
      error: (err) => {
        this.errorMessage = 'Erreur de connexion. Veuillez réessayer.';
        console.error('Erreur lors de la connexion :', err);

        const errorMsg =
          err.error?.message || 'Erreur de connexion. Veuillez réessayer.';

        this.toastNotificationService.error('Erreur de connexion', errorMsg);
      },
    });
  }
}
