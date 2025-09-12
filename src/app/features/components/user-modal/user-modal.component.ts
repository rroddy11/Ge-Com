import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { ToastNotificationService } from '../../../core/services/toast-notification.service';

// Validateur personnalisé pour la confirmation de mot de passe
function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  } else {
    confirmPassword?.setErrors(null);
    return null;
  }
}

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss',
})
export class UserModalComponent {
  @Output() userCreated = new EventEmitter<any>();
  @Output() modalClosed = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef;

  userForm: FormGroup;
  isLoading = false;
  selectedFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;
  imageError: string | null = null;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly toastNotificationService: ToastNotificationService
  ) {
    this.userForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        role: ['admin', Validators.required],
        profileImage: [''],
      },
      { validators: passwordMatchValidator }
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.imageError = null;

    if (file) {
      // Vérification du type de fichier
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        this.imageError =
          'Type de fichier non supporté. Utilisez JPEG, PNG ou GIF.';
        return;
      }

      // Vérification de la taille du fichier (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        this.imageError = "La taille de l'image ne doit pas dépasser 2MB";
        return;
      }

      this.selectedFile = file;

      // Prévisualisation de l'image
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);

      // Conversion en base64 pour l'envoi
      const base64Reader = new FileReader();
      base64Reader.onloadend = () => {
        const base64String = base64Reader.result as string;
        this.userForm.patchValue({
          profileImage: base64String.split(',')[1], // Retirer le préfixe data:image/...
        });
      };
      base64Reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.previewImage = null;
    this.selectedFile = null;
    this.userForm.patchValue({ profileImage: '' });
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;

      // Préparer les données pour l'envoi
      const formData = { ...this.userForm.value };
      delete formData.confirmPassword; // Ne pas envoyer la confirmation

      this.userService.createUser(formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.toastNotificationService.success(
            'Succès',
            'Utilisateur créé avec succès'
          );
          this.userCreated.emit(response);
          this.closeModal();
        },
        error: (error) => {
          this.isLoading = false;
          const errorMsg =
            error.error?.message ||
            "Erreur lors de la création de l'utilisateur";
          this.toastNotificationService.error('Erreur', errorMsg);
          console.error('Erreur création utilisateur:', error);
        },
      });
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      this.userForm.markAllAsTouched();
    }
  }

  closeModal(): void {
    this.modalClosed.emit();
  }
}
