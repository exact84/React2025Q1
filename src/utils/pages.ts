export default function getPageCount(total: number, limit: number) {
  return Math.ceil(total / limit);
}

export function getPages(total: number) {
  const result: number[] = [];
  for (let i = 0; i < total; i += 1) result.push(i + 1);
  return result;
}
