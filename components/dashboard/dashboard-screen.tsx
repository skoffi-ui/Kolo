"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CATEGORIES, ORDER_STATUSES } from "@/lib/constants";
import { producers } from "@/lib/mock/producers";
import { revenueSeries, seedFromId } from "@/lib/mock/revenue";
import { categoryImage, useSessionStore } from "@/lib/store/session";
import type { ProductCategory } from "@/lib/types";
import { formatDate, formatRating } from "@/lib/utils/format";
import { LotQrButton } from "@/components/lot-qr";
import { Price } from "@/components/price";
import { SiteHeader } from "@/components/site-header";
import { Stars } from "@/components/stars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const RevenueChart = dynamic(() => import("@/components/dashboard/revenue-chart"), {
  ssr: false,
  loading: () => <Skeleton className="h-64 w-full" />,
});

const emptyForm = {
  name: "",
  category: "légumes" as ProductCategory,
  price: "",
  unit: "kg",
  stock: "",
  season: "toute l’année",
  description: "",
  inSeason: true,
};

export function DashboardScreen() {
  const [producerId, setProducerId] = useState(producers[0].id);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [lotProductId, setLotProductId] = useState<string>("");
  const orders = useSessionStore((state) => state.orders);
  const products = useSessionStore((state) => state.products);
  const setOrderStatus = useSessionStore((state) => state.setOrderStatus);
  const setStock = useSessionStore((state) => state.setStock);
  const setActive = useSessionStore((state) => state.setActive);
  const addProduct = useSessionStore((state) => state.addProduct);

  const producer = producers.find((entry) => entry.id === producerId) ?? producers[0];
  const series = useMemo(() => revenueSeries(seedFromId(producer.id)), [producer.id]);
  const monthlyRevenue = series.reduce((sum, point) => sum + point.revenue, 0);
  const monthlyOrders = series.reduce((sum, point) => sum + point.orders, 0);
  const averageBasket = monthlyOrders === 0 ? 0 : Math.round(monthlyRevenue / monthlyOrders);
  const recent = orders.filter((order) => order.producerId === producer.id);
  const mine = products.filter((product) => product.producerId === producer.id);
  const lotProduct = mine.find((product) => product.id === lotProductId) ?? mine[0];

  const submitProduct = () => {
    const price = Math.round(Number(form.price));
    const stock = Math.round(Number(form.stock));
    if (!form.name.trim() || !Number.isFinite(price) || price <= 0 || !Number.isFinite(stock) || stock < 0) {
      toast.error("Indiquez un nom, un prix entier et un stock.");
      return;
    }
    const id = `local-${Date.now()}`;
    addProduct({
      id,
      producerId: producer.id,
      name: form.name.trim(),
      description: form.description.trim() || "Ajouté depuis le tableau de bord, sans photo.",
      price,
      unit: form.unit.trim() || "pièce",
      stock,
      season: form.season.trim() || "toute l’année",
      category: form.category,
      inSeason: form.inSeason,
      image: categoryImage(form.category),
      active: true,
      lotCode: `LOT-${producer.id.slice(0, 3).toUpperCase()}-${String(Date.now()).slice(-6)}`,
    });
    setForm(emptyForm);
    setOpen(false);
    toast.success("Produit ajouté à la liste locale");
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl space-y-5 px-4 pt-4 pb-28">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Espace producteur · données locales</p>
            <h1 className="font-heading text-3xl text-earth">Tableau de bord</h1>
          </div>
          <div className="space-y-1.5 sm:w-64">
            <Label>Exploitation</Label>
            <Select value={producer.id} onValueChange={setProducerId}>
              <SelectTrigger className="h-11 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {producers.map((entry) => (
                  <SelectItem key={entry.id} value={entry.id}>
                    {entry.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="indicateurs">
          <TabsList className="h-auto w-full flex-wrap">
            <TabsTrigger value="indicateurs" className="h-10 flex-1">
              Indicateurs
            </TabsTrigger>
            <TabsTrigger value="produits" className="h-10 flex-1">
              Produits
            </TabsTrigger>
            <TabsTrigger value="qr" className="h-10 flex-1">
              QR de lot
            </TabsTrigger>
          </TabsList>

          <TabsContent value="indicateurs" className="space-y-4">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Card className="p-4">
                <p className="text-xs text-muted-foreground">Recettes · 30 jours</p>
                <p className="mt-1 text-lg font-semibold">
                  <Price amount={monthlyRevenue} />
                </p>
              </Card>
              <Card className="p-4">
                <p className="text-xs text-muted-foreground">Commandes</p>
                <p className="mt-1 text-lg font-semibold">{monthlyOrders}</p>
              </Card>
              <Card className="p-4">
                <p className="text-xs text-muted-foreground">Panier moyen</p>
                <p className="mt-1 text-lg font-semibold">
                  <Price amount={averageBasket} />
                </p>
              </Card>
              <Card className="p-4">
                <p className="text-xs text-muted-foreground">Note</p>
                <p className="mt-1 flex items-center gap-2 text-lg font-semibold">
                  {formatRating(producer.rating)}
                  <Stars value={producer.rating} />
                </p>
              </Card>
            </div>

            <Card className="p-4">
              <h2 className="mb-2 font-heading text-xl">Recettes des 30 derniers jours</h2>
              <RevenueChart data={series} />
            </Card>

            <Card className="p-4">
              <h2 className="mb-3 font-heading text-xl">Commandes récentes</h2>
              {recent.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucune commande pour cette ferme.</p>
              ) : (
                <ScrollArea className="w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>N°</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recent.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-xs">{order.number}</TableCell>
                          <TableCell>{order.customerName}</TableCell>
                          <TableCell>{formatDate(order.createdAt)}</TableCell>
                          <TableCell>
                            <Price amount={order.total} />
                          </TableCell>
                          <TableCell>
                            <Select
                              value={order.status}
                              onValueChange={(value) =>
                                setOrderStatus(order.id, value as (typeof ORDER_STATUSES)[number]["id"])
                              }
                            >
                              <SelectTrigger className="h-10 w-[160px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {ORDER_STATUSES.map((status) => (
                                  <SelectItem key={status.id} value={status.id}>
                                    {status.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="produits" className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-heading text-xl">Produits de {producer.name}</h2>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button type="button" className="h-11">
                    Ajouter un produit
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Nouveau produit</DialogTitle>
                    <DialogDescription>Aucun fichier n’est envoyé. Une illustration de catégorie est utilisée.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="product-name">Nom</Label>
                      <Input id="product-name" value={form.name} className="h-11" onChange={(event) => setForm({ ...form, name: event.target.value })} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Catégorie</Label>
                      <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value as ProductCategory })}>
                        <SelectTrigger className="h-11 w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="product-price">Prix (FCFA)</Label>
                        <Input id="product-price" inputMode="numeric" value={form.price} className="h-11" onChange={(event) => setForm({ ...form, price: event.target.value })} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="product-stock">Stock</Label>
                        <Input id="product-stock" inputMode="numeric" value={form.stock} className="h-11" onChange={(event) => setForm({ ...form, stock: event.target.value })} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="product-unit">Unité</Label>
                        <Input id="product-unit" value={form.unit} className="h-11" onChange={(event) => setForm({ ...form, unit: event.target.value })} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="product-season">Saison</Label>
                        <Input id="product-season" value={form.season} className="h-11" onChange={(event) => setForm({ ...form, season: event.target.value })} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="product-description">Description</Label>
                      <Textarea id="product-description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
                    </div>
                    <Label className="flex items-center gap-3">
                      <Checkbox checked={form.inSeason} onCheckedChange={(value) => setForm({ ...form, inSeason: value === true })} />
                      Produit de saison
                    </Label>
                  </div>
                  <DialogFooter>
                    <Button type="button" className="h-11" onClick={submitProduct}>
                      Enregistrer
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-2">
              {mine.map((product) => (
                <Card key={product.id} className="grid gap-3 p-3 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{product.name}</p>
                      {!product.active ? <Badge variant="outline">Masqué</Badge> : null}
                      {product.stock > 0 && product.stock <= 5 ? (
                        <Badge className="bg-clay text-white">Stock faible</Badge>
                      ) : null}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <Price amount={product.price} /> · {product.unit}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`stock-${product.id}`} className="text-xs">
                      Stock
                    </Label>
                    <Input
                      id={`stock-${product.id}`}
                      inputMode="numeric"
                      className="h-11 w-20"
                      value={String(product.stock)}
                      onChange={(event) => {
                        const next = Number(event.target.value);
                        if (Number.isFinite(next)) setStock(product.id, Math.round(next));
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={product.active}
                      onCheckedChange={(value) => setActive(product.id, value)}
                      aria-label={`Mettre ${product.name} en vente`}
                    />
                    <span className="text-sm">{product.active ? "En vente" : "Inactif"}</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="qr" className="space-y-4">
            <Card className="space-y-4 p-4">
              <div>
                <h2 className="font-heading text-xl">Générer un QR de lot</h2>
                <p className="text-sm text-muted-foreground">
                  Le même composant que sur la fiche producteur. Le lien reste une adresse de démonstration.
                </p>
              </div>
              {lotProduct ? (
                <>
                  <div className="space-y-1.5">
                    <Label>Produit</Label>
                    <Select value={lotProduct.id} onValueChange={setLotProductId}>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {mine.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name} · {product.lotCode}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <LotQrButton code={lotProduct.lotCode} />
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Ajoutez un produit pour générer un lot.</p>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
