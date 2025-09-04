// services/inventory.service.ts
import { Injectable } from '@angular/core';
import {
  InventoryItem,
  InventoryMovement,
  InventoryOverview,
  InventoryStatusDistribution,
} from '../models/inventory.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private inventoryItems: InventoryItem[] = [
    {
      id: 1,
      productName: 'Tomates Fraîches',
      sku: 'TOM-001',
      category: 'Légumes',
      currentStock: 250,
      unit: 'kg',
      status: 'En Stock',
      minimumStock: 50,
    },
    {
      id: 2,
      productName: 'Lait Bio (1L)',
      sku: 'LAI-002',
      category: 'Produits Laitiers',
      currentStock: 15,
      unit: 'bouteilles',
      status: 'Faible',
      minimumStock: 20,
    },
    {
      id: 3,
      productName: 'Œufs de Ferme (x12)',
      sku: 'OEU-003',
      category: 'Produits Fermiers',
      currentStock: 0,
      unit: 'douzaines',
      status: 'Rupture',
      minimumStock: 10,
    },
    {
      id: 4,
      productName: 'Pommes de Terre',
      sku: 'POM-004',
      category: 'Légumes',
      currentStock: 400,
      unit: 'kg',
      status: 'En Stock',
      minimumStock: 100,
    },
    {
      id: 5,
      productName: 'Poulet Fermier',
      sku: 'POU-005',
      category: 'Viandes',
      currentStock: 8,
      unit: 'unités',
      status: 'Faible',
      minimumStock: 15,
    },
    {
      id: 6,
      productName: 'Fromage de Chèvre',
      sku: 'FRO-006',
      category: 'Produits Laitiers',
      currentStock: 30,
      unit: 'pièces',
      status: 'En Stock',
      minimumStock: 25,
    },
    {
      id: 7,
      productName: 'Miel Local (500g)',
      sku: 'MIE-007',
      category: 'Produits Apicoles',
      currentStock: 12,
      unit: 'pots',
      status: 'Faible',
      minimumStock: 15,
    },
    {
      id: 8,
      productName: 'Pain Artisanal',
      sku: 'PAI-008',
      category: 'Boulangerie',
      currentStock: 0,
      unit: 'unités',
      status: 'Rupture',
      minimumStock: 20,
    },
    {
      id: 9,
      productName: 'Carottes Bio',
      sku: 'CAR-009',
      category: 'Légumes',
      currentStock: 180,
      unit: 'kg',
      status: 'En Stock',
      minimumStock: 50,
    },
    {
      id: 10,
      productName: 'Agneaux de Lait',
      sku: 'AGN-010',
      category: 'Viandes',
      currentStock: 3,
      unit: 'unités',
      status: 'Faible',
      minimumStock: 5,
    },
    {
      id: 11,
      productName: 'Yaourt Nature',
      sku: 'YAO-011',
      category: 'Produits Laitiers',
      currentStock: 45,
      unit: 'pots',
      status: 'En Stock',
      minimumStock: 30,
    },
    {
      id: 12,
      productName: 'Confiture Fraise',
      sku: 'CON-012',
      category: 'Produits Apicoles',
      currentStock: 18,
      unit: 'pots',
      status: 'En Stock',
      minimumStock: 15,
    },
    {
      id: 13,
      productName: 'Steak Bovin',
      sku: 'STE-013',
      category: 'Viandes',
      currentStock: 22,
      unit: 'unités',
      status: 'En Stock',
      minimumStock: 20,
    },
    {
      id: 14,
      productName: 'Salade Verte',
      sku: 'SAL-014',
      category: 'Légumes',
      currentStock: 35,
      unit: 'kg',
      status: 'Faible',
      minimumStock: 40,
    },
    {
      id: 15,
      productName: 'Baguette Tradition',
      sku: 'BAG-015',
      category: 'Boulangerie',
      currentStock: 0,
      unit: 'unités',
      status: 'Rupture',
      minimumStock: 25,
    },
  ];

  private readonly movements: InventoryMovement[] = [
    {
      id: 1,
      productName: 'Tomates Fraîches',
      date: new Date('2024-07-29'),
      quantity: 150,
      type: 'entrée',
    },
    {
      id: 2,
      productName: 'Lait Bio',
      date: new Date('2024-07-29'),
      quantity: -50,
      type: 'sortie',
    },
    {
      id: 3,
      productName: 'Pommes de Terre',
      date: new Date('2024-07-28'),
      quantity: 200,
      type: 'entrée',
    },
    {
      id: 4,
      productName: 'Œufs de Ferme',
      date: new Date('2024-07-28'),
      quantity: -30,
      type: 'sortie',
    },
  ];

  getInventoryItems(): InventoryItem[] {
    return this.inventoryItems;
  }

  getInventoryOverview(): InventoryOverview {
    const totalItems = this.inventoryItems.length;
    const inStock = this.inventoryItems.filter(
      (item) => item.status === 'En Stock'
    ).length;
    const lowStock = this.inventoryItems.filter(
      (item) => item.status === 'Faible'
    ).length;
    const outOfStock = this.inventoryItems.filter(
      (item) => item.status === 'Rupture'
    ).length;

    return { totalItems, inStock, lowStock, outOfStock };
  }

  getRecentMovements(): InventoryMovement[] {
    return this.movements.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  searchInventory(searchTerm: string): InventoryItem[] {
    if (!searchTerm) return this.inventoryItems;

    return this.inventoryItems.filter(
      (item) =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  updateStock(itemId: number, quantity: number): void {
    const item = this.inventoryItems.find((i) => i.id === itemId);
    if (item) {
      item.currentStock += quantity;
      // Mettre à jour le statut
      this.updateItemStatus(item);

      // Ajouter un mouvement
      this.movements.push({
        id: this.movements.length + 1,
        productName: item.productName,
        date: new Date(),
        quantity: quantity,
        type: quantity > 0 ? 'entrée' : 'sortie',
      });
    }
  }

  private updateItemStatus(item: InventoryItem): void {
    if (item.currentStock === 0) {
      item.status = 'Rupture';
    } else if (item.currentStock <= (item.minimumStock || 0)) {
      item.status = 'Faible';
    } else {
      item.status = 'En Stock';
    }
  }
  getStatusDistribution(): InventoryStatusDistribution {
    const inStock = this.inventoryItems.filter(
      (item) => item.status === 'En Stock'
    ).length;
    const lowStock = this.inventoryItems.filter(
      (item) => item.status === 'Faible'
    ).length;
    const outOfStock = this.inventoryItems.filter(
      (item) => item.status === 'Rupture'
    ).length;

    return {
      labels: ['En Stock', 'Faible Stock', 'Rupture de Stock'],
      data: [inStock, lowStock, outOfStock],
      colors: ['#10B981', '#F59E0B', '#EF4444'],
    };
  }
}
