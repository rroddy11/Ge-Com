// actions-dropdown.component.ts
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
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
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-actions-dropdown',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TranslateModule],
  templateUrl: './action-selector.component.html',
  styleUrl: './action-selector.component.scss',
})
export class ActionSelectorComponent {
  // Icônes FontAwesome
  faEllipsisVertical = faEllipsisVertical;
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;
  faFileAlt = faFileAlt;
  products: Product[] = [];

  // État du dropdown
  isDropdownOpen = false;

  // Input pour les données du produit
  @Input() product!: Product;

  // Output events
  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();
  @Output() viewHistory = new EventEmitter<Product>();

  constructor(
    private readonly translate: TranslateService,
    private readonly productService: ProductService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  // Ouvrir/fermer le dropdown
  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Fermer le dropdown
  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/admin/dashboard/product-details', productId]);
  }

  // Émettre l'événement d'édition
  onEdit(): void {
    this.edit.emit(this.product);
    this.closeDropdown();
  }

  // Émettre l'événement de suppression
  onDelete(): void {
    this.delete.emit(this.product);
    this.closeDropdown();
  }

  // Émettre l'événement d'historique
  onViewHistory(): void {
    this.viewHistory.emit(this.product);
    this.closeDropdown();
  }

  // Fermer quand on clique en dehors
  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.isDropdownOpen) {
      this.closeDropdown();
    }
  }
}
