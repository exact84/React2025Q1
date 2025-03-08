export const extractIdFromUrl = (url?: string): string | undefined => {
  if (!url) return;
  const cleanUrl = url.split('?')[0];
  const parts = cleanUrl.split('/').filter(Boolean);
  return parts.length > 1 ? parts[parts.length - 1] : '';
};
