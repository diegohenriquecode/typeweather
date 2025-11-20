import { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{ className?: string }>;

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={[
        'rounded-2xl border border-black/5 bg-white/70 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur',
        'dark:bg-gray-800/70 dark:border-white/5',
        'min-w-0 overflow-hidden',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
