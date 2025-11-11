import { renderHook, act } from '@testing-library/react';
import { useSearchHistory } from '@/hooks/useSearchHistory';

describe('useSearchHistory', () => {
  beforeEach(() => localStorage.clear());

  it('adiciona, evita duplicados e respeita limite', () => {
    const { result } = renderHook(() => useSearchHistory(2));

    act(() =>
      result.current.add({ cep: '62053760', cidade: 'Sobral', uf: 'CE', ts: Date.now() })
    );
    expect(result.current.items).toHaveLength(1);

    act(() =>
      result.current.add({ cep: '62053760', cidade: 'Sobral', uf: 'CE', ts: Date.now() })
    );
    expect(result.current.items).toHaveLength(1);

    act(() =>
      result.current.add({ cep: '01001000', cidade: 'São Paulo', uf: 'SP', ts: Date.now() })
    );
    expect(result.current.items).toHaveLength(2);

    act(() =>
      result.current.add({ cep: '30140071', cidade: 'Belo Horizonte', uf: 'MG', ts: Date.now() })
    );
    expect(result.current.items).toHaveLength(2);
  });
});
