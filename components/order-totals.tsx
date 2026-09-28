import type { CartItem } from "@/lib/types";
import { deliveryFee, discountFor, producerCount, subtotalOf, totalOf, FREE_DELIVERY_FROM } from "@/lib/pricing";
import { Price } from "@/components/price";
import { Separator } from "@/components/ui/separator";

export function quoteCart(items: CartItem[], promo: string | null) {
  const subtotal = subtotalOf(items);
  const discount = discountFor(promo, subtotal).amount;
  const delivery = deliveryFee(subtotal, producerCount(items));
  const total = totalOf(subtotal, discount, delivery);
  return { subtotal, discount, delivery, total, producers: producerCount(items) };
}

export function OrderTotals({
  items,
  promo,
}: {
  items: CartItem[];
  promo: string | null;
}) {
  const quote = quoteCart(items, promo);
  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Sous-total</span>
        <Price amount={quote.subtotal} />
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Livraison
          {quote.producers > 1 ? ` · ${quote.producers} fermes` : ""}
        </span>
        {quote.delivery === 0 ? (
          <span className="font-medium text-primary">Offerte</span>
        ) : (
          <Price amount={quote.delivery} />
        )}
      </div>
      {quote.discount > 0 ? (
        <div className="flex justify-between text-primary">
          <span>Code {promo}</span>
          <span>
            −<Price amount={quote.discount} />
          </span>
        </div>
      ) : null}
      <Separator />
      <div className="flex justify-between text-base font-semibold">
        <span>Total</span>
        <Price amount={quote.total} />
      </div>
      {quote.subtotal > 0 && quote.subtotal < FREE_DELIVERY_FROM ? (
        <p className="text-xs text-muted-foreground">
          Livraison offerte dès <Price amount={FREE_DELIVERY_FROM} />.
        </p>
      ) : null}
    </div>
  );
}
