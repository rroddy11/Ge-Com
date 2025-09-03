import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEllipsisVertical,
  faEye,
  faEdit,
  faTrash,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Product } from '../../../core/models/product';
import { Client } from '../../../core/models/client.model';
import { Supplier } from '../../../core/models/supplier.model';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-actions-dropdown',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TranslateModule],
  templateUrl: './action-selector.component.html',
  styleUrl: './action-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // Optimize change detection
})
export class ActionSelectorComponent {
  faEllipsisVertical = faEllipsisVertical;
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;
  faFileAlt = faFileAlt;

  isDropdownOpen = false;

  @Input() product?: Product;
  @Input() client?: Client;
  @Input() fournisseur?: Supplier;
  @Input() entity!: { id: number };
  @Input() entityType!: 'product' | 'client' | 'fournisseur';
  @Input() showEdit: boolean = false;
  @Input() showDelete: boolean = false;

  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();
  @Output() viewHistory = new EventEmitter<Product>();
  @Output() editCli = new EventEmitter<Client>();
  @Output() deleteCli = new EventEmitter<Client>();
  @Output() viewHistoryCli = new EventEmitter<Client>();
  @Output() editFou = new EventEmitter<Supplier>();
  @Output() deleteFou = new EventEmitter<Supplier>();
  @Output() viewHistoryFou = new EventEmitter<Supplier>();

  constructor(
    private readonly translate: TranslateService,
    private readonly productService: ProductService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if (!this.entity || !this.entityType) {
      console.error('entity and entityType are required inputs');
    }
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  onEdit(): void {
    if (this.entityType === 'product' && this.product) {
      this.edit.emit(this.product);
    } else if (this.entityType === 'client' && this.client) {
      this.editCli.emit(this.client);
    } else if (this.entityType === 'fournisseur' && this.fournisseur) {
      this.editFou.emit(this.fournisseur);
    }
    this.closeDropdown();
  }

  onDelete(): void {
    if (this.entityType === 'product' && this.product) {
      this.delete.emit(this.product);
    } else if (this.entityType === 'client' && this.client) {
      this.deleteCli.emit(this.client);
    } else if (this.entityType === 'fournisseur' && this.fournisseur) {
      this.deleteFou.emit(this.fournisseur);
    }
    this.closeDropdown();
  }

  onViewHistory(): void {
    if (this.entityType === 'product' && this.product) {
      this.viewHistory.emit(this.product);
    } else if (this.entityType === 'client' && this.client) {
      this.viewHistoryCli.emit(this.client);
    } else if (this.entityType === 'fournisseur' && this.fournisseur) {
      this.viewHistoryFou.emit(this.fournisseur);
    }
    this.closeDropdown();
  }

  viewDetails(): void {
    const routeMap: { [key in 'product' | 'client' | 'fournisseur']: string } =
      {
        product: '/admin/dashboard/product-details',
        client: '/admin/dashboard/clients-details',
        fournisseur: '/admin/dashboard/supplier-details',
      };
    if (this.entity && this.entityType) {
      console.time('navigateToDetails');
      this.router
        .navigate([routeMap[this.entityType], this.entity.id])
        .then(() => {
          console.timeEnd('navigateToDetails');
          this.closeDropdown();
        });
    } else {
      console.error('Cannot navigate: entity or entityType is missing');
    }
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.isDropdownOpen) {
      this.closeDropdown();
    }
  }
}
