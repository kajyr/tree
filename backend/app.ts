import fastify from 'fastify';
import path from 'path';
import { Logger } from 'pino';

const PUBLIC_PATH = path.join(__dirname, '..', 'public');

type Options = { logger: Logger | boolean; mongoUrl: string };

async function build(opts: Options) {
  const app = await fastify({ logger: opts.logger });
  app.register(require('fastify-log'));
  app.register(require('fastify-routes-table'));

  await app.register(require('./bootstrap'));

  await app.register(require('@fastify/mongodb'), {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,
    url: opts.mongoUrl
  });

  // Block other api
  app.route({
    handler: (req, reply) => {
      reply.code(404).send();
    },
    method: ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'OPTIONS'],
    url: '/api/*'
  });

  app.register(require('@fastify/static'), {
    root: PUBLIC_PATH
  });

  app.setNotFoundHandler((_, reply) => {
    //@ts-ignore This is added by a fastify plugin
    reply.sendFile('index.html');
  });

  app.get('/', (_, reply) => {
    //@ts-ignore This is added by a fastify plugin
    reply.sendFile('index.html');
  });

  return app;
}

export default build;
