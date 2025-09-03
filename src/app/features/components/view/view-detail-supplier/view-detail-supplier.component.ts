import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../../../../core/services/supplier.service';
import { Supplier } from '../../../../core/models/supplier.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faEdit,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faReceipt,
  faBoxOpen,
  faShoppingCart,
  faCalendarAlt,
  faStar,
  faClock,
  faCircle,
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-supplier-detail',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TranslateModule],
  templateUrl: './view-detail-supplier.component.html',
  styleUrl: './view-detail-supplier.component.scss',
})
export class ViewDetailSupplierComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly supplierService = inject(SupplierService);
  private readonly translate = inject(TranslateService);

  supplier: Supplier | null = null;
  isLoading = true;

  // Icônes
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faMapMarkerAlt = faMapMarkerAlt;
  faReceipt = faReceipt;
  faBoxOpen = faBoxOpen;
  faShoppingCart = faShoppingCart;
  faCalendarAlt = faCalendarAlt;
  faStar = faStar;
  faClock = faClock;
  faCircle = faCircle;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const supplier = this.supplierService.getSupplierById(id);
    this.supplier = supplier ?? null; // Convert undefined to null
    this.isLoading = false;

    if (!this.supplier) {
      this.router.navigate(['/suppliers']);
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/dashboard/client&fournisseur']);
  }

  editSupplier(): void {
    if (this.supplier) {
      this.router.navigate(['/suppliers', this.supplier.id, 'edit']);
    }
  }

  getStatusIcon(): any {
    return this.supplier?.status === 'active' ? faCheckCircle : faTimesCircle;
  }

  getStatusColor(): string {
    return this.supplier?.status === 'active'
      ? 'text-green-600'
      : 'text-red-600';
  }

  getRatingColor(): string {
    if (!this.supplier) return 'bg-gray-100 text-gray-800';
    if (this.supplier.rating >= 4.5) return 'bg-green-100 text-green-800';
    if (this.supplier.rating >= 4.0) return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  }

  getRatingTranslation(): string {
    if (!this.supplier) return '';
    if (this.supplier.rating >= 4.5)
      return this.translate.instant('SUPPLIERS.HIGH_RATING');
    if (this.supplier.rating >= 4.0)
      return this.translate.instant('SUPPLIERS.GOOD_RATING');
    return this.translate.instant('SUPPLIERS.AVERAGE_RATING');
  }

  getStatusTranslation(): string {
    return this.supplier
      ? this.translate.instant(
          `SUPPLIERS.${this.supplier.status.toUpperCase()}`
        )
      : '';
  }

  getRecentActivities(): any[] {
    if (!this.supplier) return [];

    // Données simulées pour l'historique
    return [
      {
        date: '15/08/2025',
        description: 'Livraison #54321 - Produits bio',
        amount: '1200.00 €',
        status: 'Payé',
      },
      {
        date: '01/08/2025',
        description: 'Livraison #54320 - Fromages',
        amount: '450.75 €',
        status: 'Payé',
      },
      {
        date: '20/07/2025',
        description: 'Livraison #54319 - Pains artisanaux',
        amount: '300.00 €',
        status: 'En attente',
      },
    ];
  }
}
