// product.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Pommes Gala Bio',
      category: 'Fruits & Légumes',
      purchasePrice: '1.20 €',
      salePrice: '2.50 €',
      stock: 150,
      imageUrl: '/assets/images/img/product/lfl.png',
    },
    {
      id: 2,
      name: 'Lait Frais de Ferme',
      category: 'Produits Laitiers',
      purchasePrice: '0.90 €',
      salePrice: '1.80 €',
      stock: 5,
      imageUrl: '/assets/images/img/product/lfl.png',
    },
    {
      id: 3,
      name: 'Poulet Fermier Entier',
      category: 'Viandes',
      purchasePrice: '8.50 €',
      salePrice: '15.00 €',
      stock: 30,
      imageUrl: '/assets/images/img/product/lfl.png',
    },
    {
      id: 4,
      name: 'Pain de Campagne',
      category: 'Boulangerie',
      purchasePrice: '2.10 €',
      salePrice: '3.80 €',
      stock: 80,
      imageUrl: '/assets/images/img/product/lfl.png',
    },
    {
      id: 5,
      name: 'Œufs Bio (Douzaine)',
      category: 'Produits Laitiers',
      purchasePrice: '2.80 €',
      salePrice: '4.50 €',
      stock: 200,
      imageUrl: '/assets/images/img/product/lfl.png',
    },
    {
      id: 6,
      name: 'Carottes Fraîches',
      category: 'Fruits & Légumes',
      purchasePrice: '0.75 €',
      salePrice: '1.99 €',
      stock: 7,
      imageUrl: '/assets/images/img/product/lfl.png',
    },
    {
      id: 7,
      name: '/assets/images/img/product/lfl.png',
      category: 'Viandes',
      purchasePrice: '6.00 €',
      salePrice: '11.50 €',
      stock: 45,
      imageUrl: '/assets/images/img/product/lfl.png',
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter((product) => product.id !== id);
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }
}
