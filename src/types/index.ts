export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  whatsapp: string;
  address: string;
  deliveryTime: string;
  comments?: string;
  items: CartItem[];
  status: 'pending' | 'ready' | 'dispatched';
  total: number;
  createdAt: string;
}

export interface CustomerForm {
  name: string;
  email: string;
  whatsapp: string;
  address: string;
  deliveryTime: string;
  comments?: string;
}