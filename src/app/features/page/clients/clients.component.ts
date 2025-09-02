import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPlusCircle,
  faSearch,
  faSort,
  faSortUp,
  faSortDown,
  faUsers,
  faUserTie,
  faStar,
  faEuroSign,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ClientKpiCardsComponent } from '../../../shared/components/client-kpi-cards/client-kpi-cards.component';
import { Client } from '../../../core/models/client.model';
import { ClientService } from '../../../core/services/client.service';
import { ActionSelectorComponent } from '../../../shared/components/action-selector/action-selector.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ClientKpiCardsComponent,
    TranslateModule,
    ActionSelectorComponent,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit {
  public Math = Math;
  // Icons
  faPlus = faPlusCircle;
  faSearch = faSearch;
  faSort = faSort;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  faUsers = faUsers;
  faUserTie = faUserTie;
  faStar = faStar;
  faEuroSign = faEuroSign;

  // Data
  clients: Client[] = [];
  filteredClients = signal<Client[]>([]);
  kpiCards: any[] = [];

  // Filters and sorting
  searchText = '';
  sortField: keyof Client = 'lastName';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination
  currentPage = 0;
  itemsPerPage = 5;

  clientSegmentsChartData = signal<any>(null);
  revenueTrendChartData = signal<any>(null);
  topClientsChartData = signal<any>(null);

  constructor(
    private readonly clientService: ClientService,
    public translate: TranslateService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.setupKpiCards();
    this.setupCharts();
  }

  private setupCharts(): void {
    this.setupClientSegmentsChart();
    this.setupRevenueTrendChart();
    this.setupTopClientsChart();
  }

  private setupClientSegmentsChart(): void {
    const clients = this.clientService.getClients();
    const segmentCounts = {
      regular: clients.filter((c) => c.segment === 'regular').length,
      premium: clients.filter((c) => c.segment === 'premium').length,
      vip: clients.filter((c) => c.segment === 'vip').length,
    };

    this.clientSegmentsChartData.set({
      labels: [
        this.translate.instant('CLIENTS.REGULAR'),
        this.translate.instant('CLIENTS.PREMIUM'),
        this.translate.instant('CLIENTS.VIP'),
      ],
      datasets: [
        {
          data: [
            segmentCounts.regular,
            segmentCounts.premium,
            segmentCounts.vip,
          ],
          backgroundColor: [
            'rgba(59, 130, 246, 0.7)',
            'rgba(139, 92, 246, 0.7)',
            'rgba(245, 158, 11, 0.7)',
          ],
          borderColor: [
            'rgb(59, 130, 246)',
            'rgb(139, 92, 246)',
            'rgb(245, 158, 11)',
          ],
          borderWidth: 1,
        },
      ],
    });
  }

  private setupRevenueTrendChart(): void {
    const months = [
      'Jan',
      'Fév',
      'Mar',
      'Avr',
      'Mai',
      'Jun',
      'Jul',
      'Aoû',
      'Sep',
      'Oct',
      'Nov',
      'Déc',
    ];
    const revenueData = [
      12000, 15000, 18000, 21000, 24500, 28000, 32000, 36000, 40000, 44000,
      48000, 52000,
    ];

    this.revenueTrendChartData.set({
      labels: months,
      datasets: [
        {
          label: this.translate.instant('CLIENTS.REVENUE_TREND'),
          data: revenueData,
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
      ],
    });
  }

  private setupTopClientsChart(): void {
    const clients = this.clientService
      .getClients()
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5);

    this.topClientsChartData.set({
      labels: clients.map((c) => `${c.firstName} ${c.lastName}`),
      datasets: [
        {
          label: this.translate.instant('CLIENTS.TOTAL_SPENT'),
          data: clients.map((c) => c.totalSpent),
          backgroundColor: 'rgba(99, 102, 241, 0.7)',
          borderColor: 'rgb(99, 102, 241)',
          borderWidth: 1,
        },
      ],
    });
  }

  loadClients(): void {
    this.clients = this.clientService.getClients();
    this.filteredClients.set([...this.clients]);
  }

  setupKpiCards(): void {
    const summary = this.clientService.getClientsSummary();

    this.kpiCards = [
      {
        title: 'CLIENTS.TOTAL_CLIENTS',
        value: summary.totalClients,
        icon: faUsers,
        iconColor: 'text-blue-600',
        iconBgColor: 'bg-blue-100',
        borderColor: 'border-l-4 border-blue-500',
        trend: '+12%',
        trendColor: 'trend-up',
        trendIcon: faSortUp,
      },
      {
        title: 'CLIENTS.ACTIVE_CLIENTS',
        value: summary.activeClients,
        icon: faUserTie,
        iconColor: 'text-green-600',
        iconBgColor: 'bg-green-100',
        borderColor: 'border-l-4 border-green-500',
        trend: '+8%',
        trendColor: 'trend-up',
        trendIcon: faSortUp,
      },
      {
        title: 'CLIENTS.VIP_CLIENTS',
        value: summary.vipClients,
        icon: faStar,
        iconColor: 'text-purple-600',
        iconBgColor: 'bg-purple-100',
        borderColor: 'border-l-4 border-purple-500',
        trend: '+5%',
        trendColor: 'trend-up',
        trendIcon: faSortUp,
      },
      {
        title: 'CLIENTS.TOTAL_REVENUE',
        value: `${summary.totalRevenue} €`,
        icon: faEuroSign,
        iconColor: 'text-indigo-600',
        iconBgColor: 'bg-indigo-100',
        borderColor: 'border-l-4 border-indigo-500',
        trend: '+15%',
        trendColor: 'trend-up',
        trendIcon: faSortUp,
      },
    ];
  }

  onSearchChange(): void {
    if (!this.searchText) {
      this.filteredClients.set([...this.clients]);
      return;
    }

    const searchLower = this.searchText.toLowerCase();
    const filtered = this.clients.filter(
      (client) =>
        client.firstName.toLowerCase().includes(searchLower) ||
        client.lastName.toLowerCase().includes(searchLower) ||
        client.email.toLowerCase().includes(searchLower) ||
        client.city.toLowerCase().includes(searchLower) ||
        client.company?.toLowerCase().includes(searchLower)
    );

    this.filteredClients.set(filtered);
    this.currentPage = 0;
  }

  sort(field: keyof Client): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.filteredClients.set([
      ...this.filteredClients().sort((a, b) => {
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

  get paginatedClients(): Client[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    return this.filteredClients().slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredClients().length / this.itemsPerPage);
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

  onEdit(entity: Client): void {
    this.router.navigate(['/clients', entity.id, 'edit']);
  }

  onDelete(entity: Client): void {
    if (confirm(this.translate.instant('CLIENTS.CONFIRM_DELETE'))) {
      this.clientService.deleteClient(entity.id);
      this.loadClients();
    }
  }

  onViewHistory(entity: Client): void {
    this.router.navigate(['/clients', entity.id, 'history']);
  }
}
