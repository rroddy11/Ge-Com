import {
  Component,
  OnInit,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/models/client.model';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TranslateModule],
  templateUrl: './view-detail-client.component.html',
  styleUrl: './view-detail-client.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewDetailClientComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly clientService = inject(ClientService);
  private readonly translate = inject(TranslateService);

  client: Client | null = null;
  isLoading = true;

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
    console.time('ViewDetailClientComponent.ngOnInit');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.client = this.clientService.getClientById(id) ?? null;
    this.isLoading = false;
    if (!this.client) {
      this.router.navigate(['/clients']);
    }
    console.timeEnd('ViewDetailClientComponent.ngOnInit');
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
    return this.client?.status === 'active'
      ? this.faCheckCircle
      : this.faTimesCircle;
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
