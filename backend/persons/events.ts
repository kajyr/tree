import { DeathEvent, LifeEvent } from 'types';

export function mkDeathEvent(event: LifeEvent): DeathEvent {
  return { type: 'death', ...event };
}
