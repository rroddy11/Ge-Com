// search.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly searchResults = new BehaviorSubject<Product[]>([]);
  private readonly searchQuery = new BehaviorSubject<string>('');

  constructor(private readonly productService: ProductService) {}

  // Recherche globale sur tous les champs
  searchGlobal(query: string): void {
    this.searchQuery.next(query);

    // Si la recherche est vide, on retourne un tableau vide
    if (!query.trim()) {
      this.searchResults.next([]);
      return;
    }

    const products = this.productService.getProducts();
    const results = products.filter((product) =>
      this.matchAnyField(product, query.toLowerCase())
    );

    this.searchResults.next(results);
  }

  // Vérifie si le terme de recherche correspond à n'importe quel champ
  private matchAnyField(product: Product, query: string): boolean {
    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.purchasePrice.toString().toLowerCase().includes(query) ||
      product.salePrice.toString().toLowerCase().includes(query) ||
      product.stock.toString().includes(query)
    );
  }

  getSearchResults() {
    return this.searchResults.asObservable();
  }

  getSearchQuery() {
    return this.searchQuery.asObservable();
  }

  clearSearch() {
    this.searchQuery.next('');
    this.searchResults.next([]);
  }
}
