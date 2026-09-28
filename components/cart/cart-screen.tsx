"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { producers } from "@/lib/mock/producers";
import { discountFor } from "@/lib/pricing";
import { useCartStore } from "@/lib/store/cart";
import { useSessionStore } from "@/lib/store/session";
import { SiteHeader } from "@/components/site-header";
import { OrderTotals, quoteCart } from "@/components/order-totals";
import { Price } from "@/components/price";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function CartScreen() {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const hydrated = useCartStore((state) => state.hasHydrated);
  const catalog = useSessionStore((state) => state.products);
  const appliedPromo = useSessionStore((state) => state.appliedPromo);
  const setAppliedPromo = useSessionStore((state) => state.setAppliedPromo);
  const [draft, setDraft] = useState(appliedPromo ?? "");

  const groups = producers
    .map((producer) => ({
      producer,
      items: items.filter((item) => item.producerId === producer.id),
    }))
    .filter((group) => group.items.length > 0);

  const applyPromo = () => {
    const subtotal = quoteCart(items, null).subtotal;
    const result = discountFor(draft, subtotal);
    if (result.error || !result.normalized) {
      setAppliedPromo(null);
      toast.error(result.error ?? "Ce code n’est pas reconnu.");
      return;
    }
    setAppliedPromo(result.normalized);
    toast.success(`Code ${result.normalized} appliqué`);
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl gap-6 px-4 pt-4 pb-28 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="space-y-4">
          <h1 className="font-heading text-3xl text-earth">Panier</h1>
          {!hydrated ? (
            <p className="text-sm text-muted-foreground">Chargement du panier…</p>
          ) : items.length === 0 ? (
            <Card className="space-y-3 p-6">
              <p>Votre panier est vide.</p>
              <Button asChild className="h-11 px-4">
                <Link href="/">Découvrir les fermes</Link>
              </Button>
            </Card>
          ) : (
            groups.map((group) => (
              <Card key={group.producer.id} className="space-y-3 p-4">
                <div>
                  <h2 className="font-heading text-xl">{group.producer.name}</h2>
                  <p className="text-sm text-muted-foreground">{group.producer.town}</p>
                </div>
                <Separator />
                <ul className="space-y-3">
                  {group.items.map((item) => {
                    const stock = catalog.find((product) => product.id === item.productId)?.stock ?? 99;
                    return (
                      <li key={item.productId} className="flex gap-3">
                        <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                          <Image src={item.image} alt="" fill unoptimized className="object-cover" sizes="64px" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.unit}</p>
                            </div>
                            <Price amount={item.unitPrice * item.quantity} className="font-semibold" />
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <Button
                              type="button"
                              size="icon"
                              variant="outline"
                              className="size-10"
                              aria-label={`Diminuer ${item.name}`}
                              onClick={() => setQuantity(item.productId, item.quantity - 1)}
                            >
                              <Minus />
                            </Button>
                            <span className="w-6 text-center tabular-nums">{item.quantity}</span>
                            <Button
                              type="button"
                              size="icon"
                              variant="outline"
                              className="size-10"
                              aria-label={`Augmenter ${item.name}`}
                              disabled={item.quantity >= stock}
                              onClick={() => setQuantity(item.productId, item.quantity + 1)}
                            >
                              <Plus />
                            </Button>
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="size-10 text-destructive"
                              aria-label={`Retirer ${item.name}`}
                              onClick={() => removeItem(item.productId)}
                            >
                              <Trash2 />
                            </Button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            ))
          )}
        </section>

        <aside className="h-fit space-y-4 rounded-2xl border bg-card p-4 lg:sticky lg:top-24">
          <h2 className="font-heading text-xl">Récapitulatif</h2>
          <div className="space-y-2">
            <Label htmlFor="promo">Code promo</Label>
            <div className="flex gap-2">
              <Input
                id="promo"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="KOLO10"
                className="h-11 uppercase"
              />
              <Button type="button" variant="secondary" className="h-11" onClick={applyPromo} disabled={!hydrated || items.length === 0}>
                OK
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Essayez KOLO10 ou BIENVENUE.</p>
          </div>
          <OrderTotals items={hydrated ? items : []} promo={appliedPromo} />
          <Button asChild className="h-11 w-full" disabled={!hydrated || items.length === 0}>
            <Link href="/commande" aria-disabled={!hydrated || items.length === 0} className={!hydrated || items.length === 0 ? "pointer-events-none opacity-50" : ""}>
              Passer commande
            </Link>
          </Button>
        </aside>
      </main>
    </div>
  );
}
