import { describe, it, expect } from 'vitest';
import getPageCount, { getPages } from './pages';

describe('getPageCount', () => {
  it('should return the correct number of pages', () => {
    expect(getPageCount(100, 10)).toBe(10);
    expect(getPageCount(55, 10)).toBe(6);
    expect(getPageCount(0, 10)).toBe(0);
    expect(getPageCount(9, 10)).toBe(1);
  });
});

describe('getPages', () => {
  it('should return an array of page numbers', () => {
    expect(getPages(5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPages(0)).toEqual([]);
    expect(getPages(1)).toEqual([1]);
    expect(getPages(10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
