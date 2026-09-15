export const isNonEmpty = (value: string): boolean => value.trim().length > 0;

export const isValidPrice = (value: string): boolean => {
  const price = Number(value);
  return !Number.isNaN(price) && price > 0;
};
