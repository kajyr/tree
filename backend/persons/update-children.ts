import { getChildEvents } from 'common';
import { ObjectId } from 'mongodb';
import { Person } from 'types';

import { DAL } from './types';

/**
 * Imposta se stesso come padre o madre a tutti i figli
 */
async function updateChildren(dal: DAL, self: Person) {
  const childEvents = getChildEvents(self);
  if (!childEvents || childEvents.length === 0) {
    return;
  }
  const selfId = new ObjectId(self._id);
  const role = self.gender === 'female' ? 'mother' : 'father';

  for (const e of childEvents) {
    await dal.findOneAndUpdate(new ObjectId(e.child), { [role]: selfId });
  }
}

export default updateChildren;
