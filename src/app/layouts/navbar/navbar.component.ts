import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faCog,
  faSearch,
  faUser,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { LanguageSelectorComponent } from '../../shared/components/language-selector/language-selector.component';
import { SettingSelectorComponent } from '../../shared/components/setting-selector/setting-selector.component';
import { NotificationsSelectorComponent } from '../../shared/components/notification-selector/notification-selector.component';
import { UserSelectorComponent } from '../../shared/components/user-selector/user-selector.component';
import { Product } from '../../core/models/product';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { SearchService } from '../../core/services/search.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [
    FontAwesomeModule,
    CommonModule,
    LanguageSelectorComponent,
    SettingSelectorComponent,
    NotificationsSelectorComponent,
    UserSelectorComponent,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  faSearch = faSearch;
  faNotification = faBell;
  faUser = faUser;
  faSetting = faCog;
  faTimes = faTimes;

  // Propriétés de recherche
  searchQuery = '';
  searchResults: Product[] = [];
  showSearchResults = false;
  isSearchFocused = false;

  // Subject pour gérer les unsubscriptions
  private readonly destroy$ = new Subject<void>();
  private readonly searchSubject = new Subject<string>();

  constructor(
    private readonly searchService: SearchService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    // Configuration du debounce pour la recherche (300ms)
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((query) => {
        this.performSearch(query);
      });

    // Écouter les résultats de recherche
    this.searchService
      .getSearchResults()
      .pipe(takeUntil(this.destroy$))
      .subscribe((results) => {
        this.searchResults = results;
        this.showSearchResults =
          this.searchQuery.length > 0 && results.length > 0;
      });

    // Fermer les résultats de recherche quand on clique ailleurs
    document.addEventListener('click', this.handleClickOutside.bind(this));
  }

  // Recherche en temps réel avec debounce
  onSearchInput() {
    this.searchSubject.next(this.searchQuery);
  }

  // Exécuter la recherche
  performSearch(query: string) {
    if (query.trim().length === 0) {
      // Si la recherche est vide, on cache les résultats
      this.searchResults = [];
      this.showSearchResults = false;
      this.searchService.clearSearch();
    } else {
      // Recherche globale
      this.searchService.searchGlobal(query);
    }
  }

  // Vider la recherche
  clearSearch() {
    this.searchQuery = '';
    this.searchResults = [];
    this.showSearchResults = false;
    this.searchService.clearSearch();
  }

  // Rediriger vers la page du produit
  goToProduct(product: Product) {
    this.clearSearch();
    this.router.navigate(['/products', product.name]);
  }

  // Recherche globale (touche Entrée)
  onSearchSubmit(event: Event) {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchQuery },
      });
      this.clearSearch();
    }
  }

  // Gérer le focus
  onSearchFocus() {
    this.isSearchFocused = true;
    if (this.searchQuery.length > 0 && this.searchResults.length > 0) {
      this.showSearchResults = true;
    }
  }

  onSearchBlur() {
    setTimeout(() => {
      this.isSearchFocused = false;
    }, 200);
  }

  // Fermer les résultats quand on clique ailleurs
  handleClickOutside(event: MouseEvent) {
    const searchContainer = document.querySelector('.research-nav');
    if (searchContainer && !searchContainer.contains(event.target as Node)) {
      this.showSearchResults = false;
    }
  }

  // Navigation
  navigateTo(path: string) {
    this.router.navigate([path]);
    this.clearSearch();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }
}
