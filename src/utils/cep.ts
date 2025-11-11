export const onlyDigits = (v: string) => v.replace(/\D/g, '');
export const maskCEP = (v: string) => {
  const d = onlyDigits(v).slice(0, 8);
  return d.length > 5 ? `${d.slice(0,5)}-${d.slice(5)}` : d;
};
export const isValidCep = (v: string) => /^\d{8}$/.test(onlyDigits(v));
