export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  company?: string;
  taxNumber?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  status: 'active' | 'inactive';
  segment: 'regular' | 'premium' | 'vip';
  notes?: string;
  createdAt: string;
  image: string;
}
