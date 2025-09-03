import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { AuthService } from '../../../../../core/services/auth.service';
import { LoginRequest } from '../../../../../core/models/login-request';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    private readonly router: Router
  ) {}

  handleLogin(data: LoginRequest) {
    this.errorMessage = null;
    console.log('Tentative de connexion avec :', data); // Log pour débogage
    this.authService.login(data).subscribe({
      next: (res) => {
        console.log('Réponse du service AuthService :', res); // Log pour débogage
        if (res.token) {
          console.log('Connexion réussie, stockage du token...');
          this.authService.storeToken(res.token);
          console.log('Redirection vers /admin/dashboard...');
          this.router.navigate(['/admin/dashboard/accueil']).then((success) => {
            console.log('Navigation réussie ?', success); // Vérifie si la navigation a fonctionné
          });
        } else {
          this.errorMessage = res.error || 'Erreur de connexion';
          console.log('Erreur :', this.errorMessage);
        }
      },
      error: (err) => {
        this.errorMessage = 'Erreur de connexion. Veuillez réessayer.';
        console.error('Erreur lors de la connexion :', err);
      },
    });
  }
}
