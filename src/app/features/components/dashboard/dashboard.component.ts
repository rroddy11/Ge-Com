import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { SalesStatus } from '../../../core/models/dashboard-view-card';
import { DashboardViewCard } from '../../../core/services/dashboard-view-card.service';
import { RevenueChartComponent } from '../../../shared/components/revenus-chart/revenus-chart.component';
import { TopProductsChartComponent } from '../../../shared/components/top-products-chart/top-products-chart.component';
import { RecentActivity } from '../../../core/models/activity-recentely';
import { RecentActivityService } from '../../../core/services/activity-recently.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RevenueChartComponent,
    TopProductsChartComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  faArrowUpRightDots = faArrowUpRightFromSquare;
  salesStatus: SalesStatus[] = [];
  recentActivity: RecentActivity[] = [];

  // Injection du service
  private readonly dashboardViewCard = inject(DashboardViewCard);
  private readonly activityRecently = inject(RecentActivityService);

  ngOnInit(): void {
    try {
      if (this.dashboardViewCard) {
        this.salesStatus = this.dashboardViewCard.getSalesStatus();
      } else {
        console.error('==========');
      }
    } catch (error) {
      console.error('💥 *****************************', error);
    }

    try {
      if (this.activityRecently) {
        this.recentActivity = this.activityRecently.getRecentActivity();
      } else {
        console.error('==========');
      }
    } catch (error) {
      console.error('💥 *****************************', error);
    }
  }

  isPositive(progress: string): boolean {
    return parseFloat(progress) >= 0; // vert si ≥ 0
  }
  isNegative(progress: string): boolean {
    return parseFloat(progress) < 0; // rouge si < 0
  }

  isPositives(price: string): boolean {
    // Enlever les symboles non numériques sauf le point décimal et le signe négatif
    const numericValue = parseFloat(price.replace(/[^\d.-]/g, ''));
    return numericValue >= 0;
  }

  isNegatives(price: string): boolean {
    const numericValue = parseFloat(price.replace(/[^\d.-]/g, ''));
    return numericValue < 0;
  }
  // Données basées sur l'image fournie
  revenueData = [
    8000, 10000, 9000, 12000, 13000, 13000, 14000, 14000, 16000, 17000,
  ];
  revenueLabels = [
    'Jan',
    'Fév',
    'Mar',
    'Avr',
    'Mai',
    'Juin',
    'Juil',
    'Août',
    'Sep',
    'Oct',
  ];

  // Données pour les produits les plus vendus
  topProducts = [
    'Tomates Fraîches',
    'Œufs Bio (Douzaine)',
    'Lait de Ferme',
    'Pommes de Terre',
    'Miel Local',
  ];
  productSales = [260, 195, 130, 65, 45];
}
