import { cn } from "cn";
import { formatFCFA } from "@/lib/utils/format";

export function Price({
  amount,
  className,
}: {
  amount: number;
  className?: string;
}) {
  return (
    <span suppressHydrationWarning className={cn("tabular-nums", className)}>
      {formatFCFA(amount)}
    </span>
  );
}
