"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Apple, Bird, Egg, Hexagon, Leaf, Map as MapIcon, Plus, SlidersHorizontal } from "lucide-react";
import { CATEGORIES, DELIVERY_PLACES } from "@/lib/constants";
import { producers } from "@/lib/mock/producers";
import { useSessionStore } from "@/lib/store/session";
import { distanceKm } from "@/lib/utils/geo";
import { formatKm, formatRating, normalizeSearch } from "@/lib/utils/format";
import type { ProductCategory } from "@/lib/types";
import { SiteHeader } from "@/components/site-header";
import { Price } from "@/components/price";
import { Stars } from "@/components/stars";
import { useAddToCart } from "@/components/use-add-to-cart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { cn } from "cn";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => <Skeleton className="h-full min-h-[320px] w-full rounded-2xl" />,
});

const categoryIcons = {
  légumes: Leaf,
  fruits: Apple,
  œufs: Egg,
  miel: Hexagon,
  volaille: Bird,
} as const;

export function HomeScreen() {
  const catalog = useSessionStore((state) => state.products);
  const placeId = useSessionStore((state) => state.placeId);
  const delivery = DELIVERY_PLACES.find((entry) => entry.id === placeId) ?? DELIVERY_PLACES[0];

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | null>(null);
  const [bioOnly, setBioOnly] = useState(false);
  const [maxKm, setMaxKm] = useState(60);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"carte" | "liste">("carte");
  const addToCart = useAddToCart();

  const distances = useMemo(() => {
    const next: Record<string, number> = {};
    for (const producer of producers) {
      next[producer.id] = distanceKm(delivery, producer);
    }
    return next;
  }, [delivery]);

  const filtered = useMemo(() => {
    const needle = normalizeSearch(query.trim());
    return producers.filter((producer) => {
      if ((distances[producer.id] ?? 999) > maxKm) return false;
      if (bioOnly && !producer.labels.includes("bio")) return false;
      const ownProducts = catalog.filter((product) => product.producerId === producer.id && product.active);
      if (category && !ownProducts.some((product) => product.category === category)) return false;
      if (!needle) return true;
      const haystack = normalizeSearch(
        [producer.name, producer.town, producer.type, producer.location, ...ownProducts.map((product) => product.name)].join(" "),
      );
      return haystack.includes(needle);
    });
  }, [bioOnly, catalog, category, distances, maxKm, query]);

  const seasonal = useMemo(() => {
    const ids = new Set(filtered.map((producer) => producer.id));
    const needle = normalizeSearch(query.trim());
    return catalog
      .filter((product) => product.active && product.inSeason && product.stock > 0 && ids.has(product.producerId))
      .filter((product) => (category ? product.category === category : true))
      .filter((product) => (needle ? normalizeSearch(product.name).includes(needle) || needle.length === 0 : true))
      .slice(0, 8);
  }, [catalog, category, filtered, query]);

  const under20 = maxKm <= 20;

  return (
    <div className="min-h-screen">
      <SiteHeader query={query} onQueryChange={setQuery} />
      <main className="mx-auto max-w-6xl space-y-6 px-4 pt-4 pb-28">
        <section className="space-y-3">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Circuit court · Grand Abidjan</p>
              <h1 className="font-heading text-3xl text-earth sm:text-4xl">Les fermes autour de vous</h1>
            </div>
            <p className="hidden text-sm text-muted-foreground sm:block">
              {filtered.length} producteur{filtered.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            <Button
              type="button"
              variant={category === null ? "default" : "outline"}
              className="h-10 shrink-0 rounded-full px-4"
              onClick={() => setCategory(null)}
            >
              Tout
            </Button>
            {CATEGORIES.map((entry) => {
              const Icon = categoryIcons[entry.id];
              const active = category === entry.id;
              return (
                <Button
                  key={entry.id}
                  type="button"
                  variant={active ? "default" : "outline"}
                  className="h-10 shrink-0 rounded-full px-4"
                  onClick={() => setCategory(active ? null : entry.id)}
                >
                  <Icon />
                  {entry.label}
                </Button>
              );
            })}
            <Button
              type="button"
              variant={bioOnly ? "default" : "outline"}
              className="h-10 shrink-0 rounded-full px-4"
              aria-pressed={bioOnly}
              onClick={() => setBioOnly((value) => !value)}
            >
              Bio
            </Button>
            <Button
              type="button"
              variant={under20 ? "default" : "outline"}
              className="h-10 shrink-0 rounded-full px-4"
              aria-pressed={under20}
              onClick={() => setMaxKm(under20 ? 60 : 20)}
            >
              {"< 20 km"}
            </Button>
          </div>

          <div className="rounded-2xl border bg-card px-4 py-3">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <SlidersHorizontal className="size-4" />
                Rayon depuis {delivery.label}
              </span>
              <span className="font-medium">{Math.round(maxKm)} km</span>
            </div>
            <Slider
              value={[maxKm]}
              min={10}
              max={80}
              step={5}
              onValueChange={(value) => setMaxKm(value[0] ?? 60)}
              aria-label="Rayon de recherche en kilomètres"
            />
          </div>
        </section>

        <div className="flex gap-2 lg:hidden">
          <Button
            type="button"
            variant={mobileView === "carte" ? "default" : "outline"}
            className="h-11 flex-1"
            onClick={() => setMobileView("carte")}
          >
            <MapIcon />
            Carte
          </Button>
          <Button
            type="button"
            variant={mobileView === "liste" ? "default" : "outline"}
            className="h-11 flex-1"
            onClick={() => setMobileView("liste")}
          >
            Liste
          </Button>
        </div>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)]">
          <div className={cn("h-[320px] overflow-hidden rounded-2xl border sm:h-[420px] lg:h-[560px]", mobileView !== "carte" && "max-lg:hidden")}>
            <MapView
              producers={filtered}
              distances={distances}
              highlightedId={highlightedId}
              onHighlight={setHighlightedId}
              visible={mobileView === "carte"}
            />
          </div>

          <div className={cn("space-y-3 lg:max-h-[560px] lg:overflow-y-auto lg:pr-1", mobileView !== "liste" && "max-lg:hidden")}>
            {filtered.length === 0 ? (
              <Card className="p-6 text-sm text-muted-foreground">
                Aucune ferme dans ce rayon. Élargissez la distance ou retirez un filtre.
              </Card>
            ) : (
              filtered.map((producer) => {
                const active = highlightedId === producer.id;
                return (
                  <Link
                    key={producer.id}
                    id={`producer-${producer.id}`}
                    href={`/producteurs/${producer.slug}`}
                    onMouseEnter={() => setHighlightedId(producer.id)}
                    onMouseLeave={() => setHighlightedId(null)}
                    onFocus={() => setHighlightedId(producer.id)}
                    className={cn(
                      "flex gap-3 rounded-2xl border bg-card p-3 transition",
                      active && "border-primary ring-2 ring-primary/30",
                    )}
                  >
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                      <Image src={producer.image} alt="" fill unoptimized className="object-cover" sizes="80px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="truncate font-heading text-lg leading-tight">{producer.name}</h2>
                        <span className="shrink-0 text-xs text-muted-foreground">{formatKm(distances[producer.id] ?? 0)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {producer.type} · {producer.town}
                      </p>
                      <div className="mt-1 flex items-center gap-1">
                        <Stars value={producer.rating} />
                        <span className="text-xs">{formatRating(producer.rating)}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {producer.labels.map((label) => (
                          <Badge key={label} variant="secondary">
                            {label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </section>

        <section className="space-y-3">
          <div>
            <h2 className="font-heading text-2xl text-earth">Produits de saison</h2>
            <p className="text-sm text-muted-foreground">Récoltés en ce moment chez les fermes affichées.</p>
          </div>
          {seasonal.length === 0 ? (
            <Card className="p-6 text-sm text-muted-foreground">Aucun produit de saison pour ces filtres.</Card>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {seasonal.map((product) => {
                const producer = producers.find((entry) => entry.id === product.producerId);
                return (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="relative h-28">
                      <Image src={product.image} alt="" fill unoptimized className="object-cover" sizes="200px" />
                    </div>
                    <div className="space-y-2 p-3">
                      <div>
                        <h3 className="leading-tight font-medium">{product.name}</h3>
                        <p className="truncate text-xs text-muted-foreground">{producer?.name}</p>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <Price amount={product.price} className="text-sm font-semibold" />
                        <Button
                          type="button"
                          size="icon"
                          className="size-10"
                          aria-label={`Ajouter ${product.name} au panier`}
                          onClick={() => addToCart(product, 1)}
                        >
                          <Plus />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
