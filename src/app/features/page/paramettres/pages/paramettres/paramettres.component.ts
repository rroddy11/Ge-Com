import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastNotificationService } from '../../../../../core/services/toast-notification.service';
import { UserModalComponent } from '../../../../components/user-modal/user-modal.component';
import { UsersTableComponent } from '../../../../../shared/components/users-table/users-table.component';

// Interface pour typer les paramètres
interface AppSettings {
  appName: string;
  autoBackup: boolean;
  backupEnabled: boolean;
  backupFrequency: string;
  language: string;
  twoFactorEnabled: boolean;
  passwordPolicy: boolean;
  passwordRequirements: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    UserModalComponent,
    UsersTableComponent,
  ],
  templateUrl: './paramettres.component.html',
  styleUrl: './paramettres.component.scss',
})
export class ParamettresComponent implements OnInit {
  settings: AppSettings = {
    appName: 'FarmShop',
    autoBackup: false,
    backupEnabled: false,
    backupFrequency: 'Quotidien',
    language: 'Français',
    twoFactorEnabled: false,
    passwordPolicy: true,
    passwordRequirements:
      'Forte (min 12 caractères, maj/min, chiffre, symbole)',
  };

  saveMessage: string = '';
  isSaving: boolean = false;
  showAddUserOption = false;
  isUserModalOpen = false;
  constructor(
    private readonly toastNotificationService: ToastNotificationService
  ) {}

  openUserModal(): void {
    if (this.showAddUserOption) {
      this.isUserModalOpen = true;
    } else {
      this.toastNotificationService.info(
        'Information',
        'Veuillez cocher "Ajouter un utilisateur" pour accéder à cette fonctionnalité'
      );
    }
  }

  closeUserModal(): void {
    this.isUserModalOpen = false;
  }

  onUserCreated(user: any): void {
    console.log('Utilisateur créé:', user);
  }

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
    }
  }

  saveSettings() {
    this.isSaving = true;

    setTimeout(() => {
      localStorage.setItem('appSettings', JSON.stringify(this.settings));
      this.saveMessage = 'Paramètres enregistrés avec succès!';
      this.isSaving = false;

      setTimeout(() => {
        this.saveMessage = '';
      }, 3000);
    }, 1000);
  }

  performBackup() {
    console.log('Sauvegarde manuelle effectuée');
    alert('Sauvegarde manuelle effectuée avec succès!');
  }

  performRestore() {
    console.log('Restauration des données');
    alert('Restauration des données effectuée avec succès!');
  }

  applyLanguage() {
    console.log('Langue appliquée:', this.settings.language);
    alert(`La langue a été changée pour: ${this.settings.language}`);
  }

  toggleTwoFactor() {
    console.log('2FA activée:', this.settings.twoFactorEnabled);
  }
}
