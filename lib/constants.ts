import type { DeliveryPlace, OrderStatus, ProductCategory } from "@/lib/types";

export const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: "légumes", label: "Légumes" },
  { id: "fruits", label: "Fruits" },
  { id: "œufs", label: "Œufs" },
  { id: "miel", label: "Miel" },
  { id: "volaille", label: "Volaille" },
];

export const ORDER_STATUSES: { id: OrderStatus; label: string }[] = [
  { id: "nouvelle", label: "Nouvelle" },
  { id: "en préparation", label: "En préparation" },
  { id: "prête", label: "Prête" },
  { id: "livrée", label: "Livrée" },
];

export const DELIVERY_PLACES: DeliveryPlace[] = [
  {
    id: "cocody",
    label: "Cocody",
    detail: "Riviera Palmeraie, Abidjan",
    lat: 5.3595,
    lng: -3.9869,
  },
  {
    id: "plateau",
    label: "Plateau",
    detail: "Centre-ville, Abidjan",
    lat: 5.3225,
    lng: -4.0166,
  },
  {
    id: "yopougon",
    label: "Yopougon",
    detail: "Sideci, Abidjan",
    lat: 5.3364,
    lng: -4.0895,
  },
  {
    id: "marcory",
    label: "Marcory",
    detail: "Zone 4, Abidjan",
    lat: 5.301,
    lng: -3.986,
  },
  {
    id: "abobo",
    label: "Abobo",
    detail: "Abobo Gare, Abidjan",
    lat: 5.4164,
    lng: -4.0165,
  },
];

export const DELIVERY_SLOTS = [
  { id: "mardi-matin", label: "Mardi 29 sept.", detail: "8h – 11h" },
  { id: "mardi-soir", label: "Mardi 29 sept.", detail: "15h – 18h" },
  { id: "samedi", label: "Samedi 3 oct.", detail: "9h – 12h" },
];

export const PAYMENT_METHODS = [
  { id: "orange", label: "Orange Money", detail: "Paiement simulé sur votre numéro" },
  { id: "mtn", label: "MTN MoMo", detail: "Paiement simulé sur votre numéro" },
  { id: "wave", label: "Wave", detail: "Paiement simulé sur votre numéro" },
  { id: "cod", label: "Paiement à la livraison", detail: "Espèces ou mobile money au livreur" },
];

export const CONSUMER_TRACK = [
  "Commande reçue",
  "En préparation",
  "Prête",
  "Livrée",
];

export function lotUrl(code: string): string {
  return `https://kolo.ci/lots/${code}`;
}
