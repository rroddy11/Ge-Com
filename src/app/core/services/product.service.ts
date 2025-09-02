// product.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Pommes Gala Bio',
      category: 'Fruits & Légumes',
      purchasePrice: '1.20 €',
      salePrice: '2.50 €',
      stock: 150,
      imageUrl: '/assets/images/img/product/lfl.png',
      description:
        'Pommes Gala bio cultivées dans nos vergers normands. Récoltées à maturité pour un goût sucré et une texture croquante.',
      features: [
        '100% Bio',
        'Producteur local',
        'Sans pesticides',
        'Récolté à maturité',
        'Variété ancienne',
      ],
      producer: 'Ferme de la Pommeraie',
      origin: 'Normandie, France',
      deliveryTime: '24-48h',
      unit: 'kg',
      isOrganic: true,
      isLocal: true,
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Lait Frais de Ferme',
      category: 'Produits Laitiers',
      purchasePrice: '0.90 €',
      salePrice: '1.80 €',
      stock: 5,
      imageUrl: '/assets/images/img/product/lfl.png',
      description:
        'Lait cru entier issu de nos vaches élevées en plein air. Pasteurisation basse température pour préserver tous les nutriments.',
      features: [
        'Lait cru',
        'Ferme locale',
        'Sans antibiotiques',
        'Rich en calcium',
        'Vaches élevées en plein air',
      ],
      producer: 'Ferme des 3 Vallées',
      origin: 'Bretagne, France',
      deliveryTime: '24h',
      unit: 'litre',
      isOrganic: true,
      isLocal: true,
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Poulet Fermier Entier',
      category: 'Viandes',
      purchasePrice: '8.50 €',
      salePrice: '15.00 €',
      stock: 30,
      imageUrl: '/assets/images/img/product/lfl.png',
      description:
        'Poulet fermier élevé en plein air, nourri aux grains sans OGM. Une viande savoureuse et tendre à la texture ferme.',
      features: [
        'Élevage en plein air',
        'Alimentation sans OGM',
        'Sans antibiotiques',
        'Abattage respectueux',
        'Viande maturée',
      ],
      producer: 'Élevage de la Bellière',
      origin: 'Vendée, France',
      deliveryTime: '48h',
      unit: 'pièce',
      isOrganic: true,
      isLocal: true,
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Pain de Campagne',
      category: 'Boulangerie',
      purchasePrice: '2.10 €',
      salePrice: '3.80 €',
      stock: 80,
      imageUrl: '/assets/images/img/product/lfl.png',
      description:
        'Pain au levain cuit au feu de bois, préparé avec des farines locales moulues à la meule de pierre. Croûte croustillante et mie alvéolée.',
      features: [
        'Farine locale',
        'Levain naturel',
        'Cuisson au feu de bois',
        'Sans additifs',
        'Pétrissage manuel',
      ],
      producer: 'Boulangerie Le Fournil',
      origin: 'Loiret, France',
      deliveryTime: '24h',
      unit: 'pièce',
      isOrganic: true,
      isLocal: true,
      rating: 4.9,
    },
    {
      id: 5,
      name: 'Œufs Bio (Douzaine)',
      category: 'Produits Laitiers',
      purchasePrice: '2.80 €',
      salePrice: '4.50 €',
      stock: 200,
      imageUrl: '/assets/images/img/product/lfl.png',
      description:
        'Œufs bio de poules élevées en plein air, nourries aux grains biologiques. Des œufs frais avec un jaune bien doré et un goût authentique.',
      features: [
        'Poules élevées en plein air',
        'Alimentation bio',
        'Œufs frais du jour',
        'Calibre moyen',
        'Certification AB',
      ],
      producer: 'Ferme des Cocottes Heureuses',
      origin: 'Drôme, France',
      deliveryTime: '24h',
      unit: 'douzaine',
      isOrganic: true,
      isLocal: true,
      rating: 4.6,
    },
    {
      id: 6,
      name: 'Carottes Fraîches',
      category: 'Fruits & Légumes',
      purchasePrice: '0.75 €',
      salePrice: '1.99 €',
      stock: 7,
      imageUrl: '/assets/images/img/product/lfl.png',
      description:
        'Carottes primeurs bio, croquantes et sucrées. Récoltées manuellement pour préserver leur fraîcheur et leurs qualités nutritionnelles.',
      features: [
        'Primeur',
        'Récolte manuelle',
        'Sans pesticides',
        'Pleine terre',
        'Variété Nantaise',
      ],
      producer: 'Jardins de Valois',
      origin: 'Val de Loire, France',
      deliveryTime: '24h',
      unit: 'botte',
      isOrganic: true,
      isLocal: true,
      rating: 4.4,
    },
    {
      id: 7,
      name: 'Poulet de chair',
      category: 'Viandes',
      purchasePrice: '6.00 €',
      salePrice: '11.50 €',
      stock: 45,
      imageUrl: '/assets/images/img/product/lfl.png',
      description:
        'Poulet label rouge élevé en liberté, à croissance lente pour une viande goûteuse et une texture fondante.',
      features: [
        'Label Rouge',
        'Élevage en liberté',
        'Croissance lente',
        'Alimentation végétale',
        'Sans OGM',
      ],
      producer: 'Élevage des Bois',
      origin: 'Gâtinais, France',
      deliveryTime: '48h',
      unit: 'pièce',
      isOrganic: false,
      isLocal: true,
      rating: 4.3,
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter((product) => product.id !== id);
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }
}
