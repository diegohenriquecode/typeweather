import HeroSearch from "@/components/UI/HeroSearch";
import WeatherPanel from "@/components/WeatherPanel";
import { geocodeCityUF } from "@/services/geocodingService";
import { motion } from "framer-motion";
import { useLocation, useNavigate, useSearchParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";

type Coords = { lat?: number; lon?: number; label: string };

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sp] = useSearchParams();

  const initial: Coords | null = useMemo(() => {
    const st = (location.state as any) || {};
    const sLat = sp.get("lat");
    const sLon = sp.get("lon");
    const sLabel = sp.get("label");
    if (st?.lat && st?.lon) return { lat: st.lat, lon: st.lon, label: st.label || "-" };
    if (sLat && sLon) return { lat: Number(sLat), lon: Number(sLon), label: sLabel || "-" };
    return null;
  }, [location.state, sp]);

  const [coords, setCoords] = useState<Coords | null>(initial);

  useEffect(() => {
    if (initial) setCoords(initial);
  }, [initial]);

  async function handleResolved(address: { cidade: string; uf: string; lat?: number; lon?: number }) {
    let { lat, lon } = address;
    if (lat == null || lon == null) {
      const g = await geocodeCityUF(address.cidade, address.uf);
      lat = g.lat;
      lon = g.lon;
    }
    const label = `${address.cidade}/${address.uf}`;
    setCoords({ lat, lon, label });
    navigate(`/dashboard?lat=${lat}&lon=${lon}&label=${encodeURIComponent(label)}`, { replace: true });
  }

  return (
    <main className="container-app mx-auto max-w-7xl px-4 sm:px-6 py-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
          >
            <ArrowLeft size={16} /> Voltar
          </Link>
          <Link
            to="/history"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
          >
            Histórico
          </Link>
        </div>

        <div className="w-full md:max-w-2xl">
          <HeroSearch onResolved={handleResolved} />
        </div>
      </div>

      {!coords?.lat || !coords?.lon ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
          Informe um CEP para visualizar o clima.
        </div>
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 md:grid-cols-12"
        >
          <WeatherPanel lat={coords.lat} lon={coords.lon} label={coords.label} />
        </motion.section>
      )}
    </main>
  );
}
