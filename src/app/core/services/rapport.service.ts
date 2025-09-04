import { Injectable } from '@angular/core';
import { Sale, Product, SalesData, RapportData } from '../models/rapport.model';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RapportService {
  constructor() {}

  getRapportData(): Observable<RapportData> {
    // Données simulées pour le tableau de bord
    const data: RapportData = {
      totalSales: 24567,
      salesGrowth: 12.5,
      grossMargin: 8930,
      marginGrowth: 8.2,
      ordersProcessed: 1245,
      ordersGrowth: -1.0,
      activeCustomers: 580,
      customersGrowth: 5.1,
      salesEvolution: [
        { date: 'Jan', sales: 18000, profit: 6000 },
        { date: 'Fév', sales: 21000, profit: 7000 },
        { date: 'Mar', sales: 19500, profit: 6500 },
        { date: 'Avr', sales: 23000, profit: 7500 },
        { date: 'Mai', sales: 22000, profit: 7200 },
        { date: 'Juin', sales: 24000, profit: 7800 },
        { date: 'Juil', sales: 21000, profit: 7000 },
        { date: 'Août', sales: 24567, profit: 8930 },
        { date: 'Sep', sales: 25000, profit: 9000 },
        { date: 'Oct', sales: 26000, profit: 9500 },
        { date: 'Nov', sales: 27000, profit: 10000 },
        { date: 'Déc', sales: 30000, profit: 11000 },
      ],
      topProducts: [
        { name: 'Pommes biologiques', unitsSold: 345, category: 'Fruits' },
        { name: 'Carottes Fraîches', unitsSold: 280, category: 'Légumes' },
        {
          name: 'Œufs de Ferme',
          unitsSold: 250,
          category: 'Produits Laitiers',
        },
        { name: 'Lait Cru', unitsSold: 220, category: 'Produits Laitiers' },
        { name: 'Pain de Campagne', unitsSold: 210, category: 'Boulangerie' },
        {
          name: 'Fromage de Chèvre',
          unitsSold: 190,
          category: 'Produits Laitiers',
        },
        { name: 'Miel Local', unitsSold: 180, category: 'Produits Saison' },
      ],
      recentSales: [
        {
          id: 'F-00123',
          date: new Date('2024-07-23'),
          client: 'Boucherie Dupont',
          total: 150.0,
          status: 'completed',
        },
        {
          id: 'F-00122',
          date: new Date('2024-07-22'),
          client: 'Bio Marché',
          total: 320.5,
          status: 'completed',
        },
        {
          id: 'F-00121',
          date: new Date('2024-07-21'),
          client: 'Restaurant Saveurs',
          total: 85.2,
          status: 'pending',
        },
        {
          id: 'F-00120',
          date: new Date('2024-07-20'),
          client: 'Client Particulier A',
          total: 45.0,
          status: 'completed',
        },
        {
          id: 'F-00119',
          date: new Date('2024-07-19'),
          client: 'Épicerie Verte',
          total: 210.75,
          status: 'completed',
        },
        {
          id: 'F-00118',
          date: new Date('2024-07-18'),
          client: 'Café Central',
          total: 120.3,
          status: 'completed',
        },
        {
          id: 'F-00117',
          date: new Date('2024-07-17'),
          client: 'Maison des Saveurs',
          total: 95.5,
          status: 'cancelled',
        },
        {
          id: 'F-00116',
          date: new Date('2024-07-16'),
          client: 'Hôtel Bellevue',
          total: 430.25,
          status: 'completed',
        },
        {
          id: 'F-00115',
          date: new Date('2024-07-15'),
          client: 'Restaurant du Marché',
          total: 185.0,
          status: 'completed',
        },
        {
          id: 'F-00114',
          date: new Date('2024-07-14'),
          client: 'Bio Cantine',
          total: 75.4,
          status: 'pending',
        },
        {
          id: 'F-00113',
          date: new Date('2024-07-13'),
          client: 'Boulangerie Arti',
          total: 210.75,
          status: 'completed',
        },
        {
          id: 'F-00112',
          date: new Date('2024-07-12'),
          client: 'Primeur du Quartier',
          total: 320.0,
          status: 'completed',
        },
        {
          id: 'F-00111',
          date: new Date('2024-07-11'),
          client: 'Cave à Fromages',
          total: 155.5,
          status: 'completed',
        },
        {
          id: 'F-00110',
          date: new Date('2024-07-10'),
          client: 'Maison Bio',
          total: 230.25,
          status: 'completed',
        },
        {
          id: 'F-00109',
          date: new Date('2024-07-09'),
          client: 'Restaurant Gastronomique',
          total: 410.0,
          status: 'completed',
        },
      ],
      salesByCategory: [
        { category: 'Légumes', value: 35 },
        { category: 'Fruits', value: 25 },
        { category: 'Produits Laitiers', value: 20 },
        { category: 'Viandes et Charcuteries', value: 10 },
        { category: 'Boulangerie Artisanale', value: 5 },
        { category: 'Produits Saison', value: 5 },
      ],
    };

    return of(data);
  }
}
