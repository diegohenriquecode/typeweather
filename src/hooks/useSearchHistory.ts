import { useCallback, useMemo, useSyncExternalStore } from "react";

const KEY = "cep_history_v1";

export type HistoryItem = {
  cep: string;
  cidade: string;
  uf: string;
  lat?: number;
  lon?: number;
  ts: number;
};

function readLS(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as HistoryItem[]) : [];
  } catch {
    return [];
  }
}
function writeLS(list: HistoryItem[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

let cache: HistoryItem[] = readLS();
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      cache = readLS();
      emit();
    }
  });
}

export function useSearchHistory(max = 10) {
  const subscribe = (cb: () => void) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
  };
  const getSnapshot = () => cache;
  const list = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const add = useCallback(
    (item: HistoryItem) => {
      const filtered = cache.filter(
        (x) => !(x.cep === item.cep && x.cidade === item.cidade && x.uf === item.uf)
      );
      const next = [item, ...filtered].slice(0, max);

      cache = next;
      writeLS(next);
      emit();
    },
    [max]
  );

  const clear = useCallback(() => {
    cache = [];
    writeLS([]);
    emit();
  }, []);

  return useMemo(() => ({ items: list, add, clear }), [list, add, clear]);
}
