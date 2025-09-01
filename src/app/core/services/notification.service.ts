import { Injectable, signal } from '@angular/core';
import { Notification } from '../models/notification.model';
import {
  faShoppingCart,
  faUserPlus,
  faBoxOpen,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // Signaux pour gérer les notifications et le compteur de non-lues
  notifications = signal<Notification[]>([]);
  unreadCount = signal(0);

  constructor() {
    this.loadNotifications();
  }

  // Charger les notifications initiales (exemple statique)
  loadNotifications() {
    const sampleNotifications: Notification[] = [
      {
        id: 1,
        type: 'success',
        title: 'Commande livrée',
        message: 'Votre commande #12345 a été livrée avec succès',
        time: 'Il y a 2 minutes',
        read: false,
        icon: faShoppingCart,
      },
      {
        id: 2,
        type: 'info',
        title: 'Nouvel utilisateur',
        message: "Un nouvel utilisateur s'est inscrit sur la plateforme",
        time: 'Il y a 15 minutes',
        read: false,
        icon: faUserPlus,
      },
      {
        id: 3,
        type: 'warning',
        title: 'Stock faible',
        message: 'Le stock de "Pommes Gala Bio" est faible (5 restants)',
        time: 'Il y a 1 heure',
        read: true,
        icon: faBoxOpen,
      },
      {
        id: 4,
        type: 'error',
        title: 'Erreur de paiement',
        message:
          'Un problème est survenu lors du traitement du paiement #67890',
        time: 'Il y a 3 heures',
        read: true,
        icon: faExclamationCircle,
      },
    ];

    this.notifications.set(sampleNotifications);
    this.unreadCount.set(
      this.notifications().filter((notif) => !notif.read).length
    );
  }
}
