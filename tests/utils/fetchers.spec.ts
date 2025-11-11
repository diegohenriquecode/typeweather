import { describe, it, expect, vi } from 'vitest';
import { fetchWithTimeout, json } from '@/utils/fetchers';

describe('fetchers', () => {
  it('json() retorna o body em JSON quando ok', async () => {
    const res = new Response(JSON.stringify({ ok: true }), { status: 200 });
    await expect(json<{ ok: boolean }>(res)).resolves.toEqual({ ok: true });
  });

  it('json() lança erro quando status != 2xx', async () => {
    const res = new Response('nope', { status: 404 });
    await expect(json(res)).rejects.toThrow('404');
  });

  it('fetchWithTimeout repassa signal e opções', async () => {
    const orig = global.fetch;
    global.fetch = vi.fn().mockResolvedValue(new Response('OK', { status: 200 }));

    const res = await fetchWithTimeout('https://x.y', { method: 'GET', timeout: 1000 });
    expect(res.ok).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith('https://x.y', expect.objectContaining({ method: 'GET', signal: expect.any(AbortSignal) }));

    global.fetch = orig;
  });
});
