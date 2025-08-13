import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginRequest } from '../../../../core/models/login-request';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  handleLogin(data: LoginRequest) {
    this.authService.login(data).subscribe({
      next: (res) => {
        console.log('Connexion réussie', res);
        // Redirection vers dashboard
      },
      error: (err) => {
        console.error('Erreur de connexion', err);
      },
    });
  }
}
