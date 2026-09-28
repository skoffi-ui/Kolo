const MONTHS = [
  "janv.",
  "févr.",
  "mars",
  "avr.",
  "mai",
  "juin",
  "juil.",
  "août",
  "sept.",
  "oct.",
  "nov.",
  "déc.",
];

export type RevenuePoint = {
  label: string;
  revenue: number;
  orders: number;
};

export function revenueSeries(seed: number): RevenuePoint[] {
  const end = new Date(Date.UTC(2026, 8, 28));
  return Array.from({ length: 30 }, (_, index) => {
    const date = new Date(end);
    date.setUTCDate(date.getUTCDate() - (29 - index));
    const wave = Math.sin((index + seed) / 3.5) * 0.28 + 1;
    const weekend = date.getUTCDay() === 0 || date.getUTCDay() === 6 ? 1.35 : 1;
    const base = 14000 + (seed % 5) * 3200;
    const revenue = Math.round((base * wave * weekend) / 100) * 100;
    const orders = Math.max(1, Math.round(revenue / (5200 + (seed % 4) * 600)));
    return {
      label: `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]}`,
      revenue,
      orders,
    };
  });
}

export function seedFromId(id: string): number {
  return id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}
