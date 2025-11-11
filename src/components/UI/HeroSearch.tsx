import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { maskCEP, onlyDigits, isValidCep } from '@/utils/cep';
import { getAddress } from '@/services/cepService';
import { useState } from 'react';
import Spinner from '@/components/UI/Spinner';
import { Toast } from '@/components/UI/Toast';
import { useSearchHistory } from "@/hooks/useSearchHistory";

const schema = z.object({
  cep: z.string().min(8, 'Informe 8 dígitos'),
});

type Props = {
  onResolved: (address: { cidade: string; uf: string; lat?: number; lon?: number }) => void;
  variant?: 'default' | 'compact';
};

export default function HeroSearch({ onResolved, variant = 'default' }: Props) {
  const { register, handleSubmit, setValue, watch } = useForm<{ cep: string }>({
    resolver: zodResolver(schema),
    defaultValues: { cep: '' },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cepWatch = watch('cep');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = maskCEP(e.target.value);
    setValue('cep', v, { shouldValidate: true });
  }
  const { add } = useSearchHistory(10);

  async function onSubmit(values: { cep: string }) {
    setError(null);
    const raw = onlyDigits(values.cep);
    if (!isValidCep(raw)) {
      setError('CEP inválido. Use 8 dígitos.');
      return;
    }
    try {
      setLoading(true);
      const addr = await getAddress(raw);
      onResolved({ cidade: addr.cidade!, uf: addr.uf!, lat: addr.lat, lon: addr.lon });
      add({
        cep: raw,
        cidade: addr.cidade!,
        uf: addr.uf!,
        lat: addr.lat,
        lon: addr.lon,
        ts: Date.now(),
      });
    } catch (e: any) {
      setError(e?.message || 'Erro ao consultar CEP');
    } finally {
      setLoading(false);
    }
  }

  const wrap = variant === 'compact' ? 'max-w-2xl' : 'max-w-xl';
  const inputClass =
    variant === 'compact'
      ? 'w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/60 shadow outline-none transition focus:border-blue-400/60 focus:ring-4 focus:ring-blue-500/20'
      : 'w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder-white/60 shadow outline-none transition focus:border-blue-400/60 focus:ring-4 focus:ring-blue-500/20';
  const btnClass = variant === 'compact'
    ? 'rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow transition hover:bg-blue-700'
    : 'rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow transition hover:bg-blue-700';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`mx-auto w-full ${wrap}`}>
      <div className="flex items-center gap-2">
        <input
          type="text"
          inputMode="numeric"
          placeholder="Buscar CEP (00000-000)"
          className={inputClass}
          {...register('cep')}
          onChange={handleChange}
          value={cepWatch}
          aria-label="CEP"
          disabled={loading}
        />
        <button type="submit" className={btnClass + ' cursor-pointer'} disabled={loading}>
          {loading ? <Spinner label="Buscando" /> : 'Buscar'}
        </button>
      </div>
      {error && (
        <div className="mt-3">
          <Toast message={error} />
        </div>
      )}
    </form>
  );
}
