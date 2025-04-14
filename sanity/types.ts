export interface Product {
  _id: string;
  _type: string;
  name: string;
  price: number;
  currency: string;
  stock?: number;
  description?: any[];
  slug: string;
  image?: {
    asset?: {
      _id: string;
      url: string;
    };
  };
  categories?: any[];
}

export interface Category {
  _id: string;
  _type: 'category';
  title: string;
  description?: string;
} 