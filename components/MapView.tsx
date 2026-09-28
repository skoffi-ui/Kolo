"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import type { Producer } from "@/lib/types";
import { formatKm, formatRating } from "@/lib/utils/format";
import { Stars } from "@/components/stars";

const defaultPrototype = L.Icon.Default.prototype as L.Icon.Default & {
  _getIconUrl?: unknown;
};
delete defaultPrototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

function pinIcon(active: boolean) {
  return L.divIcon({
    className: "kolo-marker-wrap",
    html: `<span class="kolo-pin${active ? " kolo-pin-active" : ""}"></span>`,
    iconSize: active ? [28, 36] : [28, 32],
    iconAnchor: active ? [14, 34] : [14, 30],
    popupAnchor: [0, -28],
  });
}

function FitBounds({ producers }: { producers: Producer[] }) {
  const map = useMap();
  const signature = producers.map((producer) => producer.id).join("|");

  useEffect(() => {
    if (producers.length === 0) {
      map.setView([5.345, -4.02], 10);
      return;
    }
    const bounds = L.latLngBounds(
      producers.map((producer) => [producer.lat, producer.lng] as [number, number]),
    );
    map.fitBounds(bounds.pad(0.35), { maxZoom: 12, animate: false });
  }, [map, producers, signature]);

  return null;
}

function InvalidateSize({ visible }: { visible: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (!visible) return;
    const id = window.setTimeout(() => map.invalidateSize(), 80);
    return () => window.clearTimeout(id);
  }, [map, visible]);
  return null;
}

export default function MapView({
  producers,
  distances,
  highlightedId,
  onHighlight,
  visible = true,
}: {
  producers: Producer[];
  distances: Record<string, number>;
  highlightedId: string | null;
  onHighlight: (id: string | null) => void;
  visible?: boolean;
}) {
  const icons = useMemo(() => ({ on: pinIcon(true), off: pinIcon(false) }), []);

  return (
    <MapContainer
      center={[5.345, -4.02]}
      zoom={10}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds producers={producers} />
      <InvalidateSize visible={visible} />
      {producers.map((producer) => {
        const active = highlightedId === producer.id;
        return (
          <Marker
            key={producer.id}
            position={[producer.lat, producer.lng]}
            icon={active ? icons.on : icons.off}
            zIndexOffset={active ? 1000 : 0}
            eventHandlers={{
              mouseover: () => onHighlight(producer.id),
              mouseout: () => onHighlight(null),
              click: () => onHighlight(producer.id),
            }}
          >
            <Popup>
              <div className="min-w-44 space-y-1">
                <p className="font-heading text-base leading-tight text-earth">{producer.name}</p>
                <p className="text-xs text-muted-foreground">
                  {producer.type} · {producer.town}
                </p>
                <div className="flex items-center gap-1">
                  <Stars value={producer.rating} />
                  <span className="text-xs">{formatRating(producer.rating)}</span>
                </div>
                <p className="text-xs">{formatKm(distances[producer.id] ?? 0)} de vous</p>
                <Link
                  href={`/producteurs/${producer.slug}`}
                  className="inline-block pt-1 text-sm font-semibold text-primary"
                >
                  Voir la ferme
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
