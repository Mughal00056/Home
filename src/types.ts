export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'fresh' | 'preserves' | 'bakery' | 'beverages';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  sweetnessBrix: number; // e.g. 21° Brix
  weight: string;
  harvestDate: string;
  image: string;
  description: string;
  tastingNotes: string[];
  inStock: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type CategoryFilter = 'all' | 'fresh' | 'preserves' | 'bakery' | 'beverages';

export interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryNotes?: string;
  paymentMethod: 'card' | 'cod' | 'apple_pay';
}
