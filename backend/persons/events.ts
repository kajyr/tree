import { DeathEvent, LifeEvent } from 'common';

export function mkDeathEvent(event: LifeEvent): DeathEvent {
  return { type: 'death', ...event };
}
