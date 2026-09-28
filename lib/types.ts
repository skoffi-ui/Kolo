export type ProducerType =
  | "maraîcher"
  | "éleveur"
  | "apiculteur"
  | "arboriculteur";

export type ProductCategory =
  | "légumes"
  | "fruits"
  | "œufs"
  | "miel"
  | "volaille";

export type OrderStatus = "nouvelle" | "en préparation" | "prête" | "livrée";

export type Producer = {
  id: string;
  slug: string;
  name: string;
  type: ProducerType;
  town: string;
  location: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  labels: string[];
  story: string;
  image: string;
  followers: number;
};

export type Review = {
  id: string;
  producerId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export type Product = {
  id: string;
  producerId: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  stock: number;
  season: string;
  category: ProductCategory;
  inSeason: boolean;
  image: string;
  active: boolean;
  lotCode: string;
};

export type OrderLine = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: string;
  number: string;
  producerId: string;
  customerName: string;
  lines: OrderLine[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  slot?: string;
  paymentMethod?: string;
  address?: string;
};

export type CartItem = {
  productId: string;
  producerId: string;
  name: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  image: string;
};

export type DeliveryPlace = {
  id: string;
  label: string;
  detail: string;
  lat: number;
  lng: number;
};

export type CheckoutReceipt = {
  number: string;
  createdAt: string;
  customerName: string;
  phone: string;
  address: string;
  slot: string;
  paymentMethod: string;
  promo: string | null;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  items: CartItem[];
  statusIndex: number;
};
