import type { CartItem } from "@/lib/types";
import { formatFCFA } from "@/lib/utils/format";

export const FREE_DELIVERY_FROM = 20000;
export const DELIVERY_BASE = 1000;
export const DELIVERY_EXTRA_PRODUCER = 500;

export function subtotalOf(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

export function producerCount(items: CartItem[]): number {
  return new Set(items.map((item) => item.producerId)).size;
}

export function deliveryFee(subtotal: number, producers: number): number {
  if (subtotal <= 0 || producers <= 0) return 0;
  if (subtotal >= FREE_DELIVERY_FROM) return 0;
  return DELIVERY_BASE + Math.max(0, producers - 1) * DELIVERY_EXTRA_PRODUCER;
}

export function discountFor(
  code: string | null,
  subtotal: number,
): { amount: number; error?: string; normalized: string | null } {
  if (!code || !code.trim()) return { amount: 0, normalized: null };
  const normalized = code.trim().toUpperCase();
  if (normalized === "KOLO10") {
    return { amount: Math.round(subtotal * 0.1), normalized };
  }
  if (normalized === "BIENVENUE") {
    if (subtotal < 5000) {
      return {
        amount: 0,
        normalized: null,
        error: `BIENVENUE s’applique dès ${formatFCFA(5000)}.`,
      };
    }
    return { amount: Math.min(1500, subtotal), normalized };
  }
  return { amount: 0, normalized: null, error: "Ce code n’est pas reconnu." };
}

export function totalOf(subtotal: number, discount: number, delivery: number): number {
  return Math.max(0, subtotal - discount) + delivery;
}
