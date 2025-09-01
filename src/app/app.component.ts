import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'gestion-commercial';

  constructor(private readonly translate: TranslateService) {}
  ngOnInit(): void {
    console.log('AppComponent initialized');
    // Configuration de la langue
    this.translate.setDefaultLang('fr');

    // Récupérer la langue sauvegardée ou utiliser le français par défaut
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && ['fr', 'en', 'de'].includes(savedLang)) {
      this.translate.use(savedLang);
    } else {
      this.translate.use('fr');
      localStorage.setItem('preferredLanguage', 'fr');
    }
  }
}
