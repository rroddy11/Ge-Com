import { CommonModule } from '@angular/common';
import { Component, signal, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ActionSelectorComponent } from '../../../shared/components/action-selector/action-selector.component';
import { ProductKpisComponent } from '../../../shared/components/product-kpis/product-kpis.component';
import { ProductChartsComponent } from '../../../shared/components/product-charts/product-charts.component';
import { Product } from '../../../core/models/product';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    TranslateModule,
    ActionSelectorComponent,
    ProductKpisComponent,
    ProductChartsComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  faPlus = faPlusCircle;

  // Data
  products: Product[] = [];
  filteredProducts = signal<Product[]>([]);
  paginatedProducts = signal<Product[]>([]);

  // Configuration
  searchText = '';
  selectedCategory = '';
  categories: string[] = [];
  sortField: keyof Product = 'name';
  reverse = false;
  currentPage = 0;
  itemsPerPage = 5;

  constructor(
    private readonly productService: ProductService,
    public translate: TranslateService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.categories = Array.from(
      new Set(this.products.map((product) => product.category))
    );
    this.updateFilteredProducts();
  }

  updateFilteredProducts() {
    let filtered = this.products;

    if (this.searchText) {
      const searchLower = this.searchText.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
      );
    }

    if (this.selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === this.selectedCategory
      );
    }

    filtered = this.sortProducts(filtered);
    this.filteredProducts.set(filtered);
    this.updatePaginatedProducts();
  }

  sortProducts(products: Product[]): Product[] {
    return [...products].sort((a, b) => {
      const valueA = a[this.sortField];
      const valueB = b[this.sortField];

      if (this.sortField === 'name' || this.sortField === 'category') {
        return this.reverse
          ? (valueB as string).localeCompare(valueA as string)
          : (valueA as string).localeCompare(valueB as string);
      } else if (this.sortField === 'stock') {
        return this.reverse
          ? (valueB as number) - (valueA as number)
          : (valueA as number) - (valueB as number);
      } else {
        const numA = parseFloat(
          (valueA as string).replace('€', '').replace(',', '.').trim()
        );
        const numB = parseFloat(
          (valueB as string).replace('€', '').replace(',', '.').trim()
        );
        return this.reverse ? numB - numA : numA - numB;
      }
    });
  }

  sortBy(field: keyof Product) {
    if (this.sortField === field) {
      this.reverse = !this.reverse;
    } else {
      this.sortField = field;
      this.reverse = false;
    }
    this.updateFilteredProducts();
  }

  updatePaginatedProducts() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts.set(
      this.filteredProducts().slice(startIndex, endIndex)
    );
  }

  nextPage() {
    if (this.currentPage < this.numberOfPages() - 1) {
      this.currentPage++;
      this.updatePaginatedProducts();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedProducts();
    }
  }

  setPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  numberOfPages(): number {
    return Math.ceil(this.filteredProducts().length / this.itemsPerPage);
  }

  getPagesArray(): number[] {
    return Array(this.numberOfPages())
      .fill(0)
      .map((_, i) => i);
  }

  getEndIndex(): number {
    return Math.min(
      (this.currentPage + 1) * this.itemsPerPage,
      this.filteredProducts().length
    );
  }

  getPageButtonClass(pageIndex: number): string {
    const baseClasses =
      'relative inline-flex items-center px-4 py-2 border text-sm font-medium';
    return this.currentPage === pageIndex
      ? `${baseClasses} bg-indigo-50 border-indigo-500 text-indigo-600`
      : `${baseClasses} bg-white border-gray-300 text-gray-500 hover:bg-gray-50`;
  }

  onEdit(entity: Product): void {
    this.router.navigate(['/products', entity.id, 'edit']);
  }

  onDelete(entity: Product): void {
    if (confirm(this.translate.instant('PRODUCTS.CONFIRM_DELETE'))) {
      this.productService.deleteProduct(entity.id);
      this.updateFilteredProducts();
    }
  }

  onViewHistory(entity: Product): void {
    this.router.navigate(['/products', entity.id, 'history']);
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/images/products/default.png';
  }
}
