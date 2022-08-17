export interface Person {
  name?: string;
  surname?: string;
}
export interface PersonFromMongo extends Person {
  _id: string;
}

export namespace Api {
  export type PersonsListResponse = { persons: PersonFromMongo[] };
}
