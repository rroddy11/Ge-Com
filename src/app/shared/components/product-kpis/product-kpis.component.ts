import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from '../../../core/models/product';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-kpis',
  imports: [CommonModule, TranslateModule],
  templateUrl: './product-kpis.component.html',
  styleUrl: './product-kpis.component.scss',
})
export class ProductKpisComponent implements OnInit {
  products: Product[] = [];
  totalProducts = 0;
  stockValue = 0;
  lowStockProducts = 0;
  averageMargin = 0;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.calculateKpis();
  }

  private calculateKpis(): void {
    this.totalProducts = this.products.length;

    this.lowStockProducts = this.products.filter((p) => p.stock < 10).length;

    let totalMargin = 0;
    let totalStockValue = 0;

    this.products.forEach((p) => {
      const purchase = this.parsePrice(p.purchasePrice);
      const sale = this.parsePrice(p.salePrice);
      const margin = ((sale - purchase) / purchase) * 100;
      totalMargin += margin;
      totalStockValue += sale * p.stock;
    });

    this.averageMargin = Math.round(totalMargin / this.products.length) || 0;
    this.stockValue = Math.round(totalStockValue * 100) / 100;
  }

  private parsePrice(price: string): number {
    return parseFloat(price.replace(' €', '').replace(',', '.').trim());
  }
}
