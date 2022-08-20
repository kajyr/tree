import { Db, ObjectId } from 'mongodb';

const COLLECTION = 'persons';

function getPersonFromBrody(body: any) {
  const { name, surname, gender } = body;

  return { gender, name, surname };
}

function getCollection(fastify: any) {
  const db = fastify.mongo.client.db('tree') as Db;
  return db.collection(COLLECTION);
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
    }
  ];

  for (const route of routes) {
    fastify.route(route);
  }

  done();
}
