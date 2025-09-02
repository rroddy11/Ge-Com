// suppliers.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faSearch,
  faEdit,
  faTrash,
  faEye,
  faSort,
  faSortUp,
  faSortDown,
  faTruck,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ClientKpiCardsComponent } from '../../../shared/components/client-kpi-cards/client-kpi-cards.component';
import { Supplier } from '../../../core/models/supplier.model';
import { SupplierService } from '../../../core/services/supplier.service';
import { ClientSupplierChartComponent } from '../../../shared/components/client-supplier-chart/client-supplier-chart.component';
import { ActionSelectorComponent } from '../../../shared/components/action-selector/action-selector.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ClientKpiCardsComponent,
    TranslateModule,
    ActionSelectorComponent,
  ],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.scss',
})
export class SuppliersComponent implements OnInit {
  public Math = Math;
  // Icônes
  faPlus = faPlusCircle;
  faSearch = faSearch;
  faEdit = faEdit;
  faTrash = faTrash;
  faEye = faEye;
  faSort = faSort;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  faTruck = faTruck;

  // Données
  suppliers: Supplier[] = [];
  filteredSuppliers = signal<Supplier[]>([]);
  kpiCards: any[] = [];

  // Filtres et tri
  searchText = '';
  sortField: keyof Supplier = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination
  currentPage = 0;
  itemsPerPage = 5;

  supplierStatusChartData = signal<any>(null);
  ratingDistributionChartData = signal<any>(null);
  productsBySupplierChartData = signal<any>(null);

  constructor(
    private readonly supplierService: SupplierService,
    public translate: TranslateService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
    this.setupKpiCards();
    this.setupCharts();
  }

  private setupCharts(): void {
    this.setupSupplierStatusChart();
    this.setupRatingDistributionChart();
    this.setupProductsBySupplierChart();
  }

  private setupSupplierStatusChart(): void {
    const suppliers = this.supplierService.getSuppliers();
    const statusCounts = {
      active: suppliers.filter((s) => s.status === 'active').length,
      inactive: suppliers.filter((s) => s.status === 'inactive').length,
    };

    this.supplierStatusChartData.set({
      labels: [
        this.translate.instant('SUPPLIERS.ACTIVE'),
        this.translate.instant('SUPPLIERS.INACTIVE'),
      ],
      datasets: [
        {
          data: [statusCounts.active, statusCounts.inactive],
          backgroundColor: [
            'rgba(16, 185, 129, 0.7)',
            'rgba(239, 68, 68, 0.7)',
          ],
          borderColor: ['rgb(16, 185, 129)', 'rgb(239, 68, 68)'],
          borderWidth: 1,
        },
      ],
    });
  }

  private setupRatingDistributionChart(): void {
    const suppliers = this.supplierService.getSuppliers();
    const ratingRanges = {
      '5★': suppliers.filter((s) => s.rating >= 4.8).length,
      '4★': suppliers.filter((s) => s.rating >= 4.0 && s.rating < 4.8).length,
      '3★': suppliers.filter((s) => s.rating >= 3.0 && s.rating < 4.0).length,
      '<3★': suppliers.filter((s) => s.rating < 3.0).length,
    };

    this.ratingDistributionChartData.set({
      labels: ['5 ★', '4 ★', '3 ★', '<3 ★'],
      datasets: [
        {
          label: this.translate.instant('SUPPLIERS.SUPPLIERS'),
          data: [
            ratingRanges['5★'],
            ratingRanges['4★'],
            ratingRanges['3★'],
            ratingRanges['<3★'],
          ],
          backgroundColor: [
            'rgba(245, 158, 11, 0.7)',
            'rgba(139, 92, 246, 0.7)',
            'rgba(59, 130, 246, 0.7)',
            'rgba(107, 114, 128, 0.7)',
          ],
          borderColor: [
            'rgb(245, 158, 11)',
            'rgb(139, 92, 246)',
            'rgb(59, 130, 246)',
            'rgb(107, 114, 128)',
          ],
          borderWidth: 1,
        },
      ],
    });
  }

  private setupProductsBySupplierChart(): void {
    const suppliers = this.supplierService
      .getSuppliers()
      .sort((a, b) => b.productsSupplied - a.productsSupplied)
      .slice(0, 6);

    this.productsBySupplierChartData.set({
      labels: suppliers.map((s) => s.name),
      datasets: [
        {
          label: this.translate.instant('SUPPLIERS.PRODUCTS_SUPPLIED'),
          data: suppliers.map((s) => s.productsSupplied),
          backgroundColor: 'rgba(79, 70, 229, 0.7)',
          borderColor: 'rgb(79, 70, 229)',
          borderWidth: 1,
        },
      ],
    });
  }

  loadSuppliers(): void {
    this.suppliers = this.supplierService.getSuppliers();
    this.filteredSuppliers.set([...this.suppliers]);
  }

  setupKpiCards(): void {
    const summary = this.supplierService.getSuppliersSummary();

    this.kpiCards = [
      {
        title: 'SUPPLIERS.TOTAL_SUPPLIERS',
        value: summary.totalSuppliers,
        icon: faTruck,
        iconColor: 'text-blue-600',
        iconBgColor: 'bg-blue-100',
        borderColor: 'border-l-4 border-blue-500',
        trend: '+5%',
        trendColor: 'trend-up',
        trendIcon: faSortUp,
      },
      {
        title: 'SUPPLIERS.ACTIVE_SUPPLIERS',
        value: summary.activeSuppliers,
        icon: faTruck,
        iconColor: 'text-green-600',
        iconBgColor: 'bg-green-100',
        borderColor: 'border-l-4 border-green-500',
        trend: '+3%',
        trendColor: 'trend-up',
        trendIcon: faSortUp,
      },
      {
        title: 'SUPPLIERS.HIGH_RATED',
        value: summary.highRatedSuppliers,
        icon: faSortUp,
        iconColor: 'text-purple-600',
        iconBgColor: 'bg-purple-100',
        borderColor: 'border-l-4 border-purple-500',
        trend: '+7%',
        trendColor: 'trend-up',
        trendIcon: faSortUp,
      },
      {
        title: 'SUPPLIERS.TOTAL_PRODUCTS',
        value: summary.totalProducts,
        icon: faPlus,
        iconColor: 'text-indigo-600',
        iconBgColor: 'bg-indigo-100',
        borderColor: 'border-l-4 border-indigo-500',
        trend: '+12%',
        trendColor: 'trend-up',
        trendIcon: faSortUp,
      },
    ];
  }

  onSearchChange(): void {
    if (!this.searchText) {
      this.filteredSuppliers.set([...this.suppliers]);
      return;
    }

    const searchLower = this.searchText.toLowerCase();
    const filtered = this.suppliers.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(searchLower) ||
        supplier.contactPerson.toLowerCase().includes(searchLower) ||
        supplier.email.toLowerCase().includes(searchLower) ||
        supplier.city.toLowerCase().includes(searchLower)
    );

    this.filteredSuppliers.set(filtered);
    this.currentPage = 0;
  }

  sort(field: keyof Supplier): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.filteredSuppliers.set([
      ...this.filteredSuppliers().sort((a, b) => {
        const valueA = a[field];
        const valueB = b[field];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return this.sortDirection === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          return this.sortDirection === 'asc'
            ? valueA - valueB
            : valueB - valueA;
        }
        return 0;
      }),
    ]);
  }

  get paginatedSuppliers(): Supplier[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    return this.filteredSuppliers().slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredSuppliers().length / this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  onView(supplier: Supplier): void {
    console.log('Voir fournisseur:', supplier);
    // Navigation vers la page de détail
  }

  getRatingStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      '★'.repeat(fullStars) + '½'.repeat(halfStar) + '☆'.repeat(emptyStars)
    );
  }
  performanceMetrics = [
    { label: 'Taux de livraison à temps', value: '98%', trend: 'up' },
    { label: 'Satisfaction moyenne', value: '4.7/5', trend: 'up' },
    { label: 'Retours produits', value: '2.1%', trend: 'down' },
    { label: 'Délai moyen de livraison', value: '2.3 jours', trend: 'down' },
  ];

  // Gérer l'édition
  onEdit(supplier: Supplier): void {
    console.log('Modifier:', supplier);
    this.router.navigate(['/supplier', supplier.id, 'edit']);
  }

  // Gérer la suppression
  onDelete(supplier: Supplier): void {
    console.log('Supprimer:', supplier);
    if (confirm(this.translate.instant('PRODUCTS.CONFIRM_DELETE'))) {
      console.log('Supprimer');
    }
  }

  // Gérer l'historique
  onViewHistory(supplier: Supplier): void {
    console.log('Voir historique:', supplier);
    this.router.navigate(['/supplier', supplier.id, 'history']);
  }
}
