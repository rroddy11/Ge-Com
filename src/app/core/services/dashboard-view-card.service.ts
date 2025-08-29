import { Injectable } from '@angular/core';
import {
  faArrowDownShortWide,
  faArrowUpRightFromSquare,
  faCubesStacked,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { SalesStatus } from '../models/dashboard-view-card';

@Injectable({
  providedIn: 'root',
})
export class DashboardViewCard {
  private readonly slasStatus: SalesStatus[] = [
    {
      name: 'Ventes du mois',
      icon: faArrowUpRightFromSquare,
      price: '£15,200',
      progress: '8.5%',
    },
    {
      name: 'Achats en cours',
      icon: faArrowDownShortWide,
      price: '£3,500',
      progress: '-2.1',
    },
    {
      name: 'Valeur du stock',
      icon: faCubesStacked,
      price: '£45,800',
      progress: '1.3%',
    },
    {
      name: 'Nouveaux Clients',
      icon: faUserPlus,
      price: '12',
      progress: '15%',
    },
  ];

  getSalesStatus(): SalesStatus[] {
    return this.slasStatus;
  }
}
