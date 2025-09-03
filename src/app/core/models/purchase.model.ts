export interface Purchase {
  id: string;
  type: 'Achat';
  date: Date;
  supplier: string;
  product: string;
  quantity: number;
  total: number;
  status: 'completed' | 'in_progress' | 'cancelled';
}
