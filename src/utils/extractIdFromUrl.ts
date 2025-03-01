export const extractIdFromUrl = (url: string): string => {
  const parts = url.split('/').filter(Boolean);
  return parts.length > 1 ? parts[parts.length - 1] : '';
};
