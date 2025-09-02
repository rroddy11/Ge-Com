import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/models/client.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faEdit,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faBuilding,
  faReceipt,
  faShoppingCart,
  faEuroSign,
  faCalendarAlt,
  faUserTag,
  faCircle,
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TranslateModule],
  templateUrl: './view-detail-client.component.html',
  styleUrl: './view-detail-client.component.scss',
})
export class ViewDetailClientComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private clientService = inject(ClientService);
  private translate = inject(TranslateService);

  client: Client | null = null;
  isLoading = true;

  // Icônes
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faMapMarkerAlt = faMapMarkerAlt;
  faBuilding = faBuilding;
  faReceipt = faReceipt;
  faShoppingCart = faShoppingCart;
  faEuroSign = faEuroSign;
  faCalendarAlt = faCalendarAlt;
  faUserTag = faUserTag;
  faCircle = faCircle;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const client = this.clientService.getClientById(id);
    this.client = client ?? null; // Convert undefined to null
    this.isLoading = false;

    if (!this.client) {
      this.router.navigate(['/clients']);
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/dashboard/client&fournisseur']);
  }

  editClient(): void {
    if (this.client) {
      this.router.navigate(['/clients', this.client.id, 'edit']);
    }
  }

  getStatusIcon(): any {
    return this.client?.status === 'active' ? faCheckCircle : faTimesCircle;
  }

  getStatusColor(): string {
    return this.client?.status === 'active' ? 'text-green-600' : 'text-red-600';
  }

  getSegmentColor(): string {
    switch (this.client?.segment) {
      case 'vip':
        return 'bg-purple-100 text-purple-800';
      case 'premium':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getSegmentTranslation(): string {
    return this.client
      ? this.translate.instant(`CLIENTS.${this.client.segment.toUpperCase()}`)
      : '';
  }

  getStatusTranslation(): string {
    return this.client
      ? this.translate.instant(`CLIENTS.${this.client.status.toUpperCase()}`)
      : '';
  }

  getRecentActivities(): any[] {
    if (!this.client) return [];

    // Données simulées pour l'historique
    return [
      {
        date: '15/03/2024',
        description: 'Commande #12345 - Produits laitiers',
        amount: '500.00 €',
        status: 'Payé',
      },
      {
        date: '01/03/2024',
        description: 'Commande #12344 - Épicerie',
        amount: '120.50 €',
        status: 'Payé',
      },
      {
        date: '10/02/2024',
        description: 'Commande #12343 - Boissons',
        amount: '30.00 €',
        status: 'En attente',
      },
    ];
  }
}
