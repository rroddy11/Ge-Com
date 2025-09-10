import {
  Component,
  HostListener,
  signal,
  OnInit,
  OnDestroy,
  ElementRef,
} from '@angular/core';
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
import { ToastNotificationService } from '../../../core/services/toast-notification.service';
import { User } from '../../../core/models/user';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-selector',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, TranslateModule],
  templateUrl: './user-selector.component.html',
  styleUrl: './user-selector.component.scss',
})
export class UserSelectorComponent implements OnInit, OnDestroy {
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

  // Signaux - S'assurer que le dropdown est fermé par défaut
  isDropdownOpen = signal(false);
  isDarkTheme = signal(false);
  currentUser: User | null = null;
  private userSubscription!: Subscription;

  constructor(
    private readonly translate: TranslateService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly toastNotificationService: ToastNotificationService,
    private elementRef: ElementRef // Ajout pour référencer l'élément
  ) {
    // Vérifier le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme.set(savedTheme === 'dark');
    this.applyTheme();
  }

  // Modifier le HostListener pour vérifier si le clic est en dehors du composant
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (
      this.isDropdownOpen() &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.closeDropdown();
    }
  }

  ngOnInit(): void {
    // S'assurer que le dropdown est fermé au démarrage
    this.isDropdownOpen.set(false);

    // S'abonner aux changements de l'utilisateur
    this.userSubscription = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });

    // Charger les données utilisateur si déjà authentifié
    if (this.authService.isAuthenticated() && !this.currentUser) {
      this.authService.getMe().subscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    console.log(
      'Toggle dropdown clicked, current state:',
      this.isDropdownOpen()
    ); // Debug
    this.isDropdownOpen.set(!this.isDropdownOpen());
    console.log('New state:', this.isDropdownOpen()); // Debug
  }

  closeDropdown() {
    console.log('Closing dropdown'); // Debug
    this.isDropdownOpen.set(false);
  }

  // Méthode spécifique pour gérer les clics dans le dropdown
  onDropdownClick(event: Event) {
    event.stopPropagation();
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

  // Méthode pour obtenir l'URL de l'image de profil
  getProfileImage(): string {
    if (this.currentUser?.profileImage) {
      const base64Prefix = 'data:image/jpeg;base64,';
      return this.currentUser.profileImage.startsWith(base64Prefix)
        ? this.currentUser.profileImage
        : base64Prefix + this.currentUser.profileImage;
    }
    return '/assets/images/img/nv/possin.png';
  }

  // Méthode pour obtenir le rôle formaté
  getFormattedRole(): string {
    if (!this.currentUser?.role) return 'Utilisateur';

    const roles: { [key: string]: string } = {
      admin: 'Administrateur',
      vendeur: 'Vendeur',
      livreur: 'Livreur',
    };

    return roles[this.currentUser.role] || this.currentUser.role;
  }

  logout() {
    try {
      this.authService.logout();

      // Notification de succès
      this.toastNotificationService.success(
        'Déconnexion réussie',
        'Vous avez été déconnecté avec succès. À bientôt!',
        3000
      );

      this.closeDropdown();
      this.router.navigate(['/login']);
    } catch (error) {
      this.toastNotificationService.error(
        'Erreur de déconnexion',
        "Une erreur s'est produite lors de la déconnexion. Veuillez réessayer."
      );
      console.error('Erreur lors de la déconnexion:', error);
    }
  }
}
