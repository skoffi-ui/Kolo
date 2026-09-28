"use client";

import { create } from "zustand";
import type { CheckoutReceipt, Order, OrderStatus, Product, ProductCategory } from "@/lib/types";
import { orders as seedOrders } from "@/lib/mock/orders";
import { products as seedProducts } from "@/lib/mock/products";
import { DELIVERY_PLACES } from "@/lib/constants";

type SessionState = {
  placeId: string;
  setPlaceId: (placeId: string) => void;
  appliedPromo: string | null;
  setAppliedPromo: (code: string | null) => void;
  orders: Order[];
  products: Product[];
  receipt: CheckoutReceipt | null;
  setReceipt: (receipt: CheckoutReceipt | null) => void;
  addOrders: (next: Order[]) => void;
  setOrderStatus: (orderId: string, status: OrderStatus) => void;
  setStock: (productId: string, stock: number) => void;
  setActive: (productId: string, active: boolean) => void;
  addProduct: (product: Product) => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  placeId: DELIVERY_PLACES[0].id,
  setPlaceId: (placeId) => set({ placeId }),
  appliedPromo: null,
  setAppliedPromo: (appliedPromo) => set({ appliedPromo }),
  orders: seedOrders,
  products: seedProducts,
  receipt: null,
  setReceipt: (receipt) => set({ receipt }),
  addOrders: (next) => set((state) => ({ orders: [...next, ...state.orders] })),
  setOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    })),
  setStock: (productId, stock) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId ? { ...product, stock: Math.max(0, stock) } : product,
      ),
    })),
  setActive: (productId, active) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId ? { ...product, active } : product,
      ),
    })),
  addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
}));

export function useDeliveryPlace() {
  const placeId = useSessionStore((state) => state.placeId);
  return DELIVERY_PLACES.find((place) => place.id === placeId) ?? DELIVERY_PLACES[0];
}

export function categoryImage(category: ProductCategory): string {
  const map: Record<ProductCategory, string> = {
    légumes: "/images/products/legumes.svg",
    fruits: "/images/products/fruits.svg",
    œufs: "/images/products/oeufs.svg",
    miel: "/images/products/miel.svg",
    volaille: "/images/products/volaille.svg",
  };
  return map[category];
}
