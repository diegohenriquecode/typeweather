export type WeatherDaily = {
  dateISO: string;
  minC: number;
  maxC: number;
};

export type WeatherBundle = {
  locationLabel: string;
  current: WeatherCurrent;
  daily: WeatherDaily[];
  coords: { lat: number; lon: number };
};

export type WeatherCurrent = {
  temperatureC: number;
  apparentTemperatureC: number;
  humidity?: number | null;
  observedAtISO: string;

  windSpeedKmh?: number | null;
  precipProbability?: number | null;
  summary?: string | null;
};
