export type Address = {
  cep: string;
  logradouro?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  ibge?: string;
  lat?: number;
  lon?: number;
  provider: 'BrasilAPI' | 'ViaCEP';
};
