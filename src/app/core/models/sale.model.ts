export interface Sale {
  id: string;
  type: 'Vente';
  date: Date;
  client: string;
  product: string;
  quantity: number;
  total: number;
  status: 'completed' | 'in_progress' | 'cancelled';
}
