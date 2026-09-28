"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cart";

export function CartHydrater() {
  useEffect(() => {
    const finish = () => {
      useCartStore.getState().setHasHydrated(true);
    };
    if (useCartStore.persist.hasHydrated()) {
      finish();
      return;
    }
    const unsubscribe = useCartStore.persist.onFinishHydration(finish);
    void useCartStore.persist.rehydrate();
    return unsubscribe;
  }, []);

  return null;
}
