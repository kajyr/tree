import { Events, LifeEvent } from 'common';
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

export interface BasePerson {
  _id?: id;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | null;
  name?: string;
  surname?: string;
  birth?: LifeEvent;
  death?: LifeEvent;
  deceased?: boolean; // move to a fn that checks if event: death
  events: Events[];
}
export interface Person extends BasePerson {
  father?: id;
  mother?: id;
}
