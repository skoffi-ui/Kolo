"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MapPin, Menu, Search, ShoppingBasket } from "lucide-react";
import { DELIVERY_PLACES } from "@/lib/constants";
import { useCartCount, useCartStore } from "@/lib/store/cart";
import { useSessionStore } from "@/lib/store/session";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "cn";

export function SiteHeader({
  query,
  onQueryChange,
}: {
  query?: string;
  onQueryChange?: (value: string) => void;
}) {
  const placeId = useSessionStore((state) => state.placeId);
  const setPlaceId = useSessionStore((state) => state.setPlaceId);
  const place = DELIVERY_PLACES.find((entry) => entry.id === placeId) ?? DELIVERY_PLACES[0];
  const count = useCartCount();
  const hydrated = useCartStore((state) => state.hasHydrated);
  const [pulse, setPulse] = useState(0);
  const previous = useRef(count);
  const ready = useRef(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!ready.current) {
      ready.current = true;
      previous.current = count;
      return;
    }
    if (count > previous.current) setPulse((value) => value + 1);
    previous.current = count;
  }, [count, hydrated]);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            K
          </span>
          <span className="font-heading text-2xl leading-none text-primary">Kolo</span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="h-11 max-w-[46vw] gap-1.5 px-3 sm:max-w-none">
              <MapPin className="size-4 shrink-0 text-clay" />
              <span className="truncate text-left">
                <span className="block text-xs leading-tight text-muted-foreground">Livrer à</span>
                <span className="block text-sm leading-tight font-medium">{place.label}</span>
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[85vh] rounded-t-2xl">
            <SheetHeader>
              <SheetTitle>Adresse de livraison</SheetTitle>
              <SheetDescription>
                Choisissez un quartier d’Abidjan. Les distances des producteurs sont recalculées.
              </SheetDescription>
            </SheetHeader>
            <RadioGroup value={placeId} onValueChange={setPlaceId} className="px-4 pb-6">
              {DELIVERY_PLACES.map((entry) => (
                <Label
                  key={entry.id}
                  className="flex items-start gap-3 rounded-xl border p-3 has-data-checked:border-primary has-data-checked:bg-accent"
                >
                  <RadioGroupItem value={entry.id} className="mt-1" />
                  <span>
                    <span className="block font-medium">{entry.label}</span>
                    <span className="block text-sm text-muted-foreground">{entry.detail}</span>
                  </span>
                </Label>
              ))}
            </RadioGroup>
          </SheetContent>
        </Sheet>

        <div className="ml-auto flex items-center gap-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-11" aria-label="Menu">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>Navigation</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/">Accueil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/panier">Panier</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/commande">Commande</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Espace producteur</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild variant="outline" size="icon" className="relative size-11">
            <Link href="/panier" aria-label={hydrated ? `Panier, ${count} articles` : "Panier"}>
              <ShoppingBasket />
              {hydrated && count > 0 ? (
                <span
                  key={pulse}
                  className={cn(
                    "absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full bg-clay px-1 text-[11px] font-bold text-white",
                    pulse > 0 && "kolo-pop",
                  )}
                >
                  {count > 99 ? "99+" : count}
                </span>
              ) : null}
            </Link>
          </Button>
        </div>
      </div>

      {onQueryChange ? (
        <div className="mx-auto max-w-6xl px-4 pb-3">
          <Label htmlFor="search" className="sr-only">
            Rechercher un produit ou un producteur
          </Label>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search"
              value={query ?? ""}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Tomates, miel, Bingerville…"
              className="h-11 pl-9"
            />
          </div>
        </div>
      ) : null}
    </header>
  );
}
