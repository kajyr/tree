import { CytoscapeEdge, CytoscapeJSON, CytoscapeNode } from './cytoscape';
import {
  BirthEvent,
  ChildEvent,
  DeathEvent,
  Events,
  LifeEvent,
  WeddingEvent,
  deceased,
  getChildEvents,
  isDeathEvent
} from './life-events';
import { BasePerson } from './person';

export {
  BasePerson,
  BirthEvent,
  ChildEvent,
  CytoscapeEdge,
  CytoscapeJSON,
  CytoscapeNode,
  DeathEvent,
  deceased,
  getChildEvents,
  Events,
  isDeathEvent,
  LifeEvent,
  WeddingEvent
};

// To keep some output
export function foo() {
  return 5;
}

export type Maybe<T> = T | null | undefined;
export type MaybeDate = Maybe<string | Date>;

// To avoid mongo ObjectId
export type id = string;

export function name(p: BasePerson) {
  const a = [p.name || 'Unknown'];

  if (p.surname) {
    a.push(p.surname);
  }

  return a.join(' ');
}
