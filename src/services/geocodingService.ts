import { fetchWithTimeout, json } from '@/utils/fetchers';


export async function geocodeCityUF(city: string, uf: string) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&country=BR&admin1=${encodeURIComponent(uf)}&count=1`;
  const res = await fetchWithTimeout(url);
  const data = await json<{ results?: Array<{ latitude: number; longitude: number }>}>(res);
  const item = data.results?.[0];
  if (!item) throw new Error('Coordenadas não encontradas');
  return { lat: item.latitude, lon: item.longitude };
}
