export function formatReleaseDate(value: string | null) {
  if (!value) return null;

  const [year, month, day] = value.slice(0, 10).split('-');

  return `${year}`;
}
