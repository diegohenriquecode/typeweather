import { useEffect, useState } from 'react';


type Props = { message: string; variant?: 'error' | 'success' | 'info' };
export function Toast({ message, variant = 'error' }: Props) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(id);
  }, []);
  if (!show) return null;


  const base =
    'fixed bottom-4 right-4 z-50 px-4 py-2 rounded-lg shadow-md text-white';
  const color =
    variant === 'success'
      ? 'bg-emerald-600'
      : variant === 'info'
        ? 'bg-blue-600'
        : 'bg-red-600';


  return <div className={`${base} ${color}`}>{message}</div>;
}
