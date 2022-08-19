import { Db, ObjectId } from 'mongodb';

const COLLECTION = 'persons';

function getPersonFromBrody(body: any) {
  const { name, surname, gender } = body;

  return { gender, name, surname };
}

export default function (fastify, opts, done) {
  const routes = [
    {
      handler: async function () {
        const db = fastify.mongo.client.db('tree') as Db;
        const c = db.collection(COLLECTION);
        const persons = await c.find().toArray();

        return { persons };
      },
      method: 'GET',
      url: `/api/persons`
    },
    {
      handler: async function (req) {
        const db = fastify.mongo.client.db('tree') as Db;

        const p = { ...getPersonFromBrody(req.body), createdAt: Date.now(), updatedAt: Date.now() };

        const c = db.collection(COLLECTION);

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
        const db = fastify.mongo.client.db('tree') as Db;

        const { _id } = req.body;

        if (!ObjectId.isValid(_id)) {
          throw new TypeError(`Invalid id: ${_id}`);
        }

        const update = { ...getPersonFromBrody(req.body), updatedAt: Date.now() };

        const c = db.collection(COLLECTION);

        const r = await c.findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: update });

        if (r.value) {
          return r.value;
        }

        throw { message: 'Unable to find the item you are looking for', statusCode: 404 };
      },
      method: 'PUT',
      url: `/api/person`
    }
  ];

  for (const route of routes) {
    fastify.route(route);
  }

  done();
}
