import { forwardRef } from 'react';


type Props = React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string };
const Select = forwardRef<HTMLSelectElement, Props>(({ label, className = '', ...rest }, ref) => {
  return (
    <label className="flex items-center gap-3">
      {label && <span className="min-w-24 text-sm text-gray-700 dark:text-gray-300">{label}</span>}
      <select
        ref={ref}
        className={`rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-blue-900 ${className}`}
        {...rest}
      />
    </label>
  );
});
export default Select;
