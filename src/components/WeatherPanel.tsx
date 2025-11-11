import { useMemo, useState } from "react";
import Card from "@/components/UI/Card";
import Select from "@/components/UI/Select";
import { useWeather } from "@/hooks/useWeather";
import { formatDate, formatDateTime, formatTemp } from "@/utils/format";
import WeatherIcon from "@/components/icons/WeatherIcon";
import WeatherArt from "@/components/icons/WeatherArt";
import WeatherArtHot from "@/components/icons/WeatherArtHot";
import { motion } from "framer-motion";
import WeatherSkeleton from "@/components/UI/WeatherSkeleton";

function TempBadge({ value }: { value: number }) {
  const level = value >= 30 ? "hot" : value <= 15 ? "cold" : "mild";
  const cls =
    level === "hot"
      ? "bg-red-50 text-red-700 ring-red-100"
      : level === "cold"
        ? "bg-blue-50 text-blue-700 ring-blue-100"
        : "bg-emerald-50 text-emerald-700 ring-emerald-100";
  return (
    <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] leading-tight ring-1 ${cls}`}>
      {formatTemp(value)}
    </span>
  );
}

type DailyItem = { dateISO: string; minC: number; maxC: number };

export default function WeatherPanel({
     lat, lon, label,
   }: { lat?: number; lon?: number; label: string }) {
  const [days, setDays] = useState(5);
  const { data, isLoading, isError, error, refetch } = useWeather({ lat, lon, days, label });


  const today = data?.daily?.[0];
  const tempRange = useMemo(() => {
    if (!today) return null;
    const diff = Math.round((today.maxC - today.minC) * 10) / 10;
    return { min: today.minC, max: today.maxC, diff };
  }, [today]);

  const avgToday = today ? (today.maxC + today.minC) / 2 : undefined;
  const isHot = (avgToday ?? data?.current?.temperatureC ?? 0) >= 28;

  if (isLoading) return <WeatherSkeleton />;

  if (isError) {
    return (
      <div className="md:col-span-12 rounded-xl border border-red-400/30 bg-red-900/30 p-3 text-sm text-red-200">
        Falha ao obter clima: {(error as any)?.message}.{" "}
        <button className="underline" onClick={() => refetch()}>Tentar novamente</button>
      </div>
    );
  }
  if (!data) return null;

  return (
    <>
      <Card className="md:col-span-8 !bg-white/5 !border-white/10 min-w-0">
        <div className="rounded-2xl bg-gradient-to-b from-indigo-900/60 to-slate-900/60 p-5 text-white">
          <div className="mb-1 text-sm/5 text-white/80">{label}</div>
          <div className="text-xs/5 text-white/60">{formatDateTime(data.current.observedAtISO)}</div>

          <div className="relative mt-8 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <div className="leading-none text-5xl md:text-6xl lg:text-7xl font-bold">
                {Math.round(data.current.temperatureC)}°c
              </div>
              <div className="mt-2 text-sm/5 text-white/80 truncate">
                {`${Math.round(today!.minC)}°c / ${Math.round(today!.maxC)}°c`} ·{" "}
                <span className="capitalize">{data.current.summary ?? "—"}</span>
              </div>
            </div>
            <div className="h-24 w-32 md:h-28 md:w-40 shrink-0">
              {isHot ? <WeatherArtHot /> : <WeatherArt />}
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-12">
          <div className="md:col-span-4 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mb-1 text-xs uppercase tracking-wide text-white/70">Período</div>
            <Select
              aria-label="Dias"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((d) => <option key={d} value={d}>{d} dia(s)</option>)}
            </Select>
          </div>
          <div className="md:col-span-8 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="text-xs text-white/70">Localização</div>
            <div className="text-sm text-white">{data.locationLabel ?? label}</div>
          </div>
        </div>
      </Card>

      <Card className="md:col-span-4 !bg-white/5 !border-white/10">
        <h3 className="mb-2 text-sm font-medium text-white">Detalhes do clima hoje</h3>
        <ul className="divide-y divide-white/10 text-sm">
          <li className="flex items-center justify-between py-3">
            <span className="text-white/70">Sensação térmica</span>
            <span>{formatTemp(data.current.apparentTemperatureC)}</span>
          </li>
          <li className="flex items-center justify-between py-3">
            <span className="text-white/70">Probabilidade de chuva</span>
            <span>{data.current.precipProbability != null ? `${Math.round(data.current.precipProbability)}%` : "—"}</span>
          </li>
          <li className="flex items-center justify-between py-3">
            <span className="text-white/70">Velocidade do vento</span>
            <span>{data.current.windSpeedKmh != null ? `${data.current.windSpeedKmh} Km/h` : "—"}</span>
          </li>
          <li className="flex items-center justify-between py-3">
            <span className="text-white/70">Umidade do ar</span>
            <span>{data.current.humidity != null ? `${data.current.humidity}%` : "—"}</span>
          </li>
          <li className="flex items-center justify-between py-3">
            <span className="text-white/70">Variação da temperatura</span>
            <span>{tempRange ? `${Math.round(tempRange.diff)}°` : "—"}</span>
          </li>
          <li className="flex items-center justify-between py-3">
            <span className="text-white/70">Observado em</span>
            <span>{formatDateTime(data.current.observedAtISO)}</span>
          </li>
        </ul>
      </Card>

      <Card className="md:col-span-12 !bg-white/5 !border-white/10">
        <h3 className="mb-2 text-sm font-medium text-white">
          Previsão para {days} {days === 1 ? "dia" : "dias"}
        </h3>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
          {data.daily.map((d: DailyItem) => (
            <motion.li
              key={d.dateISO}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm"
            >
              <div className="mb-1 text-xs text-white/70">{formatDate(d.dateISO)}</div>
              <div className="flex items-center gap-2">
                <WeatherIcon temp={(d.maxC + d.minC) / 2} />
                <div className="flex items-center gap-2">
                  <TempBadge value={d.minC} />
                  <span className="text-white/40">/</span>
                  <TempBadge value={d.maxC} />
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </Card>
    </>
  );
}
