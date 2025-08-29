import { Injectable } from '@angular/core';
import { RecentActivity } from '../models/activity-recentely';

@Injectable({
  providedIn: 'root',
})
export class RecentActivityService {
  private readonly recentActivity: RecentActivity[] = [
    {
      activity: 'Vente #2024-0012: Fruits & Légumes',
      temp: '2 minutes',
      price: '€125.50',
    },
    {
      activity: 'Achat Fournisseur: Céréales',
      temp: '1 heure',
      price: '-€300.00',
    },
    {
      activity: 'Vente #2024-0011: Produits Laitiers',
      temp: '4 heures',
      price: '€78.90',
    },
    {
      activity: 'Vente #2024-0010: Viande de Porc',
      temp: 'Hier',
      price: '€210.00',
    },
    {
      activity: "Achat Fournisseur: Matériel d'Emballage",
      temp: 'Hier',
      price: '-€150.00',
    },
  ];

  getRecentActivity(): RecentActivity[] {
    return this.recentActivity;
  }
}
