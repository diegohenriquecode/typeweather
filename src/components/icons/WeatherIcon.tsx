import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  Thermometer,
} from "lucide-react";

type Props = {
  temp?: number | null;
  conditionText?: string | null;
  isNight?: boolean;
  precipProbability?: number | null;
  className?: string;
  size?: number;
};

export default function WeatherIcon({
    temp,
    conditionText,
    isNight = false,
    precipProbability,
    className,
    size = 18,
  }: Props) {
  const text = (conditionText || "").toLowerCase();

  const isSnow =
    text.includes("snow") ||
    text.includes("neve") ||
    (typeof temp === "number" && temp <= 0);

  const isRain =
    text.includes("rain") ||
    text.includes("chuva") ||
    text.includes("garoa") ||
    (typeof precipProbability === "number" && precipProbability >= 60);

  const isDrizzle =
    text.includes("drizzle") ||
    text.includes("chuvisco") ||
    (typeof precipProbability === "number" &&
      precipProbability >= 30 &&
      precipProbability < 60);

  const isCloudy =
    text.includes("cloud") ||
    text.includes("nublado") ||
    text.includes("nuvens") ||
    text.includes("overcast");

  const isClear =
    text.includes("clear") ||
    text.includes("céu limpo") ||
    text.includes("limpo");

  if (isSnow) return <CloudSnow size={size} className={className ?? "text-sky-400"} />;
  if (isRain) return <CloudRain size={size} className={className ?? "text-sky-500"} />;
  if (isDrizzle) return <CloudDrizzle size={size} className={className ?? "text-sky-400"} />;
  if (isCloudy) {
    return isNight ? (
      <CloudMoon size={size} className={className ?? "text-blue-300"} />
    ) : (
      <CloudSun size={size} className={className ?? "text-amber-400"} />
    );
  }
  if (isClear) {
    return isNight ? (
      <Moon size={size} className={className ?? "text-blue-200"} />
    ) : (
      <Sun size={size} className={className ?? "text-amber-400"} />
    );
  }

  if (typeof temp === "number") {
    if (temp >= 30) return <Sun size={size} className={className ?? "text-amber-500"} />;
    if (temp <= 12) return isNight
      ? <Moon size={size} className={className ?? "text-blue-300"} />
      : <Cloud size={size} className={className ?? "text-sky-500"} />;
    return isNight
      ? <CloudMoon size={size} className={className ?? "text-blue-300"} />
      : <CloudSun size={size} className={className ?? "text-amber-400"} />;
  }

  return <Thermometer size={size} className={className ?? "text-gray-400"} />;
}
