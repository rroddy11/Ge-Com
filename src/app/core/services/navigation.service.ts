import { Injectable } from '@angular/core';
import {
  faHome,
  faBox,
  faUsers,
  faUserTie,
  faClipboardList,
  faChartBar,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import { NavItem } from '../models/navigation.service.interface';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly navItems: NavItem[] = [
    { text: 'Tableau de bord', url: '/admin/dashboard/accueil', icon: faHome },
    { text: 'Produits', url: '/admin/dashboard/product', icon: faBox },
    {
      text: 'Clients & Fournisseurs',
      url: '/admin/dashboard/client&fournisseur',
      icon: faUsers,
    },
    {
      text: 'Ventes é Achats',
      url: '/admin/dashboard/vente&achat',
      icon: faUserTie,
    },
    {
      text: 'Inventaire',
      url: '/admin/dashboard/inventaire',
      icon: faClipboardList,
    },
    { text: 'Rapports', url: '/admin/dashboard/rapport', icon: faChartBar },
    { text: 'Paramètres', url: '/admin/dashboard/parametre', icon: faCog },
  ];

  getNavItems(): NavItem[] {
    return this.navItems;
  }
}
