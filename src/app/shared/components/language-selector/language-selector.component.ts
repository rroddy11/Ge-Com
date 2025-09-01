// language-selector.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {
  isDropdownOpen = false;
  currentLang: string = 'fr'; // Valeur par défaut

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    // Initialisation sécurisée
    try {
      this.currentLang = this.translate.currentLang || 'fr';
    } catch (error) {
      console.error('Error initializing language selector:', error);
      this.currentLang = 'fr';
    }
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
    try {
      this.translate.use(lang);
      this.currentLang = lang;
      localStorage.setItem('preferredLanguage', lang);
      this.closeDropdown();
    } catch (error) {
      console.error('Error changing language:', error);
    }
  }

  getCurrentFlag(): string {
    switch (this.currentLang) {
      case 'fr':
        return '🇫🇷';
      case 'en':
        return '🇬🇧';
      case 'de':
        return '🇩🇪';
      default:
        return '🇫🇷';
    }
  }
}
