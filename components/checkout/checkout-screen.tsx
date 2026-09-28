"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CONSUMER_TRACK, DELIVERY_SLOTS, PAYMENT_METHODS } from "@/lib/constants";
import { producers } from "@/lib/mock/producers";
import { quoteCart } from "@/components/order-totals";
import { OrderTotals } from "@/components/order-totals";
import { Price } from "@/components/price";
import { SiteHeader } from "@/components/site-header";
import { useCartStore } from "@/lib/store/cart";
import { useDeliveryPlace, useSessionStore } from "@/lib/store/session";
import type { CheckoutReceipt, Order, OrderStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const RECEIPT_KEY = "kolo-receipt";

const statusForIndex = (index: number): OrderStatus => {
  if (index <= 0) return "nouvelle";
  if (index === 1) return "en préparation";
  if (index === 2) return "prête";
  return "livrée";
};

export function CheckoutScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const confirming = searchParams.get("confirmation") === "1";
  const items = useCartStore((state) => state.items);
  const hydrated = useCartStore((state) => state.hasHydrated);
  const clear = useCartStore((state) => state.clear);
  const place = useDeliveryPlace();
  const appliedPromo = useSessionStore((state) => state.appliedPromo);
  const setAppliedPromo = useSessionStore((state) => state.setAppliedPromo);
  const addOrders = useSessionStore((state) => state.addOrders);
  const setReceipt = useSessionStore((state) => state.setReceipt);
  const receipt = useSessionStore((state) => state.receipt);

  const [step, setStep] = useState(1);
  const [name, setName] = useState("Awa Koné");
  const [phone, setPhone] = useState("0708091011");
  const [address, setAddress] = useState(place.detail);
  const [note, setNote] = useState("");
  const [contactOk, setContactOk] = useState(true);
  const [slot, setSlot] = useState(DELIVERY_SLOTS[0].id);
  const [payment, setPayment] = useState(PAYMENT_METHODS[0].id);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAddress(place.detail);
  }, [place.detail]);

  useEffect(() => {
    if (!confirming) {
      setReady(true);
      return;
    }
    try {
      const raw = sessionStorage.getItem(RECEIPT_KEY);
      if (raw) setReceipt(JSON.parse(raw) as CheckoutReceipt);
    } catch {
      setReceipt(null);
    }
    setReady(true);
  }, [confirming, setReceipt]);

  const quote = quoteCart(items, appliedPromo);

  const placeOrder = () => {
    const slotLabel = DELIVERY_SLOTS.find((entry) => entry.id === slot);
    const paymentLabel = PAYMENT_METHODS.find((entry) => entry.id === payment);
    const number = `KOLO-2609-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdAt = "2026-09-28";
    const fullAddress = [address, note].filter(Boolean).join(" — ");
    const nextReceipt: CheckoutReceipt = {
      number,
      createdAt,
      customerName: name.trim(),
      phone: phone.trim(),
      address: fullAddress,
      slot: slotLabel ? `${slotLabel.label}, ${slotLabel.detail}` : slot,
      paymentMethod: paymentLabel?.label ?? payment,
      promo: appliedPromo,
      subtotal: quote.subtotal,
      discount: quote.discount,
      deliveryFee: quote.delivery,
      total: quote.total,
      items,
      statusIndex: 0,
    };
    const grouped = producers.flatMap((producer) => {
      const lines = items.filter((item) => item.producerId === producer.id);
      if (lines.length === 0) return [];
      const subtotal = lines.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
      const order: Order = {
        id: `${number}-${producer.id}`,
        number: `${number}-${producer.id.slice(0, 3).toUpperCase()}`,
        producerId: producer.id,
        customerName: name.trim(),
        lines: lines.map((item) => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
        subtotal,
        deliveryFee: 0,
        discount: 0,
        total: subtotal,
        status: "nouvelle",
        createdAt,
        slot: nextReceipt.slot,
        paymentMethod: nextReceipt.paymentMethod,
        address: fullAddress,
      };
      return [order];
    });

    addOrders(grouped);
    setReceipt(nextReceipt);
    sessionStorage.setItem(RECEIPT_KEY, JSON.stringify(nextReceipt));
    setAppliedPromo(null);
    clear();
    toast.success("Paiement simulé", { description: "Aucune transaction réelle n’a été faite." });
    router.push("/commande?confirmation=1");
  };

  const advance = () => {
    if (!receipt) return;
    const next = { ...receipt, statusIndex: Math.min(CONSUMER_TRACK.length - 1, receipt.statusIndex + 1) };
    setReceipt(next);
    sessionStorage.setItem(RECEIPT_KEY, JSON.stringify(next));
  };

  if (confirming) {
    if (!ready || (hydrated === false && !receipt)) {
      return (
        <div className="min-h-screen">
          <SiteHeader />
          <main className="mx-auto max-w-lg px-4 py-10 text-sm text-muted-foreground">Chargement de la confirmation…</main>
        </div>
      );
    }
    if (!receipt) {
      return (
        <div className="min-h-screen">
          <SiteHeader />
          <main className="mx-auto max-w-lg space-y-3 px-4 py-10">
            <h1 className="font-heading text-3xl">Confirmation introuvable</h1>
            <p className="text-muted-foreground">Cette session ne contient pas de commande simulée.</p>
            <Button asChild className="h-11">
              <Link href="/panier">Retour au panier</Link>
            </Button>
          </main>
        </div>
      );
    }
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-lg space-y-5 px-4 pt-6 pb-28">
          <p className="text-sm font-medium text-primary">Commande confirmée</p>
          <h1 className="font-heading text-4xl text-earth">{receipt.number}</h1>
          <p className="text-muted-foreground">
            Merci {receipt.customerName}. Le paiement {receipt.paymentMethod} est simulé. Livraison : {receipt.slot}.
          </p>
          <Card className="space-y-4 p-4">
            <ol className="space-y-3">
              {CONSUMER_TRACK.map((label, index) => {
                const done = index <= receipt.statusIndex;
                return (
                  <li key={label} className="flex items-center gap-3">
                    <span className={`grid size-7 place-items-center rounded-full text-xs font-bold ${done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {index + 1}
                    </span>
                    <span className={done ? "font-medium" : "text-muted-foreground"}>{label}</span>
                  </li>
                );
              })}
            </ol>
            <Progress value={((receipt.statusIndex + 1) / CONSUMER_TRACK.length) * 100} className="h-2" />
            <Button type="button" variant="outline" className="h-11 w-full" onClick={advance} disabled={receipt.statusIndex >= CONSUMER_TRACK.length - 1}>
              Simuler l’étape suivante
            </Button>
          </Card>
          <Card className="space-y-2 p-4 text-sm">
            <p>{receipt.address}</p>
            <p>{receipt.phone}</p>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <Price amount={receipt.total} />
            </div>
            <p className="text-xs text-muted-foreground">Statut producteur : {statusForIndex(receipt.statusIndex)}</p>
          </Card>
          <Button asChild className="h-11 w-full">
            <Link href="/">Continuer mes courses</Link>
          </Button>
        </main>
      </div>
    );
  }

  const next = () => {
    if (step === 1) {
      if (name.trim().length < 2 || phone.replace(/\D/g, "").length < 8 || address.trim().length < 4) {
        toast.error("Complétez le nom, le téléphone et l’adresse.");
        return;
      }
      if (!contactOk) {
        toast.error("Cochez l’autorisation de contact pour le créneau.");
        return;
      }
    }
    setStep((value) => Math.min(3, value + 1));
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl gap-6 px-4 pt-4 pb-28 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="space-y-4">
          <div>
            <h1 className="font-heading text-3xl text-earth">Commande</h1>
            <p className="text-sm text-muted-foreground">Étape {step} sur 3 · paiement simulé</p>
          </div>
          <Progress value={(step / 3) * 100} className="h-2" />

          {!hydrated ? (
            <p className="text-sm text-muted-foreground">Chargement…</p>
          ) : items.length === 0 ? (
            <Card className="space-y-3 p-6">
              <p>Ajoutez des produits avant de commander.</p>
              <Button asChild className="h-11">
                <Link href="/">Voir les fermes</Link>
              </Button>
            </Card>
          ) : (
            <Card className="space-y-4 p-4">
              {step === 1 ? (
                <div className="space-y-3">
                  <h2 className="font-heading text-2xl">Adresse</h2>
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Nom</Label>
                    <Input id="name" value={name} onChange={(event) => setName(event.target.value)} className="h-11" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" inputMode="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className="h-11" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="address">Adresse</Label>
                    <Textarea id="address" value={address} onChange={(event) => setAddress(event.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="note">Indications pour le livreur</Label>
                    <Textarea id="note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Immeuble, étage, code…" />
                  </div>
                  <Label className="flex items-start gap-3 rounded-xl border p-3">
                    <Checkbox checked={contactOk} onCheckedChange={(value) => setContactOk(value === true)} />
                    <span>J’accepte d’être contacté pour confirmer le créneau. Aucun SMS réel n’est envoyé.</span>
                  </Label>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="space-y-3">
                  <h2 className="font-heading text-2xl">Créneau</h2>
                  <RadioGroup value={slot} onValueChange={setSlot}>
                    {DELIVERY_SLOTS.map((entry) => (
                      <Label key={entry.id} className="flex items-center gap-3 rounded-xl border p-3">
                        <RadioGroupItem value={entry.id} />
                        <span>
                          <span className="block">{entry.label}</span>
                          <span className="block text-sm text-muted-foreground">{entry.detail}</span>
                        </span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="space-y-3">
                  <h2 className="font-heading text-2xl">Paiement</h2>
                  <RadioGroup value={payment} onValueChange={setPayment}>
                    {PAYMENT_METHODS.map((entry) => (
                      <Label key={entry.id} className="flex items-center gap-3 rounded-xl border p-3">
                        <RadioGroupItem value={entry.id} />
                        <span>
                          <span className="block">{entry.label}</span>
                          <span className="block text-sm text-muted-foreground">{entry.detail}</span>
                        </span>
                      </Label>
                    ))}
                  </RadioGroup>
                  {payment !== "cod" ? (
                    <p className="text-sm text-muted-foreground">
                      Un débit fictif serait demandé sur le {phone}. Rien n’est encaissé.
                    </p>
                  ) : null}
                </div>
              ) : null}

              <div className="flex gap-2">
                {step > 1 ? (
                  <Button type="button" variant="outline" className="h-11 flex-1" onClick={() => setStep((value) => value - 1)}>
                    Retour
                  </Button>
                ) : null}
                {step < 3 ? (
                  <Button type="button" className="h-11 flex-1" onClick={next}>
                    Continuer
                  </Button>
                ) : (
                  <Button type="button" className="h-11 flex-1" onClick={placeOrder}>
                    Confirmer la commande
                  </Button>
                )}
              </div>
            </Card>
          )}
        </section>
        <aside className="h-fit space-y-3 rounded-2xl border bg-card p-4">
          <h2 className="font-heading text-xl">À payer</h2>
          <OrderTotals items={hydrated ? items : []} promo={appliedPromo} />
        </aside>
      </main>
    </div>
  );
}
