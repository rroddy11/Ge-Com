import { Injectable } from '@angular/core';
import { SaleService } from './sale.service';
import { PurchaseService } from './purchase.service';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(
    private saleService: SaleService,
    private purchaseService: PurchaseService
  ) {}

  getRecentTransactions(limit: number = 10): Transaction[] {
    const sales = this.saleService.getSales();
    const purchases = this.purchaseService.getPurchases();

    const allTransactions: Transaction[] = [
      ...sales.map((sale) => ({
        id: sale.id,
        type: 'sale' as const,
        date: sale.date,
        clientOrSupplier: sale.client,
        product: sale.product,
        quantity: sale.quantity,
        total: sale.total,
        status: sale.status,
      })),
      ...purchases.map((purchase) => ({
        id: purchase.id,
        type: 'purchase' as const,
        date: purchase.date,
        clientOrSupplier: purchase.supplier,
        product: purchase.product,
        quantity: purchase.quantity,
        total: purchase.total,
        status: purchase.status,
      })),
    ];

    return allTransactions
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit);
  }

  getTotalSales(): number {
    return this.saleService.getTotalSales();
  }

  getTotalPurchases(): number {
    return this.purchaseService.getTotalPurchases();
  }

  getGrossMargin(): number {
    return this.getTotalSales() - this.getTotalPurchases();
  }

  getTransactionCount(): number {
    return (
      this.saleService.getSales().length +
      this.purchaseService.getPurchases().length
    );
  }
}
