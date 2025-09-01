// settings-dropdown.component.ts
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCog,
  faUser,
  faBell,
  faMoon,
  faSun,
  faPalette,
  faSignOutAlt,
  faShieldAlt,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings-dropdown',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule, TranslateModule],
  templateUrl: './setting-selector.component.html',
  styleUrl: './setting-selector.component.scss',
})
export class SettingSelectorComponent {
  // Icônes FontAwesome
  faCog = faCog;
  faUser = faUser;
  faBell = faBell;
  faMoon = faMoon;
  faSun = faSun;
  faPalette = faPalette;
  faSignOutAlt = faSignOutAlt;
  faShieldAlt = faShieldAlt;
  faQuestionCircle = faQuestionCircle;

  isDropdownOpen = false;
  isDarkTheme = false;
  currentLang = 'fr';

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang;

    // Vérifier le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme === 'dark';
    this.applyTheme();
  }

  @HostListener('document:click')
  onDocumentClick() {
    if (this.isDropdownOpen) {
      this.closeDropdown();
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    this.applyTheme();
    this.closeDropdown();
  }

  applyTheme() {
    if (this.isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  logout() {
    // Logique de déconnexion
    console.log('Déconnexion...');
    this.closeDropdown();
    // Redirection vers la page de login
    // this.router.navigate(['/login']);
  }
}
