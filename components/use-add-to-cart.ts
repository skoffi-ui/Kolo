"use client";

import { toast } from "sonner";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";
import { formatFCFA } from "@/lib/utils/format";

export function useAddToCart() {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  return (product: Product, quantity = 1) => {
    if (!product.active) {
      toast.error("Ce produit n’est pas en vente.");
      return;
    }
    const inCart = items.find((item) => item.productId === product.id)?.quantity ?? 0;
    const room = product.stock - inCart;
    if (product.stock <= 0 || room <= 0) {
      toast.error("Stock insuffisant pour cet article.");
      return;
    }
    const added = Math.min(quantity, room);
    addItem(
      {
        productId: product.id,
        producerId: product.producerId,
        name: product.name,
        unit: product.unit,
        unitPrice: product.price,
        image: product.image,
      },
      added,
    );
    toast.success(`${product.name} ajouté au panier`, {
      description:
        added < quantity
          ? `${added} ajouté${added > 1 ? "s" : ""} — stock limité. ${formatFCFA(product.price * added)}`
          : `${added} × ${product.unit} · ${formatFCFA(product.price * added)}`,
    });
  };
}
