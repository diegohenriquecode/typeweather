import { describe, it, expect, vi } from 'vitest';
import { BrasilApiCep62053760 } from '../mocks/response';

import { getAddress } from '@/services/cepService';

const ok = (body: any, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

describe('cepService', () => {
  it('retorna dados da BrasilAPI quando 200', async () => {
    const spy = vi.spyOn(global, 'fetch' as never)
      .mockResolvedValueOnce(ok(BrasilApiCep62053760));

    const res = await getAddress('62053760');
    expect(res.provider).toBe('BrasilAPI');
    expect(res.cidade).toBe('Sobral');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('fallback para ViaCEP quando BrasilAPI falha', async () => {
    const via = {
      cep: '62053-760',
      localidade: 'Sobral',
      uf: 'CE',
      logradouro: 'Rua X',
      bairro: 'Bairro Y',
      ibge: '2312908',
    };

    const spy = vi.spyOn(global, 'fetch' as never)
      .mockResolvedValueOnce(new Response('bad', { status: 500 }))
      .mockResolvedValueOnce(ok(via));

    const res = await getAddress('62053760');
    expect(res.provider).toBe('ViaCEP');
    expect(res.cidade).toBe('Sobral');
    expect(res.uf).toBe('CE');
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('mensagem amigável quando CEP inválido', async () => {
    const spy = vi.spyOn(global, 'fetch' as never)
      .mockResolvedValueOnce(new Response('nope', { status: 400 }))
      .mockResolvedValueOnce(ok({ erro: true }));

    await expect(getAddress('123')).rejects.toThrow(/CEP inválido|não encontrado|inexistente/i);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
