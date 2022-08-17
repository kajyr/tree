import { Db } from 'mongodb';

const COLLECTION = 'persons';

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

        const { name, surname } = req.body;
        const p: any = { name, surname };

        const c = db.collection(COLLECTION);

        const response = await c.insertOne(p);

        if (response.insertedId) {
          return p;
        }
        return {};
      },
      method: 'POST',
      url: `/api/person`
    }
  ];

  for (const route of routes) {
    fastify.route(route);
  }

  done();
}
