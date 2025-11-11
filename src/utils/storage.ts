const KEY = 'ceplima:history';
export type HistoryItem = { cep: string; cityUF: string; timestamp: string; lat?: number; lon?: number };


export function loadHistory(): HistoryItem[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}
export function saveHistory(items: HistoryItem[]) { localStorage.setItem(KEY, JSON.stringify(items)); }
