
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageurl: string;
}

export interface CartItem extends Product {
  quantity: number;
}
