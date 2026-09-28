"use client";

import { QRCodeSVG } from "qrcode.react";
import { lotUrl } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function LotQr({
  code,
  size = 148,
  enlarge = true,
}: {
  code: string;
  size?: number;
  enlarge?: boolean;
}) {
  const url = lotUrl(code);
  const preview = (
    <QRCodeSVG value={url} size={size} level="M" includeMargin bgColor="#ffffff" fgColor="#2c3a2e" />
  );

  if (!enlarge) return preview;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="rounded-xl border bg-white p-2 transition hover:border-primary"
          aria-label={`Agrandir le QR du lot ${code}`}
        >
          {preview}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Lot {code}</DialogTitle>
          <DialogDescription>
            Lien fictif de traçabilité. Aucun service n’est branché derrière cette adresse.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center rounded-xl bg-white p-4">
          <QRCodeSVG value={url} size={260} level="M" includeMargin bgColor="#ffffff" fgColor="#2c3a2e" />
        </div>
        <p className="text-center font-mono text-xs break-all text-muted-foreground">{url}</p>
      </DialogContent>
    </Dialog>
  );
}

export function LotQrButton({ code }: { code: string }) {
  const url = lotUrl(code);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="h-11 px-4">
          Générer un QR de lot
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR du lot {code}</DialogTitle>
          <DialogDescription>À coller sur le cageot ou le pot. Lien de démonstration.</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center rounded-xl bg-white p-4">
          <QRCodeSVG value={url} size={260} level="M" includeMargin bgColor="#ffffff" fgColor="#2c3a2e" />
        </div>
        <p className="text-center font-mono text-xs break-all text-muted-foreground">{url}</p>
      </DialogContent>
    </Dialog>
  );
}
