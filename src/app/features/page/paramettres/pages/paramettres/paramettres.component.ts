import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './paramettres.component.html',
  styleUrl: './paramettres.component.scss',
})
export class ParamettresComponent implements OnInit {
  // État par défaut des paramètres
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

  // Pour afficher des messages de confirmation
  saveMessage: string = '';
  isSaving: boolean = false;

  ngOnInit() {
    // Au chargement du composant, on récupère les paramètres sauvegardés
    this.loadSettings();
  }

  // Charge les paramètres depuis le localStorage
  loadSettings() {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
    }
  }

  // Sauvegarde les paramètres dans le localStorage
  saveSettings() {
    this.isSaving = true;

    // Simulation d'un délai de sauvegarde
    setTimeout(() => {
      localStorage.setItem('appSettings', JSON.stringify(this.settings));
      this.saveMessage = 'Paramètres enregistrés avec succès!';
      this.isSaving = false;

      // Effacer le message après 3 secondes
      setTimeout(() => {
        this.saveMessage = '';
      }, 3000);
    }, 1000);
  }

  // Gestion de la sauvegarde manuelle
  performBackup() {
    console.log('Sauvegarde manuelle effectuée');
    // Ici, vous ajouteriez le code pour effectuer une vraie sauvegarde
    alert('Sauvegarde manuelle effectuée avec succès!');
  }

  // Gestion de la restauration
  performRestore() {
    console.log('Restauration des données');
    // Ici, vous ajouteriez le code pour restaurer les données
    alert('Restauration des données effectuée avec succès!');
  }

  // Méthode pour changer la langue
  applyLanguage() {
    console.log('Langue appliquée:', this.settings.language);
    // Ici, vous implémenteriez la logique de changement de langue
    alert(`La langue a été changée pour: ${this.settings.language}`);
  }

  // Méthode pour activer/désactiver la 2FA
  toggleTwoFactor() {
    console.log('2FA activée:', this.settings.twoFactorEnabled);
    // Ici, vous implémenteriez la logique pour configurer la 2FA
  }
}
