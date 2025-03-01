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

  // it('should return an empty string if URL is invalid', () => {
  //   const url = 'https://swapi.dev/api/people/';
  //   expect(extractIdFromUrl(url)).toBe('');
  // });

  // it('should handle edge case with an empty string', () => {
  //   expect(extractIdFromUrl('')).toBe('');
  // });

  // it('should handle unexpected formats', () => {
  //   expect(extractIdFromUrl('https://example.com/')).toBe('');
  //   expect(extractIdFromUrl('invalid-url')).toBe('invalid-url');
  // });
});
