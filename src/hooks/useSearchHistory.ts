// src/hooks/useSearchHistory.ts
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "cepclima:history";

type LegacyItem = {
  cep: string;
  cityUF?: string;
  timestamp?: string | number;
  lat?: number;
  lon?: number;
};

export type HistoryItem = {
  cep: string;
  cidade: string;
  uf: string;
  ts: number;
  lat?: number;
  lon?: number;
};

function normalize(item: LegacyItem): HistoryItem | null {
  try {
    const cep = String(item.cep ?? "").replace(/\D/g, "");
    if (!cep) return null;

    let cidade = (item as any).cidade as string | undefined;
    let uf = (item as any).uf as string | undefined;

    if ((!cidade || !uf) && item.cityUF) {
      const parts = String(item.cityUF).split("/");
      cidade = (parts[0] ?? "").trim();
      uf = (parts[1] ?? "").trim();
    }

    if (!cidade || !uf) return null;

    const rawTs = (item as any).ts ?? item.timestamp ?? Date.now();
    const ts =
      typeof rawTs === "number"
        ? rawTs
        : Number.isNaN(Date.parse(String(rawTs)))
          ? Date.now()
          : new Date(String(rawTs)).getTime();

    const lat =
      typeof item.lat === "number" ? item.lat : undefined;
    const lon =
      typeof item.lon === "number" ? item.lon : undefined;

    return { cep, cidade, uf, ts, lat, lon };
  } catch {
    return null;
  }
}

export function useSearchHistory(limit = 10) {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: LegacyItem[] = raw ? JSON.parse(raw) : [];
      const normalized = parsed
        .map(normalize)
        .filter((x): x is HistoryItem => !!x)
        .sort((a, b) => b.ts - a.ts);

      setItems(normalized.slice(0, limit));
    } catch {
      setItems([]);
    }
  }, [limit]);

  const clear = useMemo(
    () => () => {
      localStorage.setItem(STORAGE_KEY, "[]");
      setItems([]);
    },
    [],
  );

  return { items, clear };
}
