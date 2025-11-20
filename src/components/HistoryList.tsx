import Card from '@/components/UI/Card';
import { loadHistory } from '@/utils/storage';


export default function HistoryList({ onPick }: { onPick: (h: ReturnType<typeof loadHistory>[number]) => void }) {
  const items = loadHistory();
  if (!items.length) return null;
  return (
    <Card>
      <h3 className="mb-3 text-base font-semibold">Histórico</h3>
      <ul className="divide-y divide-black/5 dark:divide-white/10">
        {items.map((h, i) => (
          <li key={i} className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm font-medium">{h.cep} — {h.uf}</div>
              <div className="text-xs text-gray-500">{new Date(h.ts).toLocaleString()}</div>
            </div>
            <button className="rounded-xl border border-black/5 bg-white px-3 py-1 text-sm shadow hover:bg-gray-50 dark:bg-gray-800 dark:border-white/10 dark:hover:bg-gray-700" onClick={() => onPick(h)}>Recarregar</button>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-gray-500">Armazena as últimas 10 consultas.</p>
    </Card>
  );
}
