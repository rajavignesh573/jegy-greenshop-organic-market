
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  unit: string;
  isOrganic: boolean;
  isLocal: boolean;
  isFeatured: boolean;
}

export type CartItem = {
  product: Product;
  quantity: number;
};
