import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationService } from '../../core/services/navigation.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavItem } from '../../core/models/navigation.service.interface';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  navItems: NavItem[] = [];
  faMenu = faBars;
  private readonly navigationService = inject(NavigationService);

  ngOnInit(): void {
    console.log(
      '🔍 SidebarComponent: NavigationService',
      this.navigationService
    );

    try {
      if (this.navigationService) {
        this.navItems = this.navigationService.getNavItems();
        console.log('✅ SidebarComponent: navItems loaded', this.navItems);
      } else {
        console.error('❌ SidebarComponent: NavigationService is undefined');
      }
    } catch (error) {
      console.error('💥 Error accessing NavigationService:', error);
    }
  }

  // Méthode pour vérifier si un lien est actif
  isActiveRoute(url: string): boolean {
    return window.location.pathname === url;
  }
}
