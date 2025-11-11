import { useEffect, useMemo, useState } from 'react';
import { isValidCep, maskCEP, onlyDigits } from '@/utils/cep';
import { Address } from '@/types/address';
import { getAddress } from '@/services/cepService';


export function useCepLookup() {
  const [input, setInput] = useState('');
  const [masked, setMasked] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<Address | null>(null);


  useEffect(() => { setMasked(maskCEP(input)); }, [input]);

  useEffect(() => {
    setError(null);
    const d = onlyDigits(masked);
    if (d.length !== 8) return;
    const id = setTimeout(async () => {
      try {
        setLoading(true);
        const addr = await getAddress(masked);
        setAddress(addr);
      } catch (e: any) {
        setAddress(null);
        setError(e?.message || 'Erro ao consultar CEP');
      } finally { setLoading(false); }
    }, 400);
    return () => clearTimeout(id);
  }, [masked]);


  const isValid = useMemo(() => isValidCep(masked), [masked]);


  const clear = () => { setInput(''); setAddress(null); setError(null); };


  return { input, setInput, masked, isValid, loading, error, address, clear };
}
