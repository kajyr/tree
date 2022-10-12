import { BasePerson, CytoscapeJSON } from 'common';

type id = string;
interface MongoObj {
  _id: id;
}
export interface Person extends BasePerson, MongoObj {
  father?: id | null;
  mother?: id | null;
}

export type PersonFromMongo = Person;
export type PersonWithoutId = Omit<Person, '_id'>;

export namespace Api {
  export type PersonsListResponse = { persons: Person[] };
  // TODO wire this to the shared types
  export type DetailsResponse = {
    person: Person;
    cytoscape: CytoscapeJSON;
    father?: Person;
    mother?: Person;
  };
}
