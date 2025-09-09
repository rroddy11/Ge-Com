import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Toast {
  id?: number;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  progress?: number; // Explicitement optionnelle
  leaving?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationService {
  private toasts: Toast[] = [];
  private readonly toastsSubject = new BehaviorSubject<Toast[]>([]);
  private currentId = 0;

  constructor() {}

  // Observable pour s'abonner aux changements de toasts
  getToasts(): Observable<Toast[]> {
    return this.toastsSubject.asObservable();
  }

  // Dans notification.service.ts
  show(toast: Toast): void {
    toast.id = this.currentId++;
    toast.progress = 100; // Initialisation explicite
    this.toasts.push(toast);
    this.toastsSubject.next(this.toasts);

    const duration = toast.duration || 5000;
    const interval = 50;
    const steps = duration / interval;
    const decrement = 100 / steps;

    const progressInterval = setInterval(() => {
      const toastIndex = this.toasts.findIndex((t) => t.id === toast.id);

      // Utilisation de l'opérateur de non-null assertion (!)
      if (toastIndex >= 0 && this.toasts[toastIndex].progress! > 0) {
        this.toasts[toastIndex].progress! -= decrement;
        this.toastsSubject.next(this.toasts);
      } else {
        clearInterval(progressInterval);
      }
    }, interval);

    setTimeout(() => {
      this.remove(toast.id!);
      clearInterval(progressInterval);
    }, duration);
  }

  // Méthodes pratiques pour différents types de toast
  success(title: string, message: string, duration?: number): void {
    this.show({ type: 'success', title, message, duration });
  }

  error(title: string, message: string, duration?: number): void {
    this.show({ type: 'error', title, message, duration });
  }

  warning(title: string, message: string, duration?: number): void {
    this.show({ type: 'warning', title, message, duration });
  }

  info(title: string, message: string, duration?: number): void {
    this.show({ type: 'info', title, message, duration });
  }

  // Méthode pour supprimer un toast
  remove(id: number): void {
    // Marquer le toast comme "en train de partir" pour l'animation
    const toastIndex = this.toasts.findIndex((t) => t.id === id);
    if (toastIndex >= 0) {
      // Attendre la fin de l'animation avant de supprimer
      setTimeout(() => {
        this.toasts = this.toasts.filter((toast) => toast.id !== id);
        this.toastsSubject.next(this.toasts);
      }, 300); // Durée de l'animation
    }
  }

  // Méthode pour vider tous les toasts
  clear(): void {
    this.toasts = [];
    this.toastsSubject.next(this.toasts);
  }
}
