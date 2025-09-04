export interface Sale {
  id: string;
  date: Date;
  client: string;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface Product {
  name: string;
  unitsSold: number;
  category: string;
}

export interface SalesData {
  date: string;
  sales: number;
  profit: number;
}

export interface RapportData {
  totalSales: number;
  salesGrowth: number;
  grossMargin: number;
  marginGrowth: number;
  ordersProcessed: number;
  ordersGrowth: number;
  activeCustomers: number;
  customersGrowth: number;
  salesEvolution: SalesData[];
  topProducts: Product[];
  recentSales: Sale[];
  salesByCategory: { category: string; value: number }[];
}
