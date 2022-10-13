import { CytoscapeJSON, LifeEvent } from 'common';
import { Collection, Db, ObjectId } from 'mongodb';
import { Person } from 'types';

import getCytoscapeJson from './cytoscape';
import setChildrenDate from './set-children-date';
import { DAL } from './types';
import setChildren from './update-children';
import updateParents from './update-parents';

const COLLECTION = 'persons';

function getPersonFromBody(body: Person & { death: LifeEvent }): Person {
  const { name, surname, gender, father, mother, birth, events = [] } = body;

  return {
    birth,
    events,
    father: father && new ObjectId(father),
    gender,
    mother: mother && new ObjectId(mother),
    name,
    surname
  };
}

function mkDal(c: Collection): DAL {
  return {
    findOne: (_id: ObjectId) => c.findOne({ _id }),
    findOneAndUpdate: (_id: ObjectId, update: Partial<Person>) => c.findOneAndUpdate({ _id }, { $set: update })
  };
}

function getCollection(fastify: any) {
  const db = fastify.mongo.client.db('tree') as Db;
  return db.collection<Person>(COLLECTION);
}

function getChildren(c: Collection<Person>, id: ObjectId) {
  return c.find({ $or: [{ father: id }, { mother: id }] }).toArray();
}

export interface DetailsApiResponse {
  person: Person;
  father?: Person | null;
  mother?: Person | null;
  children: Person[];
  cytoscape?: CytoscapeJSON;
}

export default function (fastify, opts, done) {
  const routes = [
    {
      handler: async function () {
        const c = getCollection(fastify);
        const persons = await c.find().toArray();

        return { persons };
      },
      method: 'GET',
      url: `/api/persons`
    },
    {
      handler: async function (req) {
        const c = getCollection(fastify);

        const p = { ...getPersonFromBody(req.body), createdAt: Date.now(), updatedAt: Date.now() };

        const response = await c.insertOne(p);

        if (!response.insertedId) {
          return {};
        }

        p._id = response.insertedId;
        const dal = mkDal(c);
        await setChildren(dal, p);
        await updateParents(dal, p);

        return {};
      },
      method: 'POST',
      url: `/api/person`
    },
    {
      handler: async function (req) {
        const c = getCollection(fastify);
        const { _id } = req.body;

        if (!ObjectId.isValid(_id)) {
          throw new TypeError(`Invalid id: ${_id}`);
        }

        const update = { ...getPersonFromBody(req.body), updatedAt: Date.now() };

        const r = await c.findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: update });

        if (r.value) {
          const dal = mkDal(c);
          await setChildren(dal, r.value);
          await updateParents(dal, r.value);

          return r.value;
        }

        throw { message: 'Unable to find the item you are looking for', statusCode: 404 };
      },
      method: 'PUT',
      url: `/api/person`
    },
    {
      handler: async function (req) {
        const c = getCollection(fastify);
        const { _id } = req.body;

        if (!ObjectId.isValid(_id)) {
          throw new TypeError(`Invalid id: ${_id}`);
        }

        await c.deleteOne({ _id: new ObjectId(_id) });
      },
      method: 'DELETE',
      url: `/api/person`
    },
    {
      handler: async function (req): Promise<DetailsApiResponse> {
        const c = getCollection(fastify);
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
          throw new TypeError(`Invalid id: ${id}`);
        }

        const person = await c.findOne({ _id: new ObjectId(id) });

        if (!person) {
          throw { message: 'Id not found' };
        }

        const { father, mother, ...p } = person;

        const children = await getChildren(c, new ObjectId(id));
        const response: DetailsApiResponse = { children, person: p };

        if (father) {
          response.father = await c.findOne({ _id: new ObjectId(father) });
        }

        if (mother) {
          response.mother = await c.findOne({ _id: new ObjectId(mother) });
        }
        const dal = mkDal(c);
        response.person = await setChildrenDate(dal, response.person);

        response.cytoscape = getCytoscapeJson(response.person, response.father, response.mother, children);

        return response;
      },
      method: 'GET',
      url: `/api/person/:id`
    },
    {
      handler: async function (req): Promise<CytoscapeJSON> {
        const c = getCollection(fastify);
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
          throw new TypeError(`Invalid id: ${id}`);
        }

        const person = await c.findOne({ _id: new ObjectId(id) });

        if (!person) {
          throw { message: 'Id not found' };
        }

        const { father: fatherId, mother: motherId } = person;

        const children = await getChildren(c, new ObjectId(id));
        const father = fatherId ? await c.findOne({ _id: new ObjectId(fatherId) }) : null;
        const mother = motherId ? await c.findOne({ _id: new ObjectId(motherId) }) : null;

        return getCytoscapeJson(person, father, mother, children);
      },
      method: 'GET',
      url: `/api/person/:id/cytoscape-links`
    }
  ];

  for (const route of routes) {
    fastify.route(route);
  }

  done();
}
