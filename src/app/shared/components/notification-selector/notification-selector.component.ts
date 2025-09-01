import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faCircle,
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faTrashAlt,
  faEye,
  faCheckDouble,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Notification } from '../../../core/models/notification.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notifications-dropdown',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TranslateModule],
  templateUrl: './notification-selector.component.html',
  styleUrl: './notification-selector.component.scss',
})
export class NotificationsSelectorComponent {
  // Icônes FontAwesome
  faBell = faBell;
  faCircle = faCircle;
  faCheckCircle = faCheckCircle;
  faExclamationCircle = faExclamationCircle;
  faInfoCircle = faInfoCircle;
  faTrashAlt = faTrashAlt;
  faEye = faEye;
  faCheckDouble = faCheckDouble;

  // Signaux
  isDropdownOpen = signal(false);

  // Injecter le service
  constructor(
    private translate: TranslateService,
    public notificationService: NotificationService
  ) {}

  @HostListener('document:click')
  onDocumentClick() {
    if (this.isDropdownOpen()) {
      this.closeDropdown();
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen.set(!this.isDropdownOpen());

    // Marquer comme lues quand on ouvre le dropdown
    if (this.isDropdownOpen()) {
      this.markAllAsRead();
    }
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }

  // Obtenir la classe CSS pour l'icône en fonction du type
  getNotificationIconClass(type: string): string {
    const classes = {
      success: 'text-green-500 bg-green-100 p-2 rounded-full',
      warning: 'text-yellow-500 bg-yellow-100 p-2 rounded-full',
      error: 'text-red-500 bg-red-100 p-2 rounded-full',
      info: 'text-blue-500 bg-blue-100 p-2 rounded-full',
    };
    return (
      classes[type as keyof typeof classes] ||
      'text-gray-500 bg-gray-100 p-2 rounded-full'
    );
  }

  // Marquer une notification comme lue
  markAsRead(id: number) {
    this.notificationService.notifications.update((notifs) =>
      notifs.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    this.updateUnreadCount();
  }

  // Marquer toutes les notifications comme lues
  markAllAsRead() {
    this.notificationService.notifications.update((notifs) =>
      notifs.map((notif) => ({ ...notif, read: true }))
    );
    this.updateUnreadCount();
  }

  // Supprimer une notification
  deleteNotification(id: number) {
    this.notificationService.notifications.update((notifs) =>
      notifs.filter((notif) => notif.id !== id)
    );
    this.updateUnreadCount();
  }

  // Supprimer toutes les notifications
  clearAll() {
    this.notificationService.notifications.set([]);
    this.updateUnreadCount();
  }

  // Mettre à jour le compteur de notifications non lues
  private updateUnreadCount() {
    const unread = this.notificationService
      .notifications()
      .filter((notif) => !notif.read).length;
    this.notificationService.unreadCount.set(unread);
  }

  // Ajouter une nouvelle notification
  addNotification(notification: Notification) {
    this.notificationService.notifications.update((notifs) => [
      ...notifs,
      notification,
    ]);
    this.updateUnreadCount();
  }
}
