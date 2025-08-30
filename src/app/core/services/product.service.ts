// src/app/core/services/product.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      name: 'Pommes Gala Bio',
      category: 'Fruits & Légumes',
      purchasePrice: '1.20 €',
      salePrice: '2.50 €',
      stock: 150,
    },
    {
      name: 'Lait Frais de Ferme',
      category: 'Produits Laitiers',
      purchasePrice: '0.90 €',
      salePrice: '1.80 €',
      stock: 5,
    },
    {
      name: 'Poulet Fermier Entier',
      category: 'Viandes',
      purchasePrice: '8.50 €',
      salePrice: '15.00 €',
      stock: 30,
    },
    {
      name: 'Pain de Campagne',
      category: 'Boulangerie',
      purchasePrice: '2.10 €',
      salePrice: '3.80 €',
      stock: 80,
    },
    {
      name: 'Œufs Bio (Douzaine)',
      category: 'Produits Laitiers',
      purchasePrice: '2.80 €',
      salePrice: '4.50 €',
      stock: 200,
    },
    {
      name: 'Carottes Fraîches',
      category: 'Fruits & Légumes',
      purchasePrice: '0.75 €',
      salePrice: '1.99 €',
      stock: 7,
    },
    {
      name: 'Saucisses Artisanales',
      category: 'Viandes',
      purchasePrice: '6.00 €',
      salePrice: '11.50 €',
      stock: 45,
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
