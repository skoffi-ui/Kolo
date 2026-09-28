import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-start justify-center gap-4 px-6 pb-24">
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="font-heading text-4xl text-earth">Cette page n’existe pas</h1>
      <p className="text-muted-foreground">
        Le producteur ou la page demandée est introuvable dans cette maquette.
      </p>
      <Button asChild className="h-11 px-4">
        <Link href="/">Retour à l’accueil</Link>
      </Button>
    </main>
  );
}
