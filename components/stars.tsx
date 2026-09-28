import { Star } from "lucide-react";
import { cn } from "cn";

export function Stars({ value, className }: { value: number; className?: string }) {
  const rounded = Math.round(value);
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${value} sur 5`}>
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < rounded;
        return (
          <Star
            key={index}
            className={cn("size-3.5", filled ? "fill-clay text-clay" : "text-border")}
            aria-hidden
          />
        );
      })}
    </span>
  );
}
