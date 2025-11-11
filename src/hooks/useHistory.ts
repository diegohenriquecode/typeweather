import { useCallback, useMemo } from 'react';
import { loadHistory, saveHistory, HistoryItem } from '@/utils/storage';


export function useHistory() {
  const items = useMemo(() => loadHistory(), []);
  const add = useCallback((item: HistoryItem) => {
    const next = [item, ...loadHistory()].slice(0, 10);
    saveHistory(next);
  }, []);
  const clear = useCallback(() => saveHistory([]), []);
  return { items, add, clear };
}
