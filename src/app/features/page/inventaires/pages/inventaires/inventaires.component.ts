// inventory.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSearch,
  faFilePdf,
  faFileExcel,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import {
  InventoryItem,
  InventoryMovement,
  InventoryOverview,
} from '../../../../../core/models/inventory.model';
import { InventoryService } from '../../../../../core/services/inventory.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, TranslateModule],
  templateUrl: './inventaires.component.html',
  styleUrls: ['./inventaires.component.scss'],
})
export class InventairesComponent implements OnInit {
  // Icônes
  faSearch = faSearch;
  faFilePdf = faFilePdf;
  faFileExcel = faFileExcel;
  faEye = faEye;

  // Données
  inventoryItems: InventoryItem[] = [];
  filteredItems: InventoryItem[] = [];
  overview: InventoryOverview = {
    totalItems: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
  };
  recentMovements: InventoryMovement[] = [];

  // Filtres
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  @ViewChild('statusChart') statusChartRef!: ElementRef<HTMLCanvasElement>;
  private statusChart!: Chart;

  constructor(private readonly inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.loadChartData();
  }

  loadData(): void {
    this.inventoryItems = this.inventoryService.getInventoryItems();
    this.filteredItems = [...this.inventoryItems];
    this.overview = this.inventoryService.getInventoryOverview();
    this.recentMovements = this.inventoryService.getRecentMovements();
  }

  onSearch(): void {
    this.filteredItems = this.inventoryService.searchInventory(this.searchTerm);
    this.currentPage = 1;
  }

  get paginatedItems(): InventoryItem[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredItems.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  generatePeriodicInventory(): void {
    console.log("Génération de l'inventaire périodique");
    // Implémentation de la génération d'inventaire
  }

  exportToPDF(): void {
    console.log('Export en PDF');
    // Implémentation de l'export PDF
  }

  exportToExcel(): void {
    console.log('Export en Excel');
    // Implémentation de l'export Excel
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'En Stock':
        return 'bg-secondary text-white';
      case 'Faible':
        return 'bg-primary text-yellow-800';
      case 'Rupture':
        return 'bg-tertiary text-red-800';
      default:
        return 'bg-white text-gray-800';
    }
  }

  private loadChartData(): void {
    const distribution = this.inventoryService.getStatusDistribution();
    const colors = ['#FAB615', '#8EA223', '#7C614F']; // primary, secondary, tertiary

    if (this.statusChartRef && this.statusChartRef.nativeElement) {
      // Détruire le chart existant s'il y en a un
      if (this.statusChart) {
        this.statusChart.destroy();
      }

      this.statusChart = new Chart(this.statusChartRef.nativeElement, {
        type: 'pie',
        data: {
          labels: distribution.labels,
          datasets: [
            {
              data: distribution.data,
              backgroundColor: colors.slice(0, distribution.data.length), // Utiliser seulement le nombre de couleurs nécessaires
              hoverBackgroundColor: colors
                .slice(0, distribution.data.length)
                .map((color) => this.lightenColor(color, 20)),
              borderWidth: 2,
              borderColor: '#FFFFFF',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.parsed;
                  const total = context.dataset.data.reduce(
                    (a: number, b: number) => a + b,
                    0
                  );
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${label}: ${value} (${percentage}%)`;
                },
              },
            },
          },
        },
      });
    }
  }

  private lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, Math.max(0, (num >> 16) + amt));
    const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
    const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));

    return '#' + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
  }

  getChartData(): { labels: string[]; data: number[]; colors: string[] } {
    const distribution = this.inventoryService.getStatusDistribution();
    const colors = ['#FAB615', '#8EA223', '#7C614F']; // primary, secondary, tertiary
    return {
      labels: distribution?.labels || [],
      data: distribution?.data || [],
      colors: colors.slice(0, distribution?.data.length || 0), // Limiter le nombre de couleurs
    };
  }

  getPercentage(value: number): string {
    if (this.overview.totalItems === 0) return '0%';
    return ((value / this.overview.totalItems) * 100).toFixed(1) + '%';
  }
}
