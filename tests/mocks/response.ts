export const BrasilApiCep62053760 = {
  cep: '62053760',
  state: 'CE',
  city: 'Sobral',
  neighborhood: 'Antônio Carlos Belchior',
  street: 'Rua Vereador Félix Dias Ibiapina',
  service: 'open-cep',
  location: { type: 'Point', coordinates: {} },
};

export const GeocodingSobral = {
  results: [
    {
      id: 3387296,
      name: 'Sobral',
      latitude: -3.68611,
      longitude: -40.34972,
      elevation: { source: '75.0', parsedValue: 75 },
      feature_code: 'PPL',
      country_code: 'BR',
      admin1_id: 3402362,
      admin2_id: 3387295,
      timezone: 'America/Fortaleza',
      population: 157996,
      country_id: 3469034,
      country: 'Brazil',
      admin1: 'Ceará',
      admin2: 'Sobral Municipality',
    },
  ],
  generationtime_ms: 0.7666,
};

export const ForecastSobral = {
  latitude: -3.5,
  longitude: -40.25,
  utc_offset_seconds: -10800,
  timezone: 'America/Fortaleza',
  current_units: {
    time: 'iso8601',
    interval: 'seconds',
    temperature_2m: '°C',
    relative_humidity_2m: '%',
    apparent_temperature: '°C',
  },
  current: {
    time: '2025-11-10T06:00',
    interval: 900,
    temperature_2m: { source: '24.0', parsedValue: 24 },
    relative_humidity_2m: 87,
    apparent_temperature: { source: '27.0', parsedValue: 27 },
  },
  daily_units: {
    time: 'iso8601',
    temperature_2m_max: '°C',
    temperature_2m_min: '°C',
  },
  daily: {
    time: ['2025-11-10', '2025-11-11'],
    temperature_2m_max: [34.7, 34.1],
    temperature_2m_min: [23.3, 22.1],
  },
};
