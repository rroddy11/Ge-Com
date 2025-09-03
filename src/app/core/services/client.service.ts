import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clients: Client[] = [
    {
      id: 1,
      firstName: 'Marie',
      lastName: 'Dupont',
      email: 'marie.dupont@email.com',
      phone: '+33 6 12 34 56 78',
      address: '15 Rue de la République',
      city: 'Lyon',
      postalCode: '69001',
      country: 'France',
      company: 'Dupont SARL',
      taxNumber: 'FR12345678901',
      totalOrders: 24,
      totalSpent: 2450.75,
      lastOrderDate: '2025-08-28',
      status: 'active',
      segment: 'premium',
      notes: 'Client fidèle, préfère les produits bio',
      createdAt: '2024-01-15',
      image: '/assets/images/img/product/lfl.png',
    },
    {
      id: 2,
      firstName: 'Pierre',
      lastName: 'Martin',
      email: 'pierre.martin@email.com',
      phone: '+33 6 98 76 54 32',
      address: '22 Avenue des Ternes',
      city: 'Paris',
      postalCode: '75017',
      country: 'France',
      totalOrders: 12,
      totalSpent: 987.5,
      lastOrderDate: '2025-08-25',
      status: 'active',
      segment: 'regular',
      createdAt: '2024-03-10',
      image: '/assets/images/img/product/lfl.png',
    },
    {
      id: 3,
      firstName: 'Sophie',
      lastName: 'Leroy',
      email: 'sophie.leroy@email.com',
      phone: '+33 7 65 43 21 09',
      address: '8 Rue du Moulin',
      city: 'Marseille',
      postalCode: '13001',
      country: 'France',
      company: 'Leroy Consulting',
      taxNumber: 'FR98765432109',
      totalOrders: 42,
      totalSpent: 5678.9,
      lastOrderDate: '2025-08-30',
      status: 'active',
      segment: 'vip',
      notes: 'Commande tous les jeudis',
      createdAt: '2023-11-05',
      image: '/assets/images/img/product/lfl.png',
    },
    {
      id: 4,
      firstName: 'Antoine',
      lastName: 'Bernard',
      email: 'antoine.bernard@email.com',
      phone: '+33 6 11 22 33 44',
      address: '5 Place de la Mairie',
      city: 'Bordeaux',
      postalCode: '33000',
      country: 'France',
      totalOrders: 5,
      totalSpent: 325.6,
      lastOrderDate: '2025-07-15',
      status: 'inactive',
      segment: 'regular',
      createdAt: '2024-06-20',
      image: '/assets/images/img/product/lfl.png',
    },
    {
      id: 5,
      firstName: 'Élodie',
      lastName: 'Moreau',
      email: 'elodie.moreau@email.com',
      phone: '+33 6 55 66 77 88',
      address: '12 Rue des Fleurs',
      city: 'Toulouse',
      postalCode: '31000',
      country: 'France',
      company: 'Fleurs du Sud',
      taxNumber: 'FR55667788990',
      totalOrders: 18,
      totalSpent: 2105.4,
      lastOrderDate: '2025-08-27',
      status: 'active',
      segment: 'premium',
      createdAt: '2024-02-14',
      image: '/assets/images/img/product/lfl.png',
    },
  ];

  getClients(): Client[] {
    return this.clients;
  }

  getClientById(id: number): Client | undefined {
    console.time('getClientById');
    const client = this.clients.find((client) => client.id === id);
    console.timeEnd('getClientById');
    return client;
  }

  addClient(client: Client): void {
    client.id =
      this.clients.length > 0
        ? Math.max(...this.clients.map((c) => c.id)) + 1
        : 1;
    this.clients.push(client);
  }

  updateClient(updatedClient: Client): void {
    const index = this.clients.findIndex((c) => c.id === updatedClient.id);
    if (index !== -1) {
      this.clients[index] = updatedClient;
    }
  }

  deleteClient(id: number): void {
    this.clients = this.clients.filter((client) => client.id !== id);
  }

  getClientsSummary() {
    const totalClients = this.clients.length;
    const activeClients = this.clients.filter(
      (c) => c.status === 'active'
    ).length;
    const vipClients = this.clients.filter((c) => c.segment === 'vip').length;
    const totalRevenue = this.clients.reduce(
      (sum, client) => sum + client.totalSpent,
      0
    );

    return {
      totalClients,
      activeClients,
      vipClients,
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    };
  }
}
