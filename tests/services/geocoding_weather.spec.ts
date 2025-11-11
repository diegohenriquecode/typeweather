import { describe, it, expect, vi } from 'vitest';
import { GeocodingSobral, ForecastSobral } from '../mocks/response';
import { geocodeCityUF } from '@/services/geocodingService';
import { getWeather } from '@/services/whaterService';

const ok = (body: any) =>
  new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } });

describe('geocoding + weather', () => {
  it('geocodeCityUF retorna lat/lon', async () => {
    const spy = vi.spyOn(global, 'fetch' as never).mockResolvedValueOnce(ok(GeocodingSobral));
    const geo = await geocodeCityUF('Sobral', 'CE');
    expect(geo.lat).toBeCloseTo(-3.68611, 5);
    expect(geo.lon).toBeCloseTo(-40.34972, 5);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('getWeatherBundle retorna current + daily normalizados', async () => {
    const spy = vi.spyOn(global, 'fetch' as never).mockResolvedValueOnce(ok(ForecastSobral));
    const data = await getWeather( 3.68611, 40.34972,  7, 'Sobral/CE' );
    expect(data.daily.length).toBeGreaterThan(0);
    expect(data.locationLabel).toMatch(/Sobral/i);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
