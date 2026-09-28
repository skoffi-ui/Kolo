"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem } from "@/lib/types";

type CartState = {
  items: CartItem[];
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      addItem: (item, quantity = 1) => {
        const items = get().items;
        const existing = items.find((entry) => entry.productId === item.productId);
        if (existing) {
          set({
            items: items.map((entry) =>
              entry.productId === item.productId
                ? { ...entry, quantity: entry.quantity + quantity }
                : entry,
            ),
          });
          return;
        }
        set({ items: [...items, { ...item, quantity }] });
      },
      setQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((entry) => entry.productId !== productId) });
          return;
        }
        set({
          items: get().items.map((entry) =>
            entry.productId === productId ? { ...entry, quantity } : entry,
          ),
        });
      },
      removeItem: (productId) =>
        set({ items: get().items.filter((entry) => entry.productId !== productId) }),
      clear: () => set({ items: [] }),
    }),
    {
      name: "kolo-cart",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export function useCartCount(): number {
  return useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );
}
