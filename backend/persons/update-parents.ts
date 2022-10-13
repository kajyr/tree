import { Events, getChildEvents } from 'common';
import { Person } from 'types';

import { DAL } from './types';

async function updateParent(dal: DAL, self: Person, role: string) {
  const selfId = self._id;

  if (!self[role]) {
    return;
  }
  const roleId = self[role];

  const parent = await dal.findOne(roleId);

  if (!parent) {
    return;
  }
  const childEvents = getChildEvents(parent) || [];

  const hasChild = childEvents.find(e => String(e.child) === String(selfId));

  if (hasChild) {
    return;
  }

  const events = ((parent.events || []) as Events[]).concat({ child: String(selfId), type: 'child' });

  await dal.findOneAndUpdate(roleId, { events });
}
/**
 * Imposta se stesso come figlio dei suoi genitori
 */
async function updateParents(dal: DAL, self: Person) {
  await updateParent(dal, self, 'father');
  await updateParent(dal, self, 'mother');
}

export default updateParents;
