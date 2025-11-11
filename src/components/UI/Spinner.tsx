export default function Spinner({ label = 'Carregando' }: { label?: string }) {
  return (
    <div className="flex items-center gap-2" role="status" aria-live="polite" aria-label={label}>
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      <span className="text-sm text-gray-600 dark:text-gray-300 sr-only">{label}</span>
    </div>
  );
}
