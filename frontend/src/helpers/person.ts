import { BasePerson } from 'types';

export function name(p: BasePerson) {
  const a = [p.name || 'Unknown'];

  if (p.surname) {
    a.push(p.surname);
  }

  return a.join(' ');
}

export function initials(p: BasePerson) {
  const name = p.name || 'U';
  const a = [name.charAt(0)];

  if (p.surname) {
    a.push(p.surname.charAt(0));
  }

  return a.join(' ');
}

/**
 * Gender to color
 */
export function g2c(gender: string | null | undefined) {
  if (gender === 'male') {
    return 'blue';
  }
  if (gender === 'female') {
    return 'pink';
  }

  return 'gray';
}
