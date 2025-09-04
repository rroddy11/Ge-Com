export interface InventoryItem {
  id: number;
  productName: string;
  sku: string;
  category: string;
  currentStock: number;
  unit: string;
  status: 'En Stock' | 'Faible' | 'Rupture' | '';
  lastUpdated?: Date;
  minimumStock?: number;
}

export interface InventoryMovement {
  id: number;
  productName: string;
  date: Date;
  quantity: number; // positif pour entrées, négatif pour sorties
  type: 'entrée' | 'sortie';
}

export interface InventoryOverview {
  totalItems: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
}
export interface InventoryStatusDistribution {
  labels: string[];
  data: number[];
  colors: string[];
}
