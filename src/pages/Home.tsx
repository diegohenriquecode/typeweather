import HeroSearch from "@/components/UI/HeroSearch";
import { geocodeCityUF } from "@/services/geocodingService";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  async function handleResolved(address: {
    cidade: string;
    uf: string;
    lat?: number;
    lon?: number;
  }) {
    let { lat, lon } = address;
    if (lat == null || lon == null) {
      const g = await geocodeCityUF(address.cidade, address.uf);
      lat = g.lat;
      lon = g.lon;
    }
    const label = `${address.cidade}/${address.uf}`;
    navigate("/dashboard", { state: { lat, lon, label } });
  }

  return (
    <section className="relative isolate min-h-screen overflow-hidden text-white">

      <header className="relative z-10 pt-6 sm:pt-10">
        <div className="container-app mx-auto flex items-center justify-between px-4 sm:px-6">
          <span className="inline-block w-16" />
          <img
            src="/logo_large.svg"
            alt="TypeWeather"
            className="h-8 sm:h-9 w-40 md:w-full select-none"
            loading="eager"
          />
          <Link
            to="/history"
            className="inline-flex items-center ml-6 gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
          >
            Histórico
          </Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-2xl px-6">
        <div className="grid min-h-[calc(100vh-120px)] place-items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full text-center"
          >
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Boas-vindas ao <span className="text-blue-300">TypeWeather</span>
            </h1>

            <p className="mt-2 text-sm text-white/70">
              Digite um <b>CEP</b> para ver a previsão do tempo do seu local
            </p>

            <div className="mt-6 sm:mt-10">
              <HeroSearch onResolved={handleResolved} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
