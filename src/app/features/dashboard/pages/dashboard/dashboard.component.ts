import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  username: string = 'Utilisateur';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    console.log('DashboardComponent chargé'); // Log pour débogage
    const token = localStorage.getItem('authToken');
    if (token) {
      this.username = token.split('-')[2] || 'Utilisateur';
      console.log('Utilisateur connecté :', this.username);
    } else {
      console.log('Aucun token trouvé, redirection vers /login');
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
