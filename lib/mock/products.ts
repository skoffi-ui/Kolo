import type { Product, ProductCategory } from "@/lib/types";

const imageFor: Record<ProductCategory, string> = {
  légumes: "/images/products/legumes.svg",
  fruits: "/images/products/fruits.svg",
  œufs: "/images/products/oeufs.svg",
  miel: "/images/products/miel.svg",
  volaille: "/images/products/volaille.svg",
};

type Draft = Omit<Product, "image" | "active"> & { active?: boolean };

function item(draft: Draft): Product {
  return {
    ...draft,
    active: draft.active ?? true,
    image: imageFor[draft.category],
  };
}

export const products: Product[] = [
  item({ id: "koffi-tomates", producerId: "koffi", name: "Tomates cerises", description: "Récoltées le matin, encore fermes, pour les sauces et les salades.", price: 1500, unit: "barquette 250 g", stock: 18, season: "septembre – novembre", category: "légumes", inSeason: true, lotCode: "LOT-BNG-2609-014" }),
  item({ id: "koffi-gombo", producerId: "koffi", name: "Gombo", description: "Gombo tendre, cueilli avant qu’il ne fibre.", price: 800, unit: "kg", stock: 24, season: "toute l’année", category: "légumes", inSeason: true, lotCode: "LOT-BNG-2609-015" }),
  item({ id: "koffi-piment", producerId: "koffi", name: "Piment frais", description: "Piment antillais cultivé sans traitement, parfumé et vif.", price: 500, unit: "botte", stock: 30, season: "toute l’année", category: "légumes", inSeason: true, lotCode: "LOT-BNG-2609-016" }),
  item({ id: "koffi-aubergine", producerId: "koffi", name: "Aubergines africaines", description: "Petites aubergines violettes, chair dense pour la sauce graine.", price: 1000, unit: "kg", stock: 12, season: "août – décembre", category: "légumes", inSeason: true, lotCode: "LOT-BNG-2609-017" }),
  item({ id: "koffi-concombre", producerId: "koffi", name: "Concombre", description: "Concombre court, peau fine, à manger dans la journée.", price: 700, unit: "pièce", stock: 4, season: "septembre – décembre", category: "légumes", inSeason: true, lotCode: "LOT-BNG-2609-018" }),
  item({ id: "koffi-laitue", producerId: "koffi", name: "Laitue locale", description: "Laitue pommée sous ombrière, lavée à l’eau de puits.", price: 600, unit: "pièce", stock: 15, season: "saison sèche", category: "légumes", inSeason: true, lotCode: "LOT-BNG-2609-019" }),
  item({ id: "koffi-mangue", producerId: "koffi", name: "Mangue Kent", description: "Dernières mangues du verger voisin. Hors pic de saison.", price: 1200, unit: "kg", stock: 0, season: "avril – juillet", category: "fruits", inSeason: false, lotCode: "LOT-BNG-2606-003" }),
  item({ id: "koffi-basilic", producerId: "koffi", name: "Basilic", description: "Basilic large feuille, bottes liées le matin.", price: 400, unit: "botte", stock: 9, season: "toute l’année", category: "légumes", inSeason: true, lotCode: "LOT-BNG-2609-020" }),

  item({ id: "rucher-fleurs", producerId: "rucher", name: "Miel toutes fleurs", description: "Miellée d’acacia et de manguier, extrait à froid.", price: 6500, unit: "pot 500 g", stock: 20, season: "miellée d’août", category: "miel", inSeason: true, lotCode: "LOT-ANY-2608-004" }),
  item({ id: "rucher-mangrove", producerId: "rucher", name: "Miel de mangrove", description: "Miel sombre, notes salées, ruches proches des palétuviers.", price: 8000, unit: "pot 500 g", stock: 8, season: "miellée de juillet", category: "miel", inSeason: true, lotCode: "LOT-ANY-2607-011" }),
  item({ id: "rucher-rayon", producerId: "rucher", name: "Rayon de miel", description: "Portion de cadre operculé, à manger tel quel.", price: 4500, unit: "pièce", stock: 6, season: "miellée d’août", category: "miel", inSeason: true, lotCode: "LOT-ANY-2608-005" }),
  item({ id: "rucher-pollen", producerId: "rucher", name: "Pollen frais séché", description: "Pollen trié à la main, séché à l’ombre.", price: 3500, unit: "pot 150 g", stock: 11, season: "août – octobre", category: "miel", inSeason: true, lotCode: "LOT-ANY-2609-002" }),
  item({ id: "rucher-cire", producerId: "rucher", name: "Pain de cire", description: "Cire d’opercule fondue sans additif.", price: 2500, unit: "pain 200 g", stock: 7, season: "toute l’année", category: "miel", inSeason: true, lotCode: "LOT-ANY-2608-009" }),
  item({ id: "rucher-citron", producerId: "rucher", name: "Miel de citronnier", description: "Petite miellée claire, pots de 250 g.", price: 7000, unit: "pot 250 g", stock: 3, season: "juin – août", category: "miel", inSeason: true, lotCode: "LOT-ANY-2608-012" }),

  item({ id: "nda-poulet", producerId: "nda", name: "Poulet fermier entier", description: "Poulet de parcours, environ 1,5 kg, prêt à cuire.", price: 8500, unit: "pièce", stock: 10, season: "toute l’année", category: "volaille", inSeason: true, lotCode: "LOT-DAB-2609-021" }),
  item({ id: "nda-cuisses", producerId: "nda", name: "Cuisses de poulet", description: "Cuisses découpées le matin de la livraison.", price: 4500, unit: "kg", stock: 14, season: "toute l’année", category: "volaille", inSeason: true, lotCode: "LOT-DAB-2609-022" }),
  item({ id: "nda-oeufs", producerId: "nda", name: "Œufs fermiers", description: "Œufs ramassés la veille, coquille mate, jaune franc.", price: 2000, unit: "plateau de 12", stock: 22, season: "toute l’année", category: "œufs", inSeason: true, lotCode: "LOT-DAB-2609-023" }),
  item({ id: "nda-pintade-oeufs", producerId: "nda", name: "Œufs de pintade", description: "Œufs plus petits, coquille dure, goût marqué.", price: 3000, unit: "douzaine", stock: 5, season: "toute l’année", category: "œufs", inSeason: true, lotCode: "LOT-DAB-2609-024" }),
  item({ id: "nda-pintade", producerId: "nda", name: "Pintade entière", description: "Pintade de 4 mois, chair ferme pour les sauces longues.", price: 9000, unit: "pièce", stock: 4, season: "toute l’année", category: "volaille", inSeason: true, lotCode: "LOT-DAB-2609-025" }),
  item({ id: "nda-ailes", producerId: "nda", name: "Ailes de poulet", description: "Ailes pour le braisé, sans marinade industrielle.", price: 3500, unit: "kg", stock: 9, season: "toute l’année", category: "volaille", inSeason: true, lotCode: "LOT-DAB-2609-026" }),

  item({ id: "vergers-ananas", producerId: "vergers", name: "Ananas pain de sucre", description: "Ananas blanc, très parfumé, cueilli mûr.", price: 1000, unit: "pièce", stock: 30, season: "toute l’année", category: "fruits", inSeason: true, lotCode: "LOT-GBA-2609-031" }),
  item({ id: "vergers-papaye", producerId: "vergers", name: "Papaye solo", description: "Papaye à chair orange, juste à point.", price: 800, unit: "pièce", stock: 16, season: "août – novembre", category: "fruits", inSeason: true, lotCode: "LOT-GBA-2609-032" }),
  item({ id: "vergers-banane", producerId: "vergers", name: "Banane douce", description: "Main de bananes dessert, tachetée quand elle est mûre.", price: 1500, unit: "régime", stock: 11, season: "toute l’année", category: "fruits", inSeason: true, lotCode: "LOT-GBA-2609-033" }),
  item({ id: "vergers-corossol", producerId: "vergers", name: "Corossol", description: "Fruit entier, à ouvrir dans les deux jours.", price: 2000, unit: "pièce", stock: 6, season: "juillet – octobre", category: "fruits", inSeason: true, lotCode: "LOT-GBA-2609-034" }),
  item({ id: "vergers-citron", producerId: "vergers", name: "Citron vert", description: "Citrons juteux du verger, non cirés.", price: 500, unit: "kg", stock: 25, season: "toute l’année", category: "fruits", inSeason: true, lotCode: "LOT-GBA-2609-035" }),
  item({ id: "vergers-coco", producerId: "vergers", name: "Noix de coco", description: "Coco sèche pour le lait, ou verte sur demande.", price: 700, unit: "pièce", stock: 18, season: "toute l’année", category: "fruits", inSeason: true, lotCode: "LOT-GBA-2609-036" }),
  item({ id: "vergers-passion", producerId: "vergers", name: "Fruit de la passion", description: "Passiflore ridée, signe qu’elle est sucrée.", price: 2500, unit: "kg", stock: 3, season: "septembre – janvier", category: "fruits", inSeason: true, lotCode: "LOT-GBA-2609-037" }),

  item({ id: "lagune-manioc", producerId: "lagune", name: "Manioc frais", description: "Racines lavées, à transformer sous 48 heures.", price: 500, unit: "kg", stock: 40, season: "toute l’année", category: "légumes", inSeason: true, lotCode: "LOT-JAC-2609-041" }),
  item({ id: "lagune-igname", producerId: "lagune", name: "Igname", description: "Igname bêtê-bêtê, chair ferme.", price: 800, unit: "kg", stock: 20, season: "août – janvier", category: "légumes", inSeason: true, lotCode: "LOT-JAC-2609-042" }),
  item({ id: "lagune-feuilles", producerId: "lagune", name: "Feuilles de patate", description: "Jeunes feuilles pour la sauce feuille, bottes humides.", price: 400, unit: "botte", stock: 15, season: "saison des pluies", category: "légumes", inSeason: true, lotCode: "LOT-JAC-2609-043" }),
  item({ id: "lagune-piment", producerId: "lagune", name: "Piment vert", description: "Piment doux-vert, moins brûlant que le piment oiseau.", price: 600, unit: "kg", stock: 12, season: "toute l’année", category: "légumes", inSeason: true, lotCode: "LOT-JAC-2609-044" }),
  item({ id: "lagune-tomate", producerId: "lagune", name: "Tomate", description: "Tomate ronde de plein champ.", price: 1200, unit: "kg", stock: 8, season: "septembre – décembre", category: "légumes", inSeason: true, lotCode: "LOT-JAC-2609-045" }),
  item({ id: "lagune-oignon", producerId: "lagune", name: "Oignon local", description: "Petits oignons violets, fin de planche.", price: 900, unit: "kg", stock: 2, season: "août – octobre", category: "légumes", inSeason: true, lotCode: "LOT-JAC-2609-046" }),
  item({ id: "lagune-pasteque", producerId: "lagune", name: "Pastèque", description: "Pastèque de berge, environ 3 kg.", price: 1500, unit: "pièce", stock: 7, season: "septembre – novembre", category: "fruits", inSeason: true, lotCode: "LOT-JAC-2609-047" }),

  item({ id: "songon-chou", producerId: "songon", name: "Chou pommé", description: "Chou serré cultivé sous ombrière.", price: 700, unit: "pièce", stock: 14, season: "juillet – octobre", category: "légumes", inSeason: true, lotCode: "LOT-SNG-2609-051" }),
  item({ id: "songon-carotte", producerId: "songon", name: "Carottes", description: "Carottes courtes et sucrées, fanes encore vertes.", price: 1000, unit: "botte", stock: 10, season: "août – novembre", category: "légumes", inSeason: true, lotCode: "LOT-SNG-2609-052" }),
  item({ id: "songon-betterave", producerId: "songon", name: "Betteraves", description: "Betteraves rouges, à cuire ou râper.", price: 800, unit: "botte", stock: 6, season: "août – novembre", category: "légumes", inSeason: true, lotCode: "LOT-SNG-2609-053" }),
  item({ id: "songon-epinard", producerId: "songon", name: "Épinard local", description: "Feuilles tendres, sans sable.", price: 500, unit: "botte", stock: 18, season: "saison des pluies", category: "légumes", inSeason: true, lotCode: "LOT-SNG-2609-054" }),
  item({ id: "songon-poivron", producerId: "songon", name: "Poivron", description: "Poivrons verts et rouges de la même planche.", price: 1500, unit: "kg", stock: 5, season: "septembre – décembre", category: "légumes", inSeason: true, lotCode: "LOT-SNG-2609-055" }),
  item({ id: "songon-courgette", producerId: "songon", name: "Courgette", description: "Courgettes cueillies petites, moins de graines.", price: 900, unit: "kg", stock: 9, season: "septembre – décembre", category: "légumes", inSeason: true, lotCode: "LOT-SNG-2609-056" }),
  item({ id: "songon-oeufs", producerId: "songon", name: "Œufs du jardin", description: "Œufs de la basse-cour, ramassés le samedi.", price: 1800, unit: "douzaine", stock: 13, season: "toute l’année", category: "œufs", inSeason: true, lotCode: "LOT-SNG-2609-057" }),

  item({ id: "ake-hevea", producerId: "ake", name: "Miel d’hévéa", description: "Miel clair de la miellée d’hévéa, floral et léger.", price: 6000, unit: "pot 500 g", stock: 16, season: "février – avril", category: "miel", inSeason: true, lotCode: "LOT-ALP-2603-008" }),
  item({ id: "ake-foret", producerId: "ake", name: "Miel de forêt", description: "Miel sombre de lisière, notes boisées.", price: 7500, unit: "pot 500 g", stock: 9, season: "juillet – septembre", category: "miel", inSeason: true, lotCode: "LOT-ALP-2608-014" }),
  item({ id: "ake-cacao", producerId: "ake", name: "Miel et cacao", description: "Miel de forêt mêlé à du cacao broyé d’Alépé.", price: 8500, unit: "pot 350 g", stock: 7, season: "toute l’année", category: "miel", inSeason: true, lotCode: "LOT-ALP-2609-003" }),
  item({ id: "ake-propolis", producerId: "ake", name: "Propolis", description: "Propolis brute en paillettes, flacon en verre.", price: 4000, unit: "flacon 30 g", stock: 5, season: "toute l’année", category: "miel", inSeason: true, lotCode: "LOT-ALP-2609-004" }),
  item({ id: "ake-hydromel", producerId: "ake", name: "Hydromel artisanal", description: "Fermentation courte, bouteille de 50 cl, sans sulfite ajouté.", price: 5000, unit: "bouteille 50 cl", stock: 8, season: "toute l’année", category: "miel", inSeason: true, lotCode: "LOT-ALP-2609-005" }),
  item({ id: "ake-bougie", producerId: "ake", name: "Bougie à la cire", description: "Bougie coulée dans la cire d’opercule du rucher.", price: 2000, unit: "pièce", stock: 12, season: "toute l’année", category: "miel", inSeason: true, lotCode: "LOT-ALP-2609-006" }),

  item({ id: "ahoua-bicyclette", producerId: "ahoua", name: "Poulet bicyclette", description: "Poulet de cour, chair ferme, environ 1,2 kg.", price: 7000, unit: "pièce", stock: 8, season: "toute l’année", category: "volaille", inSeason: true, lotCode: "LOT-BON-2609-061" }),
  item({ id: "ahoua-oeufs", producerId: "ahoua", name: "Œufs plein air", description: "Œufs de poules sous bananiers.", price: 2200, unit: "plateau de 15", stock: 11, season: "toute l’année", category: "œufs", inSeason: true, lotCode: "LOT-BON-2609-062" }),
  item({ id: "ahoua-canard", producerId: "ahoua", name: "Canard fermier", description: "Canard de 6 mois, prêt à cuire.", price: 12000, unit: "pièce", stock: 3, season: "toute l’année", category: "volaille", inSeason: true, lotCode: "LOT-BON-2609-063" }),
  item({ id: "ahoua-cane", producerId: "ahoua", name: "Œufs de cane", description: "Œufs plus gros, parfaits en pâtisserie.", price: 3500, unit: "douzaine", stock: 4, season: "toute l’année", category: "œufs", inSeason: true, lotCode: "LOT-BON-2609-064" }),
  item({ id: "ahoua-abats", producerId: "ahoua", name: "Abats de volaille", description: "Foies et gésiers du jour, à cuisiner vite.", price: 2500, unit: "kg", stock: 6, season: "toute l’année", category: "volaille", inSeason: true, lotCode: "LOT-BON-2609-065" }),
  item({ id: "ahoua-plantain", producerId: "ahoua", name: "Plantain mûr", description: "Plantains jaunes pour l’alloco ou le foutou.", price: 1000, unit: "kg", stock: 20, season: "toute l’année", category: "fruits", inSeason: true, lotCode: "LOT-BON-2609-066" }),
  item({ id: "ahoua-piment", producerId: "ahoua", name: "Piment oiseau", description: "Piment séché à l’ombre, très concentré.", price: 1500, unit: "kg", stock: 5, season: "toute l’année", category: "légumes", inSeason: true, lotCode: "LOT-BON-2609-067" }),
];

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByProducer(producerId: string): Product[] {
  return products.filter((product) => product.producerId === producerId);
}
