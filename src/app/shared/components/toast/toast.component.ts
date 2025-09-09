import { Component, OnInit } from '@angular/core';
import {
  Toast,
  ToastNotificationService,
} from '../../../core/services/toast-notification.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toast',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private readonly notificationService: ToastNotificationService) {}

  ngOnInit(): void {
    this.notificationService.getToasts().subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  removeToast(id: number): void {
    this.notificationService.remove(id);
  }

  getToastClass(type: string): string {
    const classes: { [key: string]: string } = {
      success: 'bg-green-100 text-green-800 border-green-500',
      error: 'bg-red-100 text-red-800 border-red-500',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-500',
      info: 'bg-blue-100 text-blue-800 border-blue-500',
    };
    return classes[type] || classes['info'];
  }

  getIconClass(type: 'success' | 'error' | 'warning' | 'info'): string {
    const icons: Record<'success' | 'error' | 'warning' | 'info', string> = {
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle',
    };

    return icons[type] || icons['info'];
  }
}
