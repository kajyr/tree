import { Db } from 'mongodb';

export default function (fastify, opts, done) {
  const routes = [
    {
      handler: async function () {
        //@ts-ignore
        const db = this.mongo.db as Db;

        const persons = await db.collection('persons').find();

        return { persons };
      },
      method: 'GET',
      url: `/api/bootstrap`
    }
  ];

  for (const route of routes) {
    fastify.route(route);
  }

  done();
}
