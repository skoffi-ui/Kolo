import { Suspense } from "react";
import { CheckoutScreen } from "@/components/checkout/checkout-screen";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Commande",
};

export default function Page() {
  return (
    <Suspense fallback={<Skeleton className="mx-auto mt-8 h-40 max-w-lg" />}>
      <CheckoutScreen />
    </Suspense>
  );
}
