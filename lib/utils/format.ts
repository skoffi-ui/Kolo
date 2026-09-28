const fcfaFormatter = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
  useGrouping: true,
});

const MONTHS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

/** Integer FCFA amount, fr-FR grouping, NBSP (U+00A0) before the currency code. */
export function formatFCFA(amount: number): string {
  const rounded = Math.round(amount);
  return `${fcfaFormatter.format(rounded)}\u00A0FCFA`;
}

function groupInt(value: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f");
}

export function formatCount(value: number): string {
  return groupInt(String(Math.round(value)));
}

export function formatRating(value: number): string {
  const [whole, fraction] = value.toFixed(1).split(".");
  return `${groupInt(whole ?? "0")},${fraction}`;
}

export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.slice(0, 10).split("-").map(Number);
  const monthLabel = MONTHS[(month ?? 1) - 1] ?? "";
  return `${day} ${monthLabel} ${year}`;
}

export function formatKm(km: number): string {
  const rounded = Math.round(km * 10) / 10;
  const [whole, fraction] = rounded.toFixed(1).split(".");
  const body = fraction === "0" ? groupInt(whole ?? "0") : `${groupInt(whole ?? "0")},${fraction}`;
  return `${body}\u00A0km`;
}

export function normalizeSearch(value: string): string {
  return value
    .toLowerCase()
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}
