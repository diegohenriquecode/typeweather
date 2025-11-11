import { Address } from '@/types/address';
import { fetchWithTimeout, json } from '@/utils/fetchers';
import { onlyDigits } from '@/utils/cep';


interface BrasilAPICep {
  cep: string; state: string; city: string; neighborhood?: string; street?: string;
  location?: { coordinates?: { latitude?: string; longitude?: string } };
  ibge?: string;
}


interface ViaCEPCep {
  cep?: string; uf?: string; localidade?: string; bairro?: string; logradouro?: string; ibge?: string; erro?: boolean;
}


const mapBrasil = (d: BrasilAPICep): Address => ({
  cep: d.cep, uf: d.state, cidade: d.city, bairro: d.neighborhood, logradouro: d.street,
  ibge: d.ibge, lat: Number(d.location?.coordinates?.latitude) || undefined,
  lon: Number(d.location?.coordinates?.longitude) || undefined,
  provider: 'BrasilAPI'
});


const mapVia = (d: ViaCEPCep): Address => ({
  cep: d.cep || '', uf: d.uf, cidade: d.localidade, bairro: d.bairro, logradouro: d.logradouro,
  ibge: d.ibge, provider: 'ViaCEP'
});


export async function getAddress(cepRaw: string): Promise<Address> {
  const cep = onlyDigits(cepRaw);
  const primary = `https://brasilapi.com.br/api/cep/v2/${cep}`;
  const fallback = `https://viacep.com.br/ws/${cep}/json/`;


  try {
    const res = await fetchWithTimeout(primary);
    const data = await json<BrasilAPICep>(res);
    return mapBrasil(data);
  } catch (e) {
    const res2 = await fetchWithTimeout(fallback);
    const data2 = await json<ViaCEPCep>(res2);
    if ((data2 as any).erro) throw new Error('CEP não encontrado');
    return mapVia(data2);
  }
}
