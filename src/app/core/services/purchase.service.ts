import { Injectable } from '@angular/core';
import { Purchase } from '../models/purchase.model';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private purchases: Purchase[] = [
    {
      id: 'T002',
      type: 'Achat',
      date: new Date('2024-07-19'),
      supplier: 'Grossiste Bio',
      product: 'Graines de maïs',
      quantity: 10,
      total: 200.0,
      status: 'in_progress',
    },
    {
      id: 'T005',
      type: 'Achat',
      date: new Date('2024-07-17'),
      supplier: 'Fournisseur Engrais',
      product: 'Engrais naturel',
      quantity: 5,
      total: 350.0,
      status: 'completed',
    },
    {
      id: 'T010',
      type: 'Achat',
      date: new Date('2024-07-13'),
      supplier: 'Équipement Agricole',
      product: 'Outils de jardinage',
      quantity: 8,
      total: 480.0,
      status: 'completed',
    },
    {
      id: 'T011',
      type: 'Achat',
      date: new Date('2024-07-12'),
      supplier: 'Semences Pro',
      product: 'Semences biologiques',
      quantity: 15,
      total: 225.0,
      status: 'completed',
    },
    {
      id: 'T012',
      type: 'Achat',
      date: new Date('2024-07-10'),
      supplier: 'Transport Logistique',
      product: 'Service de livraison',
      quantity: 1,
      total: 150.0,
      status: 'completed',
    },
    {
      id: 'T013',
      type: 'Achat',
      date: new Date('2024-07-08'),
      supplier: 'Énergie Verte',
      product: 'Panneaux solaires',
      quantity: 3,
      total: 1200.0,
      status: 'in_progress',
    },
    {
      id: 'T014',
      type: 'Achat',
      date: new Date('2024-07-05'),
      supplier: 'Emballages Eco',
      product: 'Emballages biodégradables',
      quantity: 100,
      total: 300.0,
      status: 'completed',
    },
    {
      id: 'T015',
      type: 'Achat',
      date: new Date('2024-07-03'),
      supplier: 'Maintenance Agricole',
      product: 'Service d entretien',
      quantity: 1,
      total: 450.0,
      status: 'completed',
    },
  ];

  getPurchases(): Purchase[] {
    return this.purchases;
  }

  getTotalPurchases(): number {
    return this.purchases
      .filter((purchase) => purchase.status === 'completed')
      .reduce((sum, purchase) => sum + purchase.total, 0);
  }

  getRecentPurchases(limit: number = 5): Purchase[] {
    return this.purchases
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit);
  }
}
