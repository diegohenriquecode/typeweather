import { fetchWithTimeout, json } from '@/utils/fetchers';
import { WeatherBundle } from '@/types/wheather';


export async function getWeather(lat: number, lon: number, days: number, label: string): Promise<WeatherBundle> {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(lat));
  url.searchParams.set('longitude', String(lon));
  url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,apparent_temperature');
  url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min');
  url.searchParams.set('timezone', 'auto');
  url.searchParams.set('forecast_days', String(Math.min(Math.max(days,1),7)));


  const res = await fetchWithTimeout(url.toString());
  const data = await json<any>(res);


  const current = {
    temperatureC: data.current?.temperature_2m ?? NaN,
    apparentTemperatureC: data.current?.apparent_temperature ?? NaN,
    humidity: data.current?.relative_humidity_2m ?? null,
    observedAtISO: data.current?.time ?? new Date().toISOString()
  };
  const daily = (data.daily?.time || []).map((dateISO: string, i: number) => ({
    dateISO,
    minC: data.daily.temperature_2m_min?.[i] ?? NaN,
    maxC: data.daily.temperature_2m_max?.[i] ?? NaN
  }));


  return {
    locationLabel: label,
    coords: { lat, lon },
    current,
    daily
  };
}
