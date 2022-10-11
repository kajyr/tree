type id = any;

export interface LifeEvent {
  date?: string;
  place?: string;
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
}

export type Events = WeddingEvent | DeathEvent | ChildEvent;
