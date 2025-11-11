import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { maskCEP } from '@/utils/cep';
import Card from '@/components/UI/Card';
import Spinner from '@/components/UI/Spinner';
import { Toast } from '@/components/UI/Toast';
import { useCepLookup } from '@/hooks/useCepLookup';
import { useHistory } from '@/hooks/useHistory';


const schema = z.object({ cep: z.string().min(8) });

type Form = { cep: string };

export default function CepForm({ onResolved }: { onResolved: (a: any) => void }) {
  const { register, watch, setValue } = useForm<Form>({ resolver: zodResolver(schema) });
  const { input, setInput, masked, isValid, loading, error, address, clear } = useCepLookup();
  const { add, clear: clearHistory } = useHistory();

  const cepWatch = watch('cep');
  useEffect(() => { setInput(cepWatch || ''); }, [cepWatch, setInput]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = maskCEP(e.target.value);
    setValue('cep', v, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  }

  function handleUseAddress() {
    if (!address) return;
    onResolved(address);
    add({ cep: address.cep, cityUF: `${address.cidade}/${address.uf}`, timestamp: new Date().toISOString(), lat: address.lat, lon: address.lon });
    clear();
    setValue('cep', '');
  }

  return (
    <Card>
      <div className="flex flex-col gap-3">
        <label htmlFor="cep" className="text-sm font-medium">CEP</label>
        <div className="flex gap-2">
          <input
            id="cep"
            inputMode="numeric"
            placeholder="00000-000"
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-base shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-blue-900"
            {...register('cep')}
            onChange={handleChange}
            aria-invalid={!isValid}
          />
          <button
            type="button"
            onClick={() => setValue('cep', '')}
            className="rounded-xl border border-black/5 bg-white px-3 py-2 text-sm shadow hover:bg-gray-50 dark:bg-gray-800 dark:border-white/10 dark:hover:bg-gray-700"
          >Limpar</button>
        </div>


        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <Spinner /> Consultando…
          </div>
        )}


        {address && (
          <div className="grid gap-1 text-sm">
            <div><b>CEP:</b> {address.cep}</div>
            <div><b>Logradouro:</b> {address.logradouro || '-'}</div>
            <div><b>Bairro:</b> {address.bairro || '-'}</div>
            <div><b>Cidade/UF:</b> {address.cidade}/{address.uf}</div>
            <div><b>IBGE:</b> {address.ibge || '-'}</div>
            <div><b>Coord.:</b> {address.lat ?? '?'} , {address.lon ?? '?'}</div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-gray-500">Provedor: {address.provider}</span>
              <div className="flex gap-2">
                <button onClick={handleUseAddress} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700">Usar endereço</button>
                <button onClick={() => clearHistory()} className="rounded-xl bg-gray-100 px-3 py-2 text-xs text-gray-700 shadow hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">Limpar histórico</button>
              </div>
            </div>
          </div>
        )}


        {!loading && !address && (
          <p className="text-xs text-gray-500">Digite um CEP válido (8 dígitos) para consultar.</p>
        )}
        </div>
    </Card>)}
