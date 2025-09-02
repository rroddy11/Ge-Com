import { Injectable } from '@angular/core';
import { Supplier } from '../models/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private suppliers: Supplier[] = [
    {
      id: 1,
      name: 'Ferme Bio du Val de Loire',
      contactPerson: 'Jean Lefebvre',
      email: 'contact@fermebioval.fr',
      phone: '+33 2 54 32 10 98',
      address: 'Route des Vergers',
      city: 'Tours',
      postalCode: '37000',
      country: 'France',
      taxNumber: 'FR11223344556',
      productsSupplied: 15,
      totalOrders: 56,
      lastDeliveryDate: '2025-08-29',
      paymentTerms: '30 jours',
      status: 'active',
      rating: 4.8,
      notes: 'Excellents produits bio, livraison ponctuelle',
      createdAt: '2023-05-10',
    },
    {
      id: 2,
      name: 'Fromagerie Traditionnelle',
      contactPerson: 'Marie-Claire Dubois',
      email: 'mc.dubois@fromagerie-trad.fr',
      phone: '+33 3 21 45 67 89',
      address: '12 Rue des Fromages',
      city: 'Lille',
      postalCode: '59000',
      country: 'France',
      taxNumber: 'FR99887766554',
      productsSupplied: 8,
      totalOrders: 42,
      lastDeliveryDate: '2025-08-28',
      paymentTerms: '15 jours',
      status: 'active',
      rating: 4.5,
      createdAt: '2023-08-15',
    },
    {
      id: 3,
      name: 'Boulangerie Artisanale Le Pain Doré',
      contactPerson: 'Michel Durand',
      email: 'michel.durand@paindore.fr',
      phone: '+33 4 76 54 32 10',
      address: '45 Avenue des Blés',
      city: 'Grenoble',
      postalCode: '38000',
      country: 'France',
      taxNumber: 'FR44332211009',
      productsSupplied: 5,
      totalOrders: 78,
      lastDeliveryDate: '2025-08-30',
      paymentTerms: '7 jours',
      status: 'active',
      rating: 4.9,
      notes: 'Meilleur pain de la région',
      createdAt: '2023-03-22',
    },
    {
      id: 4,
      name: 'Éleveur de Volailles des Bois',
      contactPerson: 'François Petit',
      email: 'f.petit@volailles-bois.fr',
      phone: '+33 5 65 43 21 09',
      address: 'Lieu-dit Les Bois',
      city: 'Clermont-Ferrand',
      postalCode: '63000',
      country: 'France',
      taxNumber: 'FR77665544332',
      productsSupplied: 6,
      totalOrders: 23,
      lastDeliveryDate: '2025-08-20',
      paymentTerms: '30 jours',
      status: 'inactive',
      rating: 3.8,
      createdAt: '2024-01-30',
    },
    {
      id: 5,
      name: 'Primeur du Marché Frais',
      contactPerson: 'Lucie Morel',
      email: 'lucie.morel@primeur-frais.fr',
      phone: '+33 6 87 65 43 21',
      address: 'Marché Central - Stand 12',
      city: 'Nice',
      postalCode: '06000',
      country: 'France',
      taxNumber: 'FR22334455667',
      productsSupplied: 22,
      totalOrders: 67,
      lastDeliveryDate: '2025-08-29',
      paymentTerms: 'Comptant',
      status: 'active',
      rating: 4.7,
      notes: 'Fruits et légumes de saison',
      createdAt: '2023-07-18',
    },
  ];

  getSuppliers(): Supplier[] {
    return this.suppliers;
  }

  getSupplierById(id: number): Supplier | undefined {
    return this.suppliers.find((supplier) => supplier.id === id);
  }

  addSupplier(supplier: Supplier): void {
    supplier.id =
      this.suppliers.length > 0
        ? Math.max(...this.suppliers.map((s) => s.id)) + 1
        : 1;
    this.suppliers.push(supplier);
  }

  updateSupplier(updatedSupplier: Supplier): void {
    const index = this.suppliers.findIndex((s) => s.id === updatedSupplier.id);
    if (index !== -1) {
      this.suppliers[index] = updatedSupplier;
    }
  }

  deleteSupplier(id: number): void {
    this.suppliers = this.suppliers.filter((supplier) => supplier.id !== id);
  }

  getSuppliersSummary() {
    const totalSuppliers = this.suppliers.length;
    const activeSuppliers = this.suppliers.filter(
      (s) => s.status === 'active'
    ).length;
    const highRatedSuppliers = this.suppliers.filter(
      (s) => s.rating >= 4.5
    ).length;
    const totalProducts = this.suppliers.reduce(
      (sum, supplier) => sum + supplier.productsSupplied,
      0
    );

    return {
      totalSuppliers,
      activeSuppliers,
      highRatedSuppliers,
      totalProducts,
    };
  }
}
