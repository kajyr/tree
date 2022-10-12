import { Events, LifeEvent } from './life-events';

// We skip the id here
// because this might also refer to a newly created person
// not in mongo yet
export interface BasePerson {
  gender?: 'male' | 'female' | null;
  name?: string;
  surname?: string;
  birth?: LifeEvent;
  events?: Events[];
}
