type id = string;

export interface BasePerson {
  name?: string;
  surname?: string;
  gender?: 'male' | 'female' | null;
}

interface MongoObj {
  _id: id;
}

export interface Person extends BasePerson {
  father?: id | null;
  mother?: id | null;
}

export interface PersonFromMongo extends Person, MongoObj {}

export interface FullPerson extends BasePerson, MongoObj {
  father?: PersonFromMongo;
  mother?: PersonFromMongo;
}

export namespace Api {
  export type PersonsListResponse = { persons: PersonFromMongo[] };
  export type DetailsResponse = FullPerson;
}
