import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RapportService } from '../../../../../core/services/rapport.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChartBar,
  faEuroSign,
  faShoppingCart,
  faUsers,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import { RapportData } from '../../../../../core/models/rapport.model';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-rapports',
  imports: [CommonModule, TranslateModule, FontAwesomeModule],
  templateUrl: './rapports.component.html',
  styleUrl: './rapports.component.scss',
})
export class RapportsComponent implements OnInit, AfterViewInit {
  // Icônes FontAwesome
  faChartBar = faChartBar;
  faEuroSign = faEuroSign;
  faShoppingCart = faShoppingCart;
  faUsers = faUsers;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;

  rapportData!: RapportData;
  isLoading = true;

  // Références aux canvas pour les graphiques
  @ViewChild('salesChart') salesChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('productsChart') productsChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart') pieChartRef!: ElementRef<HTMLCanvasElement>;

  // Instances des graphiques
  private salesChart!: Chart;
  private productsChart!: Chart;
  private pieChart!: Chart;

  // Couleurs personnalisées
  colors = {
    primary: '#FAB615',
    secondary: '#8EA223',
    tertiary: '#7C614F',
  };

  // Variables pour stocker les données des graphiques
  private salesChartData: any;
  private productsChartData: any;
  private pieChartData: any;

  constructor(private readonly rapportService: RapportService) {}

  ngOnInit(): void {
    this.loadRapportData();
  }

  ngAfterViewInit(): void {
    // Si les données sont déjà chargées, initialiser les graphiques
    if (this.rapportData) {
      this.initCharts();
    }
  }

  loadRapportData(): void {
    this.rapportService.getRapportData().subscribe((data) => {
      this.rapportData = data;
      this.isLoading = false;

      // Préparer les données pour les graphiques
      this.prepareChartData();

      // Initialiser les graphiques si les ViewChild sont disponibles
      if (this.salesChartRef && this.productsChartRef && this.pieChartRef) {
        this.initCharts();
      }
    });
  }

  prepareChartData(): void {
    // Préparer les données pour le graphique des ventes
    const salesLabels = this.rapportData.salesEvolution.map(
      (item) => item.date
    );
    const salesData = this.rapportData.salesEvolution.map((item) => item.sales);
    const profitData = this.rapportData.salesEvolution.map(
      (item) => item.profit
    );

    this.salesChartData = {
      labels: salesLabels,
      datasets: [
        {
          label: 'Ventes',
          data: salesData,
          backgroundColor: this.colors.primary,
          borderColor: this.colors.primary,
          hoverBackgroundColor: this.lightenColor(this.colors.primary, 20),
        },
        {
          label: 'Bénéfices',
          data: profitData,
          backgroundColor: this.colors.secondary,
          borderColor: this.colors.secondary,
          hoverBackgroundColor: this.lightenColor(this.colors.secondary, 20),
        },
      ],
    };

    // Préparer les données pour le graphique des produits
    const productLabels = this.rapportData.topProducts.map((item) => item.name);
    const productData = this.rapportData.topProducts.map(
      (item) => item.unitsSold
    );

    this.productsChartData = {
      labels: productLabels,
      datasets: [
        {
          label: 'Unités vendues',
          data: productData,
          backgroundColor: this.colors.secondary,
          borderColor: this.colors.secondary,
          hoverBackgroundColor: this.lightenColor(this.colors.secondary, 20),
        },
      ],
    };

    // Préparer les données pour le graphique circulaire
    const pieLabels = this.rapportData.salesByCategory.map(
      (item) => item.category
    );
    const pieData = this.rapportData.salesByCategory.map((item) => item.value);

    this.pieChartData = {
      labels: pieLabels,
      datasets: [
        {
          data: pieData,
          backgroundColor: [
            this.colors.primary,
            this.colors.secondary,
            this.colors.tertiary,
            '#A67C52',
            '#BF9B77',
            '#D9B88F',
          ],
          hoverBackgroundColor: [
            this.lightenColor(this.colors.primary, 20),
            this.lightenColor(this.colors.secondary, 20),
            this.lightenColor(this.colors.tertiary, 20),
            this.lightenColor('#A67C52', 20),
            this.lightenColor('#BF9B77', 20),
            this.lightenColor('#D9B88F', 20),
          ],
          borderWidth: 2,
          borderColor: '#FFFFFF',
        },
      ],
    };
  }

  initCharts(): void {
    this.initSalesChart();
    this.initProductsChart();
    this.initPieChart();
  }

  initSalesChart(): void {
    if (!this.salesChartRef?.nativeElement || !this.salesChartData) return;

    if (this.salesChart) {
      this.salesChart.destroy();
    }

    this.salesChart = new Chart(this.salesChartRef.nativeElement, {
      type: 'bar',
      data: this.salesChartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {},
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + ' €';
              },
            },
          },
        },
        plugins: {
          legend: { display: true },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.dataset.label + ': ' + context.parsed.y + ' €';
              },
            },
          },
        },
      },
    });
  }

  initProductsChart(): void {
    if (!this.productsChartRef?.nativeElement || !this.productsChartData)
      return;

    if (this.productsChart) {
      this.productsChart.destroy();
    }

    this.productsChart = new Chart(this.productsChartRef.nativeElement, {
      type: 'bar',
      data: this.productsChartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y', // Graphique horizontal
        scales: {
          x: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: { display: false },
        },
      },
    });
  }

  initPieChart(): void {
    if (!this.pieChartRef?.nativeElement || !this.pieChartData) return;

    if (this.pieChart) {
      this.pieChart.destroy();
    }

    this.pieChart = new Chart(this.pieChartRef.nativeElement, {
      type: 'pie',
      data: this.pieChartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right',
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
                return `${label}: ${value}% (${percentage}%)`;
              },
            },
          },
        },
      },
    });
  }

  private lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, Math.max(0, (num >> 16) + amt));
    const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
    const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));

    return '#' + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'pending':
        return 'En cours';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  }

  // Méthode pour obtenir les données du graphique circulaire (pour la légende)
  getPieChartData(): { labels: string[]; data: number[]; colors: string[] } {
    if (!this.rapportData) return { labels: [], data: [], colors: [] };

    return {
      labels: this.rapportData.salesByCategory.map((item) => item.category),
      data: this.rapportData.salesByCategory.map((item) => item.value),
      colors: [
        this.colors.primary,
        this.colors.secondary,
        this.colors.tertiary,
        '#A67C52',
        '#BF9B77',
        '#D9B88F',
      ].slice(0, this.rapportData.salesByCategory.length),
    };
  }
}
