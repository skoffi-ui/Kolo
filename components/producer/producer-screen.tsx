"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { MapPin, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import type { Producer } from "@/lib/types";
import { getReviews } from "@/lib/mock/producers";
import { useDeliveryPlace, useSessionStore } from "@/lib/store/session";
import { distanceKm } from "@/lib/utils/geo";
import { formatCount, formatDate, formatKm, formatRating } from "@/lib/utils/format";
import { SiteHeader } from "@/components/site-header";
import { LotQr } from "@/components/lot-qr";
import { Price } from "@/components/price";
import { Stars } from "@/components/stars";
import { useAddToCart } from "@/components/use-add-to-cart";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export function ProducerScreen({ producer }: { producer: Producer }) {
  const catalog = useSessionStore((state) => state.products);
  const products = useMemo(
    () => catalog.filter((product) => product.producerId === producer.id),
    [catalog, producer.id],
  );
  const reviews = useMemo(() => getReviews(producer.id), [producer.id]);
  const place = useDeliveryPlace();
  const km = distanceKm(place, producer);
  const addToCart = useAddToCart();
  const [followed, setFollowed] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const featured = products.find((product) => product.stock > 0) ?? products[0];

  const average =
    reviews.length === 0
      ? producer.rating
      : Math.round((reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length) * 10) / 10;

  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((review) => review.rating === star).length;
    return { star, count, ratio: reviews.length === 0 ? 0 : (count / reviews.length) * 100 };
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl space-y-8 px-4 pt-4 pb-28">
        <section className="overflow-hidden rounded-3xl border bg-card">
          <div className="relative h-52 sm:h-72">
            <Image
              src={producer.image}
              alt={`Illustration de ${producer.name} à ${producer.town}`}
              fill
              priority
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1100px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-earth/80 via-earth/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 space-y-2 p-4 text-white sm:p-6">
              <div className="flex flex-wrap gap-1.5">
                {producer.labels.map((label) => (
                  <Badge key={label} className="bg-white/90 text-earth">
                    {label}
                  </Badge>
                ))}
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl">{producer.name}</h1>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-4" />
                  {producer.location}
                </span>
                <span>{formatKm(km)}</span>
                <span className="inline-flex items-center gap-1">
                  <Stars value={average} className="[&_svg]:text-white [&_svg]:fill-white" />
                  {formatRating(average)} · {reviews.length} avis
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 p-4">
            <p className="text-sm text-muted-foreground">
              {producer.type} · {formatCount(producer.followers)} abonnés
            </p>
            <Button
              type="button"
              variant={followed ? "secondary" : "default"}
              className="h-11 px-4"
              onClick={() => {
                setFollowed((value) => !value);
                toast.success(followed ? `Vous ne suivez plus ${producer.name}` : `Vous suivez ${producer.name}`);
              }}
            >
              {followed ? "Suivi" : "Suivre"}
            </Button>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-2xl">Leur histoire</h2>
          <p className="max-w-3xl text-base leading-relaxed text-foreground/90">{producer.story}</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl">Les produits</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const quantity = quantities[product.id] ?? 1;
              const low = product.stock > 0 && product.stock <= 5;
              const max = Math.max(1, product.stock);
              return (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative h-36">
                    <Image src={product.image} alt="" fill unoptimized className="object-cover" sizes="320px" />
                    {product.stock === 0 ? (
                      <Badge variant="destructive" className="absolute top-2 left-2">
                        Rupture
                      </Badge>
                    ) : low ? (
                      <Badge className="absolute top-2 left-2 bg-clay text-white">
                        Plus que {product.stock}
                      </Badge>
                    ) : null}
                  </div>
                  <div className="space-y-3 p-4">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <Price amount={product.price} className="text-lg font-semibold" />
                      <span className="text-xs text-muted-foreground">/ {product.unit}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Saison : {product.season}</p>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="size-11"
                        aria-label="Diminuer la quantité"
                        disabled={product.stock === 0 || quantity <= 1}
                        onClick={() =>
                          setQuantities((current) => ({
                            ...current,
                            [product.id]: Math.max(1, (current[product.id] ?? 1) - 1),
                          }))
                        }
                      >
                        <Minus />
                      </Button>
                      <span className="w-8 text-center font-medium tabular-nums">{product.stock === 0 ? 0 : quantity}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="size-11"
                        aria-label="Augmenter la quantité"
                        disabled={product.stock === 0 || quantity >= max}
                        onClick={() =>
                          setQuantities((current) => ({
                            ...current,
                            [product.id]: Math.min(max, (current[product.id] ?? 1) + 1),
                          }))
                        }
                      >
                        <Plus />
                      </Button>
                      <Button
                        type="button"
                        className="h-11 flex-1"
                        disabled={product.stock === 0 || !product.active}
                        onClick={() => addToCart(product, quantity)}
                      >
                        Ajouter
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {featured ? (
          <section className="grid gap-4 rounded-3xl border bg-card p-4 sm:grid-cols-[auto_1fr] sm:p-6">
            <LotQr code={featured.lotCode} />
            <div className="space-y-3">
              <div>
                <h2 className="font-heading text-2xl">Traçabilité</h2>
                <p className="text-sm text-muted-foreground">
                  Lot {featured.lotCode} · {featured.name}. Touchez le QR pour l’agrandir.
                </p>
              </div>
              <ol className="grid gap-3 sm:grid-cols-3">
                {[
                  { title: "Récolté", detail: "26 septembre 2026", done: true },
                  { title: "Préparé", detail: "27 septembre 2026", done: true },
                  { title: "Livré", detail: "En cours vers Abidjan", done: false },
                ].map((step) => (
                  <li key={step.title} className="rounded-2xl bg-muted p-3">
                    <p className="text-xs tracking-wide text-muted-foreground uppercase">{step.done ? "Fait" : "À venir"}</p>
                    <p className="font-medium">{step.title}</p>
                    <p className="text-sm text-muted-foreground">{step.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ) : null}

        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-heading text-2xl">Avis</h2>
            <p className="text-sm text-muted-foreground">
              {formatRating(average)} / 5 · {reviews.length} avis
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
            <div className="rounded-2xl border bg-card p-4 text-center">
              <p className="font-heading text-5xl text-earth">{formatRating(average)}</p>
              <Stars value={average} className="mt-2 justify-center" />
            </div>
            <div className="space-y-2">
              {distribution.map((row) => (
                <div key={row.star} className="grid grid-cols-[3rem_1fr_2rem] items-center gap-2 text-sm">
                  <span>{row.star} ★</span>
                  <Progress value={row.ratio} className="h-2" />
                  <span className="text-right text-muted-foreground">{row.count}</span>
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review.id} className="flex gap-3">
                <Avatar>
                  <AvatarFallback>{initials(review.author)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{review.author}</p>
                    <Stars value={review.rating} />
                    <span className="text-xs text-muted-foreground">{formatDate(review.date)}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed">{review.comment}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
