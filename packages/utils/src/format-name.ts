export function splitName(name: string) {
  const parts = name.trim().split(/\s+/);

  if (parts.length < 2) {
    return { first: parts[0] ?? '', last: '\u00A0' };
  }

  return {
    first: parts.slice(0, -1).join(' '),
    last: parts[parts.length - 1],
  };
}
