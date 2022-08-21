import { ObjectId } from 'mongodb';

export namespace Server {
  export type Route = {
    method: 'GET';
    schema: any;
    url: string;
    logLevel: string;
    prefix: string;
    bodyLimit: unknown;
    handler: () => void;
  };

  export type RouteBlock = {
    get?: Route;
    post?: Route;
    put?: Route;
    options?: Route;
    patch?: Route;
    head?: Route;
    delete?: Route;
  };

  export type FastifyRoutesMap = Record<string, RouteBlock>;
}

type id = ObjectId;

interface LifeEvent {
  date?: string;
  place?: string;
}

export interface BasePerson {
  dateOfBirth?: string;
  gender?: 'male' | 'female' | null;
  name?: string;
  surname?: string;
  birth?: LifeEvent;
  death?: LifeEvent;
  deceased?: boolean;
}
export interface Person extends BasePerson {
  father?: id;
  mother?: id;
}

export interface FullPerson extends BasePerson {
  father?: Person | null;
  mother?: Person | null;
}
