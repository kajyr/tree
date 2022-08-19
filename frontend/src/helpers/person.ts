import { Person } from 'types';

export function name(p: Person) {
  const a = [p.name || 'Unknown'];

  if (p.surname) {
    a.push(p.surname);
  }

  return a.join(' ');
}
