import { Db, ObjectId } from 'mongodb';
import { FullPerson, Person } from 'types';

const COLLECTION = 'persons';

function getPersonFromBrody(body: Person): Person {
  const { name, surname, gender, father, mother, birth, death, deceased } = body;

  return {
    birth,
    death,
    deceased,
    father: father && new ObjectId(father),
    gender,
    mother: mother && new ObjectId(mother),
    name,
    surname
  };
}

function getCollection(fastify: any) {
  const db = fastify.mongo.client.db('tree') as Db;
  return db.collection<Person>(COLLECTION);
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

        const p = { ...getPersonFromBrody(req.body), createdAt: Date.now(), updatedAt: Date.now() };

        const response = await c.insertOne(p);

        if (response.insertedId) {
          return p;
        }
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

        const update = { ...getPersonFromBrody(req.body), updatedAt: Date.now() };

        const r = await c.findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: update });

        if (r.value) {
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
      handler: async function (req) {
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
        const full: FullPerson = p;

        if (father) {
          full.father = await c.findOne({ _id: new ObjectId(father) });
        }

        if (mother) {
          full.mother = await c.findOne({ _id: new ObjectId(mother) });
        }

        return full;
      },
      method: 'GET',
      url: `/api/person/:id`
    }
  ];

  for (const route of routes) {
    fastify.route(route);
  }

  done();
}
