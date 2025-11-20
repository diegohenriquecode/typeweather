export type HistoryItem = {
  cep: string;
  cidade: string;
  uf: string;
  ts: number;
  lat?: number;
  lon?: number;
};

const KEY = "cepclima:history";

function normalize(raw: any): HistoryItem | null {
  try {
    const cep = String(raw?.cep ?? "").replace(/\D/g, "");
    if (!cep) return null;

    let cidade = raw?.cidade as string | undefined;
    let uf = raw?.uf as string | undefined;

    if ((!cidade || !uf) && raw?.cityUF) {
      const [c, u] = String(raw.cityUF).split("/");
      cidade = (c ?? "").trim();
      uf = (u ?? "").trim();
    }
    if (!cidade || !uf) return null;

    const rawTs = raw?.ts ?? raw?.timestamp ?? Date.now();
    const ts =
      typeof rawTs === "number"
        ? rawTs
        : Number.isNaN(Date.parse(String(rawTs)))
          ? Date.now()
          : new Date(String(rawTs)).getTime();

    const lat = typeof raw?.lat === "number" ? raw.lat : undefined;
    const lon = typeof raw?.lon === "number" ? raw.lon : undefined;

    return { cep, cidade, uf, ts, lat, lon };
  } catch {
    return null;
  }
}

export function loadHistory(limit = 50): HistoryItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed: any[] = raw ? JSON.parse(raw) : [];
    const list = parsed
      .map(normalize)
      .filter((x): x is HistoryItem => !!x)
      .sort((a, b) => b.ts - a.ts);
    return list.slice(0, limit);
  } catch {
    return [];
  }
}

export function saveHistory(items: HistoryItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addToHistory(item: {
  cep: string;
  cidade?: string;
  uf?: string;
  ts?: number;
  lat?: number;
  lon?: number;
}, limit = 50): HistoryItem[] {
  const base: HistoryItem = {
    cep: String(item.cep).replace(/\D/g, ""),
    cidade: item.cidade ?? '-',
    uf: item.uf ?? '-',
    ts: item.ts ?? Date.now(),
    lat: typeof item.lat === "number" ? item.lat : undefined,
    lon: typeof item.lon === "number" ? item.lon : undefined,
  };

  const current = loadHistory(limit * 2);
  const key = `${base.cep}|${base.cidade}|${base.uf}`.toLowerCase();

  const deduped = current.filter(
    (h) => `${h.cep}|${h.cidade}|${h.uf}`.toLowerCase() !== key
  );

  const next = [base, ...deduped]
    .sort((a, b) => b.ts - a.ts)
    .slice(0, limit);

  saveHistory(next);
  return next;
}

export function clearHistory() {
  saveHistory([]);
}
