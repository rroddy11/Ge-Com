import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ToastNotificationService } from '../../../core/services/toast-notification.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { LoaderComponent } from '../loader/loader.component';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-users-table',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    LoaderComponent,
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent implements OnInit {
  users: User[] = [];
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 3;
  searchTerm = '';
  public Math = Math;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(
    private readonly userService: UserService,
    private readonly toastNotificationService: ToastNotificationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.toastNotificationService.error(
          'Erreur',
          'Impossible de charger les utilisateurs'
        );
        console.error('Erreur chargement utilisateurs:', error);
      },
    });
  }

  get filteredUsers(): User[] {
    if (!this.searchTerm) {
      return this.users;
    }

    return this.users.filter(
      (user) =>
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  getRoleBadgeClass(role: string): string {
    const classes: { [key: string]: string } = {
      admin: 'bg-purple-100 text-purple-800',
      vendeur: 'bg-blue-100 text-blue-800',
      livreur: 'bg-green-100 text-green-800',
      client: 'bg-gray-100 text-gray-800',
    };
    return classes[role] || 'bg-gray-100 text-gray-800';
  }

  getRoleDisplayName(role: string): string {
    const names: { [key: string]: string } = {
      admin: 'Administrateur',
      vendeur: 'Vendeur',
      livreur: 'Livreur',
      client: 'Client',
    };
    return names[role] || role;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  getImageUrl(imageData: string | undefined): string {
    if (!imageData) {
      return 'https://via.placeholder.com/40x40?text=👤';
    }

    // Si c'est déjà une URL complète
    if (imageData.startsWith('http')) {
      return imageData;
    }

    // Si c'est une image en base64
    if (imageData.startsWith('data:image')) {
      return imageData;
    }

    // Si c'est juste le data base64 sans prefixe
    return `data:image/jpeg;base64,${imageData}`;
  }

  deleteUser(userId: string, username: string): void {
    if (
      confirm(
        `Êtes-vous sûr de vouloir supprimer l'utilisateur "${username}" ?`
      )
    ) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.toastNotificationService.success(
            'Succès',
            'Utilisateur supprimé avec succès'
          );
          this.loadUsers();
        },
        error: (error) => {
          this.toastNotificationService.error(
            'Erreur',
            "Impossible de supprimer l'utilisateur"
          );
          console.error('Erreur suppression utilisateur:', error);
        },
      });
    }
  }
}
