export interface Product {
  id: number;
  name: string;
  category: string;
  purchasePrice: string;
  salePrice: string;
  stock: number;
  imageUrl?: string;
  description: string;
  features: string[];
  producer: string;
  origin: string;
  deliveryTime: string;
  unit: string;
  isOrganic: boolean;
  isLocal: boolean;
  rating: number;
}
