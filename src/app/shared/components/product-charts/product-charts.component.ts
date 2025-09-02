import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Chart, registerables } from 'chart.js';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../../../core/models/product';
import { ProductService } from '../../../core/services/product.service';

Chart.register(...registerables);

@Component({
  selector: 'app-product-charts',
  imports: [CommonModule, TranslateModule],
  templateUrl: './product-charts.component.html',
  styleUrl: './product-charts.component.scss',
})
export class ProductChartsComponent implements AfterViewInit {
  @ViewChild('categoryChart') categoryChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('stockChart') stockChartRef!: ElementRef<HTMLCanvasElement>;

  products: Product[] = [];

  constructor(private readonly productService: ProductService) {
    this.products = this.productService.getProducts();
  }

  ngAfterViewInit(): void {
    this.createCategoryChart();
    this.createStockChart();
  }

  private createCategoryChart(): void {
    const categories = this.products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(categories);
    const data = Object.values(categories);

    new Chart(this.categoryChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: ['#FAB615', '#8EA223', '#7C614F', '#d1d5db'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
        },
      },
    });
  }

  private createStockChart(): void {
    const labels = this.products.map((p) => p.name);
    const data = this.products.map((p) => p.stock);
    const backgroundColors = this.products.map((p) =>
      p.stock < 10 ? '#FAB615' : '#8EA223'
    );

    new Chart(this.stockChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Niveau de stock',
            data,
            backgroundColor: backgroundColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }
}
