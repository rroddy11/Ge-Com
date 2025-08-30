// src/app/core/models/product.ts
export interface Product {
  name: string;
  category: string;
  purchasePrice: string; // ou number selon votre besoin
  salePrice: string; // ou number selon votre besoin
  stock: number;
}
