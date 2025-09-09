import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from './shared/components/toast/toast.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    LoaderComponent,
    FormsModule,
    ToastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'gestion-commercial';
  isLoading = false;

  constructor(
    private readonly translate: TranslateService,
    private readonly router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
        console.log('=================this.isLoading', this.isLoading);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.isLoading = false;
      }
    });
  }
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
