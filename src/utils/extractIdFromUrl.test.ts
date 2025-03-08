import { describe, it, expect } from 'vitest';
import { extractIdFromUrl } from './extractIdFromUrl';

describe('extractIdFromUrl', () => {
  it('should extract the ID from a valid URL', () => {
    const url = 'https://swapi.dev/api/people/10/';
    expect(extractIdFromUrl(url)).toBe('10');
  });

  it('should handle URLs without a trailing slash', () => {
    const url = 'https://swapi.dev/api/people/10';
    expect(extractIdFromUrl(url)).toBe('10');
  });
});
