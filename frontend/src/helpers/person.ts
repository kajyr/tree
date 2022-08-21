import { BasePerson, FullPerson, PersonFromMongo } from 'types';

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

/**
 * Converts a FullPerson in a light person obj.
 * To help the modals
 */
export function fp2p(p: FullPerson): PersonFromMongo {
  const { father, mother, ...other } = p;

  return {
    ...other,
    father: father ? father._id : null,
    mother: mother ? mother._id : null
  };
}
