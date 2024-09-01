export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
}

export type ProductProperty = keyof Product;
