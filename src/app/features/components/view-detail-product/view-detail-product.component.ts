import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faEdit,
  faTrash,
  faCheckCircle,
  faLeaf,
  faEgg,
  faWheatAlt,
  faSeedling,
  faCow,
  faCertificate,
  faStore,
  faCalendarAlt,
  faWeightHanging,
  faStar,
  faStarHalfAlt,
  faBox,
  faEuroSign,
  faChartLine,
  faHistory,
  faTags,
  faIdCard,
  faRegistered,
} from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../../core/models/product';
import { ProductService } from '../../../core/services/product.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view-detail-product',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, TranslateModule],
  templateUrl: './view-detail-product.component.html',
  styleUrls: ['./view-detail-product.component.scss'],
})
export class ViewDetailProductComponent implements OnInit {
  product: Product | undefined;

  // Icones FontAwesome
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;
  faTrash = faTrash;
  faCheckCircle = faCheckCircle;
  faLeaf = faLeaf;
  faEgg = faEgg;
  faWheatAlt = faWheatAlt;
  faSeedling = faSeedling;
  faCow = faCow;
  faCertificate = faCertificate;
  faStore = faStore;
  faCalendarAlt = faCalendarAlt;
  faWeightHanging = faWeightHanging;
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  faRegistered = faRegistered;
  faBox = faBox;
  faEuroSign = faEuroSign;
  faChartLine = faChartLine;
  faHistory = faHistory;
  faTags = faTags;
  faIdCard = faIdCard;

  constructor(
    public translate: TranslateService,
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);
  }

  getStars(rating: number) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(faStar);
    }

    if (hasHalfStar) {
      stars.push(faStarHalfAlt);
    }

    while (stars.length < 5) {
      stars.push(faRegistered);
    }

    return stars;
  }

  calculateProfitMargin(purchasePrice: string, salePrice: string): number {
    const purchase = parseFloat(
      purchasePrice.replace(' €', '').replace(',', '.')
    );
    const sale = parseFloat(salePrice.replace(' €', '').replace(',', '.'));
    return ((sale - purchase) / purchase) * 100;
  }

  calculateProfit(purchasePrice: string, salePrice: string): number {
    const purchase = parseFloat(
      purchasePrice.replace(' €', '').replace(',', '.')
    );
    const sale = parseFloat(salePrice.replace(' €', '').replace(',', '.'));
    return sale - purchase;
  }
}
