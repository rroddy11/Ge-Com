// user-edit-modal.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { ToastNotificationService } from '../../../core/services/toast-notification.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-user-edit-modal',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    LoaderComponent,
  ],
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss'],
})
export class UserEditModalComponent {
  @Input() user: any;
  @Output() userUpdated = new EventEmitter<any>();
  @Output() modalClosed = new EventEmitter<void>();

  userForm: FormGroup;
  isLoading = false;
  selectedFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;
  imageError: string | null = null;
  showPassword = false; // Ajout de cette propriété

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastNotificationService: ToastNotificationService
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)],
      role: ['', Validators.required],
      profileImage: [''],
    });
  }

  ngOnChanges(): void {
    if (this.user) {
      this.populateForm();
    }
  }

  private populateForm(): void {
    this.userForm.patchValue({
      username: this.user.username,
      email: this.user.email,
      role: this.user.role,
    });

    if (this.user.profileImage) {
      this.previewImage = this.getImageUrl(this.user.profileImage);
    }
  }

  // Ajout de la fonction manquante
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.imageError = null;

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        this.imageError = 'Type de fichier non supporté';
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        this.imageError = "La taille de l'image ne doit pas dépasser 2MB";
        return;
      }

      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);

      const base64Reader = new FileReader();
      base64Reader.onloadend = () => {
        const base64String = base64Reader.result as string;
        this.userForm.patchValue({
          profileImage: base64String.split(',')[1],
        });
      };
      base64Reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.previewImage = null;
    this.selectedFile = null;
    this.userForm.patchValue({ profileImage: '' });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;

      const formData = { ...this.userForm.value };

      // Si le mot de passe est vide, on le retire des données
      if (!formData.password) {
        delete formData.password;
      }

      this.userService.updateUser(this.user._id, formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.toastNotificationService.success(
            'Succès',
            'Utilisateur modifié avec succès'
          );
          this.userUpdated.emit(response);
          this.closeModal();
        },
        error: (error) => {
          this.isLoading = false;
          const errorMsg =
            error.error?.message ||
            "Erreur lors de la modification de l'utilisateur";
          this.toastNotificationService.error('Erreur', errorMsg);
        },
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  closeModal(): void {
    this.modalClosed.emit();
  }

  getImageUrl(imageData: string): string {
    if (!imageData) return 'https://via.placeholder.com/40x40?text=👤';
    if (imageData.startsWith('http')) return imageData;
    if (imageData.startsWith('data:image')) return imageData;
    return `data:image/jpeg;base64,${imageData}`;
  }
}
