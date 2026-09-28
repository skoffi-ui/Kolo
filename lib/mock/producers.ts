import type { Producer, Review } from "@/lib/types";

const producersSeed: Omit<Producer, "rating" | "reviewCount">[] = [
  {
    id: "koffi",
    slug: "maraichage-koffi",
    name: "Maraîchage Koffi",
    type: "maraîcher",
    town: "Bingerville",
    location: "Bingerville, route de la Comoé",
    lat: 5.3556,
    lng: -3.8953,
    labels: ["bio", "sans pesticides"],
    followers: 1280,
    image: "/images/producers/bingerville.svg",
    story:
      "Depuis 2014, Amoin et Yao Koffi cultivent trois hectares en bordure de la Comoé. Les planches tournent au rythme des pluies : gombo, piment, aubergines et laitues arrosés à l’eau de puits. Rien ne quitte le champ sans avoir été récolté le matin même.",
  },
  {
    id: "rucher",
    slug: "rucher-des-collines",
    name: "Rucher des Collines",
    type: "apiculteur",
    town: "Anyama",
    location: "Anyama, collines d’Attinguié",
    lat: 5.4947,
    lng: -4.0517,
    labels: ["bio"],
    followers: 860,
    image: "/images/producers/anyama.svg",
    story:
      "Le rucher d’Adjoua Bamba compte quarante ruches posées entre manguiers et acacias. Le miel est extrait à froid, mis en pot le jour même, et chaque lot porte la date de la miellée. Les abeilles butinent sans traitement chimique alentour.",
  },
  {
    id: "nda",
    slug: "poulailler-nda",
    name: "Poulailler N’Da",
    type: "éleveur",
    town: "Dabou",
    location: "Dabou, quartier Agnéby",
    lat: 5.3256,
    lng: -4.3767,
    labels: ["sans pesticides"],
    followers: 640,
    image: "/images/producers/dabou.svg",
    story:
      "Konan N’Da élève poulets et pintades en parcours herbeux, nourris au maïs et aux restes de manioc du voisinage. Les œufs sont ramassés deux fois par jour. La volaille part à Abidjan dans des cageots aérés, jamais congelée.",
  },
  {
    id: "vergers",
    slug: "vergers-du-littoral",
    name: "Vergers du Littoral",
    type: "arboriculteur",
    town: "Grand-Bassam",
    location: "Grand-Bassam, entre lagune et océan",
    lat: 5.2111,
    lng: -3.7383,
    labels: ["bio", "sans pesticides"],
    followers: 1540,
    image: "/images/producers/bassam.svg",
    story:
      "La famille Assi entretient un verger de deux hectares derrière le phare : ananas pain de sucre, papayes, citronniers et cocotiers. Les fruits sont cueillis à maturité, pas en chambre froide. La parcelle est certifiée sans pesticide depuis 2019.",
  },
  {
    id: "lagune",
    slug: "lagune-verte",
    name: "Lagune verte",
    type: "maraîcher",
    town: "Jacqueville",
    location: "Jacqueville, berge de la lagune Ébrié",
    lat: 5.2053,
    lng: -4.4175,
    labels: ["sans pesticides"],
    followers: 410,
    image: "/images/producers/jacqueville.svg",
    story:
      "Sur une langue de sable entre lagune et océan, Essis cultive manioc, igname et feuilles. Le sol sableux donne des racines douces. Il livre deux fois par semaine, tôt, avant que la chaleur ne fane les bottes.",
  },
  {
    id: "songon",
    slug: "jardin-de-songon",
    name: "Jardin de Songon",
    type: "maraîcher",
    town: "Songon",
    location: "Songon, axe de l’autoroute du Nord",
    lat: 5.3178,
    lng: -4.255,
    labels: ["bio"],
    followers: 990,
    image: "/images/producers/songon.svg",
    story:
      "Mariam Coulibaly a repris le jardin familial en 2018 et l’a converti au compost et aux purins de neem. Choux, carottes et épinards poussent sous ombrière. Une basse-cour fournit les œufs du samedi.",
  },
  {
    id: "ake",
    slug: "miellerie-ake",
    name: "Miellerie Aké",
    type: "apiculteur",
    town: "Alépé",
    location: "Alépé, lisière de forêt",
    lat: 5.5,
    lng: -3.6639,
    labels: ["bio"],
    followers: 720,
    image: "/images/producers/alepe.svg",
    story:
      "Les ruches d’Aké sont posées en lisière de forêt, loin des plantations traitées. Le miel d’hévéa et le miel de forêt sont séparés par miellée. La cire sert aux bougies vendues avec les pots.",
  },
  {
    id: "ahoua",
    slug: "ferme-ahoua",
    name: "Ferme Ahoua",
    type: "éleveur",
    town: "Bonoua",
    location: "Bonoua, piste de Yaou",
    lat: 5.2722,
    lng: -3.5958,
    labels: ["sans pesticides"],
    followers: 530,
    image: "/images/producers/bonoua.svg",
    story:
      "Ahoua élève poulets bicyclettes et canards sur un hectare planté de bananiers plantains. Les volailles picorent les écarts de fruit. Le piment oiseau, spécialité du coin, sèche à l’ombre de la cour.",
  },
];

export const reviews: Review[] = [
  { id: "r1", producerId: "koffi", author: "Awa Koné", rating: 5, date: "2026-09-18", comment: "Les tomates cerises étaient encore tièdes du soleil. J’ai cuisiné le gombo le soir même, sans un fruit abîmé." },
  { id: "r2", producerId: "koffi", author: "Yao N’Guessan", rating: 5, date: "2026-09-02", comment: "On sent que c’est cueilli le matin. La laitue a tenu trois jours au frigo, ce qui est rare à Abidjan." },
  { id: "r3", producerId: "koffi", author: "Fatou Bamba", rating: 4, date: "2026-08-21", comment: "Très bon piment, un peu plus petit que la photo. Le producteur a expliqué le lot par message, c’est rassurant." },
  { id: "r4", producerId: "koffi", author: "Serge Aké", rating: 5, date: "2026-08-11", comment: "Je commande chaque semaine pour la maison. Le circuit est vraiment court : Bingerville le matin, Cocody à midi." },
  { id: "r5", producerId: "koffi", author: "Inès Traoré", rating: 5, date: "2026-07-28", comment: "Aubergines fermes, goût franc. Enfin des légumes sans cette odeur de chambre froide." },
  { id: "r6", producerId: "rucher", author: "Mariam Diallo", rating: 5, date: "2026-09-14", comment: "Le miel de mangrove est sombre et long en bouche. Le pot était cacheté, lot lisible sous le couvercle." },
  { id: "r7", producerId: "rucher", author: "Ibrahim Touré", rating: 5, date: "2026-08-30", comment: "Rien à voir avec le miel fluide des supermarchés. Il cristallise, preuve qu’il n’a pas été chauffé." },
  { id: "r8", producerId: "rucher", author: "Akissi Brou", rating: 5, date: "2026-08-16", comment: "J’ai offert un pot à ma mère à Anyama, elle a reconnu les fleurs du coin. Beau travail." },
  { id: "r9", producerId: "rucher", author: "Landry Kouassi", rating: 4, date: "2026-07-19", comment: "Excellent pollen, livraison un peu en retard à cause de la pluie. Le producteur a prévenu, ça se respecte." },
  { id: "r10", producerId: "rucher", author: "Bintou Cissé", rating: 5, date: "2026-07-02", comment: "Le rayon de miel est spectaculaire. Les enfants ont compris d’où vient le pot." },
  { id: "r11", producerId: "nda", author: "Jean-Baptiste Assi", rating: 5, date: "2026-09-20", comment: "Poulet fermier avec une vraie chair, pas ces blancs gonflés d’eau. Les œufs ont le jaune orange." },
  { id: "r12", producerId: "nda", author: "Adjoua Koffi", rating: 4, date: "2026-09-05", comment: "Pintade goûteuse. Il faut la cuire plus longtemps, le producteur l’avait indiqué sur le sac." },
  { id: "r13", producerId: "nda", author: "Moussa Fofana", rating: 5, date: "2026-08-22", comment: "Plateau d’œufs intact, dates de ramassage notées. Je reprends toutes les deux semaines." },
  { id: "r14", producerId: "nda", author: "Clarisse Gnépa", rating: 4, date: "2026-08-03", comment: "Bon rapport qualité. La livraison depuis Dabou a ajouté un peu de temps, mais la glacière était froide." },
  { id: "r15", producerId: "nda", author: "Kouamé Bi", rating: 5, date: "2026-07-15", comment: "On a fait le poulet braisé du dimanche avec. Toute la cour a demandé l’adresse." },
  { id: "r16", producerId: "vergers", author: "Awa Koné", rating: 5, date: "2026-09-16", comment: "Ananas pain de sucre parfaitement mûr, parfum dans toute la cuisine. Cueilli à Bassam le matin." },
  { id: "r17", producerId: "vergers", author: "Yves Lago", rating: 5, date: "2026-09-01", comment: "Les papayes solo sont douces, pas farineuses. Enfin un fruit qui n’a pas voyagé une semaine." },
  { id: "r18", producerId: "vergers", author: "Fatou Bamba", rating: 4, date: "2026-08-18", comment: "Citrons très juteux. Une noix de coco était un peu jeune, ils l’ont remplacée sans discussion." },
  { id: "r19", producerId: "vergers", author: "Serge Aké", rating: 5, date: "2026-08-04", comment: "Le corossol est rare en ville. Il est arrivé entier, protégé dans du papier." },
  { id: "r20", producerId: "vergers", author: "Inès Traoré", rating: 4, date: "2026-07-22", comment: "Bananes douces, un peu tachées comme il se doit quand elles sont mûres. Rien à jeter." },
  { id: "r21", producerId: "lagune", author: "Pascal Essis", rating: 5, date: "2026-09-12", comment: "Manioc frais, facile à éplucher, goût léger. On sent le sol sableux de Jacqueville." },
  { id: "r22", producerId: "lagune", author: "Adjoua Koffi", rating: 4, date: "2026-08-27", comment: "Les feuilles de patate étaient superbes. Livraison tôt, comme promis." },
  { id: "r23", producerId: "lagune", author: "Landry Kouassi", rating: 4, date: "2026-08-09", comment: "Bonne igname, un tubercule un peu mince. Le reste du sac était généreux." },
  { id: "r24", producerId: "lagune", author: "Bintou Cissé", rating: 5, date: "2026-07-25", comment: "La pastèque était sucrée et encore fraîche. Rare à ce prix en ville." },
  { id: "r25", producerId: "lagune", author: "Moussa Fofana", rating: 3, date: "2026-07-08", comment: "Tomates correctes mais moins parfumées que celles de Bingerville. Le manioc, en revanche, est excellent." },
  { id: "r26", producerId: "songon", author: "Mariam Diallo", rating: 5, date: "2026-09-19", comment: "Chou ferme et épinards sans sable. On voit que c’est lavé au jardin, pas à la va-vite." },
  { id: "r27", producerId: "songon", author: "Yao N’Guessan", rating: 5, date: "2026-09-06", comment: "Les œufs du jardin ont un jaune qui tient dans la poêle. Je ne retourne plus au marché de Sicogi pour ça." },
  { id: "r28", producerId: "songon", author: "Akissi Brou", rating: 4, date: "2026-08-24", comment: "Carottes un peu petites, très sucrées. Le producteur explique la saison, j’aime ce sérieux." },
  { id: "r29", producerId: "songon", author: "Jean-Baptiste Assi", rating: 5, date: "2026-08-07", comment: "Poivrons croquants. Livrés avec le nom du lot, on peut suivre d’où vient la planche." },
  { id: "r30", producerId: "songon", author: "Clarisse Gnépa", rating: 4, date: "2026-07-17", comment: "Belle courgette. J’aurais aimé un créneau plus tardif, mais la qualité est là." },
  { id: "r31", producerId: "ake", author: "Ibrahim Touré", rating: 5, date: "2026-09-11", comment: "Miel de forêt profond, presque boisé. Le QR du lot renvoie bien à la miellée d’août." },
  { id: "r32", producerId: "ake", author: "Awa Koné", rating: 5, date: "2026-08-29", comment: "Le mélange miel et cacao est devenu mon petit déjeuner. Pot en verre consigné, bonne idée." },
  { id: "r33", producerId: "ake", author: "Kouamé Bi", rating: 4, date: "2026-08-13", comment: "Propolis forte, à petite dose. L’apiculteur a joint un mot d’usage, c’est attentionné." },
  { id: "r34", producerId: "ake", author: "Fatou Bamba", rating: 5, date: "2026-07-30", comment: "Bougies à la cire qui sentent vraiment le miel, pas un parfum chimique." },
  { id: "r35", producerId: "ake", author: "Serge Aké", rating: 5, date: "2026-07-11", comment: "Miel d’hévéa clair et floral. On sent la différence avec le miel de forêt, les lots sont bien séparés." },
  { id: "r36", producerId: "ahoua", author: "Jean-Baptiste Assi", rating: 4, date: "2026-09-15", comment: "Poulet bicyclette comme chez ma grand-mère à Bonoua. Il faut le mijoter, et ça vaut le coup." },
  { id: "r37", producerId: "ahoua", author: "Adjoua Koffi", rating: 5, date: "2026-08-26", comment: "Le canard était gras et propre. Œufs de cane parfaits pour les gâteaux." },
  { id: "r38", producerId: "ahoua", author: "Yves Lago", rating: 4, date: "2026-08-08", comment: "Plantains mûrs à point pour l’alloco. Le piment oiseau est violent, prévenez vos invités." },
  { id: "r39", producerId: "ahoua", author: "Bintou Cissé", rating: 5, date: "2026-07-21", comment: "Œufs plein air avec des coquilles solides. La ferme répond vite sur WhatsApp si on a une question." },
  { id: "r40", producerId: "ahoua", author: "Landry Kouassi", rating: 3, date: "2026-07-04", comment: "Bonne volaille, mais le créneau de livraison a glissé de deux heures. La qualité du canard a rattrapé ça." },
];

function ratingFor(producerId: string): { rating: number; reviewCount: number } {
  const list = reviews.filter((review) => review.producerId === producerId);
  const total = list.reduce((sum, review) => sum + review.rating, 0);
  const rating = list.length === 0 ? 0 : Math.round((total / list.length) * 10) / 10;
  return { rating, reviewCount: list.length };
}

export const producers: Producer[] = producersSeed.map((producer) => ({
  ...producer,
  ...ratingFor(producer.id),
}));

export function getProducer(id: string): Producer | undefined {
  return producers.find((producer) => producer.id === id);
}

export function getProducerBySlug(slug: string): Producer | undefined {
  return producers.find((producer) => producer.slug === slug);
}

export function getReviews(producerId: string): Review[] {
  return reviews.filter((review) => review.producerId === producerId);
}
