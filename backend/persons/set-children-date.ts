import { Events, name } from 'common';
import { ObjectId } from 'mongodb';
import { Person } from 'types';

import { DAL } from './types';

/**
 * Aggiorna le date degli eventi 'child' in base alla data di nascita del figlio
 */
async function setChildrenDate(dal: DAL, self: Person): Promise<Person> {
  if (!self.events || self.events.length === 0) {
    return self;
  }

  const events: Events[] = [];
  for (const e of self.events) {
    if (e.type !== 'child') {
      events.push(e);
      continue;
    }

    const child = await dal.findOne(new ObjectId(e.child));
    if (child) {
      events.push({ ...e, ...child.birth, fullName: name(child) });
    }
  }

  return { ...self, events };
}

export default setChildrenDate;
