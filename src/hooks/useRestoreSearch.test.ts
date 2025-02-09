import { renderHook, act } from '@testing-library/react';
import { useRestoreSearch } from '../hooks/useRestoreSearch';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useRestoreSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with the value from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('saved query');
    const { result } = renderHook(() => useRestoreSearch());
    expect(result.current[0]).toBe('saved query');
  });

  it('should update localStorage when query changes', () => {
    localStorageMock.getItem.mockReturnValue('');
    const { result } = renderHook(() => useRestoreSearch());

    act(() => {
      result.current[1]('new query');
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'queryString',
      'new query'
    );
  });

  it('should use a custom storage key if provided', () => {
    localStorageMock.getItem.mockReturnValue('custom value');
    const { result } = renderHook(() => useRestoreSearch('customKey'));
    expect(result.current[0]).toBe('custom value');

    act(() => {
      result.current[1]('updated custom query');
    });
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'customKey',
      'updated custom query'
    );
  });
});
