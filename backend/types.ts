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

type id = string;

export interface BasePerson {
  name?: string;
  surname?: string;
  gender?: 'male' | 'female' | null;
}
export interface Person extends BasePerson {
  father?: id;
  mother?: id;
}

export interface FullPerson extends BasePerson {
  father?: Person | null;
  mother?: Person | null;
}
