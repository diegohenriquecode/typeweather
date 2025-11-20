// src/hooks/useHistory.ts
import { useCallback, useMemo, useState } from "react";
import { addToHistory, clearHistory, loadHistory, HistoryItem } from "@/utils/storage";

export function useHistory(limit = 10) {
  const [items, setItems] = useState<HistoryItem[]>(() => loadHistory(limit));

  const add = useCallback(
    (item: Omit<HistoryItem, "ts"> & { ts?: number }) => {
      const next = addToHistory(item, limit);
      setItems(next.slice(0, limit));
    },
    [limit]
  );

  const clear = useCallback(() => {
    clearHistory();
    setItems([]);
  }, []);

  const all = useMemo(() => items, [items]);
  return { items: all, add, clear };
}
