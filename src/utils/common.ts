export const formatCurrency = (amount: number): string => `$${amount.toFixed(2)}`;

export const formatDate = (isoOrMs: string | number): string => {
  const d = new Date(isoOrMs);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
