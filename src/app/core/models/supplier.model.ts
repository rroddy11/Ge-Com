export interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  taxNumber: string;
  productsSupplied: number;
  totalOrders: number;
  lastDeliveryDate?: string;
  paymentTerms: string;
  status: 'active' | 'inactive';
  rating: number;
  notes?: string;
  createdAt: string;
}
