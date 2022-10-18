import { Maybe, id } from './';
import { BasePerson } from './person';

export interface LifeEvent {
  date?: string | Date;
  place?: string;
}

export interface BirthEvent extends LifeEvent {
  type: 'birth';
}

export interface WeddingEvent extends LifeEvent {
  type: 'wedding';
  partner?: id;
}

export interface DeathEvent extends LifeEvent {
  type: 'death';
}

export interface ChildEvent extends LifeEvent {
  type: 'child';
  child?: id;
  fullName?: string;
}

export type Events = BirthEvent | WeddingEvent | DeathEvent | ChildEvent;

export function deceased(person: BasePerson): Maybe<DeathEvent> {
  return person.events?.find(e => e.type === 'death') as Maybe<DeathEvent>;
}

export function isDeathEvent(event: Maybe<Events>): event is DeathEvent {
  return event?.type === 'death';
}

export function getChildEvents(person: BasePerson): Maybe<ChildEvent[]> {
  return person.events?.filter(e => e.type === 'child' && e.child) as Maybe<ChildEvent[]>;
}
