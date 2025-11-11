import Card from "@/components/UI/Card";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { ArrowLeft, Clock, MapPin, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function formatDate(ts: number) {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(ts));
  } catch {
    return new Date(ts).toLocaleString();
  }
}

export default function History() {
  const { items, clear } = useSearchHistory(10);
  const navigate = useNavigate();

  const handleOpen = (i: number) => {
    const it = items[i];
    if (!it) return;
    const label = `${it.cidade}/${it.uf}`;
    navigate(
      `/dashboard?lat=${it.lat ?? ""}&lon=${it.lon ?? ""}&label=${encodeURIComponent(
        label
      )}`,
    );
  };

  return (
    <section className="min-h-screen">
      <header className="container-app flex items-center justify-between gap-3 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
        >
          <ArrowLeft size={16} /> Voltar
        </Link>

        <div className="text-sm text-white/70">Histórico de buscas</div>

        <button
          onClick={clear}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
          title="Limpar histórico"
        >
          <Trash2 size={16} /> Limpar
        </button>
      </header>

      <main className="container-app pb-10">
        {items.length === 0 ? (
          <Card className="md:col-span-12 text-center">
            <p className="text-white/80">
              Seu histórico está vazio. Faça uma busca na Home para começar.
            </p>
          </Card>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((h, idx) => (
              <li key={`${h.cep}-${h.ts}`}>
                <button
                  onClick={() => handleOpen(idx)}
                  className="block w-full text-left focus:outline-none"
                >
                  <Card className="transition hover:ring-2 hover:ring-blue-500/40">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm text-white/60">CEP</div>
                        <div className="text-lg font-semibold">
                          {h.cep.slice(0, 5)}-{h.cep.slice(5)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <Clock size={14} />
                        {formatDate(h.ts)}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1">
                        <MapPin size={14} />
                        {h.cidade}/{h.uf}
                      </span>
                      {h.lat != null && h.lon != null && (
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/70">
                          {h.lat.toFixed(3)}, {h.lon.toFixed(3)}
                        </span>
                      )}
                    </div>
                  </Card>
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </section>
  );
}
