"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { cn } from "cn";
import { useCartCount, useCartStore } from "@/lib/store/cart";

const links = [
  { href: "/", label: "Accueil", icon: House },
  { href: "/panier", label: "Panier", icon: ShoppingBasket },
  { href: "/dashboard", label: "Producteur", icon: LayoutDashboard },
];

export function BottomNav() {
  const pathname = usePathname();
  const count = useCartCount();
  const hydrated = useCartStore((state) => state.hasHydrated);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur md:hidden">
      <ul className="mx-auto grid max-w-lg grid-cols-3">
        {links.map((link) => {
          const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "relative flex flex-col items-center gap-1 py-2 text-xs",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="size-5" />
                {link.label}
                {link.href === "/panier" && hydrated && count > 0 ? (
                  <span className="absolute top-1 right-[30%] grid min-w-4 place-items-center rounded-full bg-clay px-1 text-[10px] font-bold text-white">
                    {count > 99 ? "99+" : count}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
