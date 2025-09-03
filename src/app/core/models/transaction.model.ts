export type TransactionType = 'sale' | 'purchase';
export type TransactionStatus = 'completed' | 'in_progress' | 'cancelled';

export interface Transaction {
  id: string;
  type: TransactionType;
  date: Date;
  clientOrSupplier: string;
  product: string;
  quantity: number;
  total: number;
  status: TransactionStatus;
}
