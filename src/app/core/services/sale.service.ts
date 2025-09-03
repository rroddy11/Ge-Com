import { Injectable } from '@angular/core';
import { Sale } from '../models/sale.model';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private readonly sales: Sale[] = [
    {
      id: 'T001',
      type: 'Vente',
      date: new Date('2024-07-20'),
      client: 'Ferme du Bonheur',
      product: 'Légumes frais',
      quantity: 50,
      total: 550.0,
      status: 'completed',
    },
    {
      id: 'T003',
      type: 'Vente',
      date: new Date('2024-07-18'),
      client: 'Restaurant Saveur',
      product: 'Œufs bio',
      quantity: 20,
      total: 120.0,
      status: 'completed',
    },
    {
      id: 'T004',
      type: 'Vente',
      date: new Date('2024-07-18'),
      client: 'Client Local',
      product: 'Fruits de saison',
      quantity: 30,
      total: 180.0,
      status: 'completed',
    },
    {
      id: 'T006',
      type: 'Vente',
      date: new Date('2024-07-17'),
      client: 'Marché Urbain',
      product: 'Fromages artisanaux',
      quantity: 15,
      total: 450.0,
      status: 'cancelled',
    },
    {
      id: 'T007',
      type: 'Vente',
      date: new Date('2024-07-16'),
      client: 'Boulangerie Tradition',
      product: 'Farine de blé',
      quantity: 100,
      total: 800.0,
      status: 'completed',
    },
    {
      id: 'T008',
      type: 'Vente',
      date: new Date('2024-07-15'),
      client: 'Café Central',
      product: 'Café bio',
      quantity: 25,
      total: 375.0,
      status: 'completed',
    },
    {
      id: 'T009',
      type: 'Vente',
      date: new Date('2024-07-14'),
      client: 'Épicerie Fine',
      product: 'Miel artisanal',
      quantity: 40,
      total: 320.0,
      status: 'completed',
    },
  ];

  getSales(): Sale[] {
    return this.sales;
  }

  getTotalSales(): number {
    return this.sales
      .filter((sale) => sale.status === 'completed')
      .reduce((sum, sale) => sum + sale.total, 0);
  }

  getRecentSales(limit: number = 5): Sale[] {
    return this.sales
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit);
  }
}
