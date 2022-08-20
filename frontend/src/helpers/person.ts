import { BasePerson, FullPerson, PersonFromMongo } from 'types';

export function name(p: BasePerson) {
  const a = [p.name || 'Unknown'];

  if (p.surname) {
    a.push(p.surname);
  }

  return a.join(' ');
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
