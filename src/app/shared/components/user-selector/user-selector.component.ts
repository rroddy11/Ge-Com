// user-dropdown.component.ts
import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faCog,
  faCreditCard,
  faSignOutAlt,
  faShieldAlt,
  faQuestionCircle,
  faEnvelope,
  faHistory,
  faStar,
  faPalette,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-selector',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, TranslateModule],
  templateUrl: './user-selector.component.html',
  styleUrl: './user-selector.component.scss',
})
export class UserSelectorComponent {
  // Icônes FontAwesome
  faUser = faUser;
  faCog = faCog;
  faCreditCard = faCreditCard;
  faSignOutAlt = faSignOutAlt;
  faShieldAlt = faShieldAlt;
  faQuestionCircle = faQuestionCircle;
  faEnvelope = faEnvelope;
  faHistory = faHistory;
  faStar = faStar;
  faPalette = faPalette;
  faMoon = faMoon;
  faSun = faSun;

  // Signaux
  isDropdownOpen = signal(false);
  isDarkTheme = signal(false);

  constructor(
    private readonly translate: TranslateService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    // Vérifier le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme.set(savedTheme === 'dark');
    this.applyTheme();
  }

  @HostListener('document:click')
  onDocumentClick() {
    if (this.isDropdownOpen()) {
      this.closeDropdown();
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }

  toggleTheme() {
    this.isDarkTheme.set(!this.isDarkTheme());
    localStorage.setItem('theme', this.isDarkTheme() ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme() {
    if (this.isDarkTheme()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  logout() {
    this.authService.logout();
    this.closeDropdown();
    this.router.navigate(['/login']);
  }
}
