import { CytoscapeJSON } from 'common';

type id = string;

interface LifeEvent {
  date?: string | Date;
  place?: string;
}
export interface BasePerson {
  name?: string;
  surname?: string;
  gender?: 'male' | 'female' | null;
  birth?: LifeEvent;
  death?: LifeEvent;
  deceased?: boolean;
}

interface MongoObj {
  _id: id;
}

export interface Person extends BasePerson {
  father?: id | null;
  mother?: id | null;
}

export interface PersonFromMongo extends Person, MongoObj {}

export namespace Api {
  export type PersonsListResponse = { persons: PersonFromMongo[] };
  // TODO wire this to the shared types
  export type DetailsResponse = {
    person: PersonFromMongo;
    cytoscape: CytoscapeJSON;
    father?: PersonFromMongo;
    mother?: PersonFromMongo;
  };
}
