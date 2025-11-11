import { useQuery } from '@tanstack/react-query';
import { TEN_MIN } from '@/utils/time';
import {getWeather} from "@/services/whaterService";


export function useWeather(params: { lat?: number; lon?: number; days: number; label: string }) {
  const { lat, lon, days, label } = params;
  return useQuery({
    queryKey: ['weather', lat, lon, days],
    queryFn: async () => {
      if (lat == null || lon == null) throw new Error('Sem coordenadas');
      return getWeather(lat, lon, days, label);
    },
    enabled: lat != null && lon != null,
    staleTime: TEN_MIN,
    gcTime: TEN_MIN,
    retry: 1
  });
}
