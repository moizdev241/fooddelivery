import { isNonEmpty, isValidPrice } from '../src/utils/validations';

describe('isNonEmpty', () => {
  it('rejects whitespace-only strings', () => {
    expect(isNonEmpty('   ')).toBe(false);
    expect(isNonEmpty('Golden Spoon')).toBe(true);
  });
});

describe('isValidPrice', () => {
  it('rejects zero, negative, and non-numeric values', () => {
    expect(isValidPrice('0')).toBe(false);
    expect(isValidPrice('-5')).toBe(false);
    expect(isValidPrice('abc')).toBe(false);
  });

  it('accepts a positive number', () => {
    expect(isValidPrice('9.99')).toBe(true);
  });
});
