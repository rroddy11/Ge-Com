import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowUp,
  faArrowDown,
  faCheckCircle,
  faPlus,
  faEye,
  faLanguage,
  faExchangeAlt,
  faFileAlt,
  faShoppingCart,
  faFileInvoice,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from '../../../../../core/models/transaction.model';
import { TransactionService } from '../../../../../core/services/transaction.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TranslateModule],
  templateUrl: './ventess-and-achats.component.html',
  styleUrls: ['./ventess-and-achats.component.scss'],
})
export class VentessAndAchatsComponent implements OnInit {
  // Icônes
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faCheckCircle = faCheckCircle;
  faPlus = faPlus;
  faEye = faEye;
  faLanguage = faLanguage;

  // Données statistiques
  totalSales = 0;
  totalPurchases = 0;
  grossMargin = 0;
  transactionCount = 0;

  documentTypes = [
    { value: 'transactions', label: 'Transactions', icon: faExchangeAlt },
    { value: 'quotes', label: 'Devis', icon: faFileAlt },
    { value: 'orders', label: 'Commandes', icon: faShoppingCart },
    { value: 'invoices', label: 'Factures', icon: faFileInvoice },
  ];

  selectedDocumentType: string = 'transactions';

  // Données graphiques (simplifiées)
  monthlyData = [
    { month: 'Jan', sales: 15000, purchases: 9000 },
    { month: 'Fév', sales: 16000, purchases: 9500 },
    { month: 'Mar', sales: 17000, purchases: 10000 },
    { month: 'Apr', sales: 16500, purchases: 9800 },
    { month: 'Mai', sales: 18000, purchases: 10500 },
    { month: 'Juin', sales: 18500, purchases: 10200 },
  ];

  // Transactions récentes
  recentTransactions: Transaction[] = [];

  // Intégrations de paiement
  paymentIntegrations = [
    { name: 'STRIPE', status: 'ACTIVE', lastUpdate: '2_HOURS_AGO' },
    { name: 'PAYPAL', status: 'ACTIVE', lastUpdate: '5_HOURS_AGO' },
    { name: 'BANK_TRANSFER', status: 'ACTIVE', lastUpdate: '1_DAY_AGO' },
    { name: 'CASH', status: 'ACTIVE', lastUpdate: '30_MINUTES_AGO' },
  ];

  // Langues disponibles
  languages = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
  ];

  currentLang = 'fr';

  constructor(
    private readonly transactionService: TransactionService,
    private readonly translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.totalSales = this.transactionService.getTotalSales();
    this.totalPurchases = this.transactionService.getTotalPurchases();
    this.grossMargin = this.transactionService.getGrossMargin();
    this.transactionCount = this.transactionService.getTransactionCount();
    this.recentTransactions = this.transactionService.getRecentTransactions(7);

    this.currentLang = this.translate.currentLang;
  }

  getSalesChange(): number {
    return 12;
  }

  getPurchasesChange(): number {
    return -5;
  }

  getMarginChange(): number {
    return 8;
  }

  getTransactionChange(): number {
    return 3;
  }

  getStatusClass(status: TransactionStatus): string {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusTranslationKey(status: TransactionStatus): string {
    switch (status) {
      case 'completed':
        return 'DASHBOARD.RECENT_TRANSACTIONS.COMPLETED';
      case 'in_progress':
        return 'DASHBOARD.RECENT_TRANSACTIONS.IN_PROGRESS';
      case 'cancelled':
        return 'DASHBOARD.RECENT_TRANSACTIONS.CANCELLED';
      default:
        return '';
    }
  }

  getTypeTranslationKey(type: TransactionType): string {
    switch (type) {
      case 'sale':
        return 'DASHBOARD.RECENT_TRANSACTIONS.SALE';
      case 'purchase':
        return 'DASHBOARD.RECENT_TRANSACTIONS.PURCHASE';
      default:
        return '';
    }
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLang = lang;
  }

  getLastUpdateTranslation(key: string): string {
    return `PAYMENT_INTEGRATIONS.${key}`;
  }
  getMaxValue(): number {
    const maxSales = Math.max(...this.monthlyData.map((data) => data.sales));
    const maxPurchases = Math.max(
      ...this.monthlyData.map((data) => data.purchases)
    );
    return Math.max(maxSales, maxPurchases);
  }
}
