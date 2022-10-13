import pino from 'pino';

import app from './app';
import pkg from './package.json';

require('dotenv').config();

const PORT = 4445;

const nodeEnv = (process.env.NODE_ENV || 'development').toLowerCase();
const isDev = nodeEnv === 'development';

const mongoHost = process.env.MONGO_HOST;

const logger = pino({
  transport: {
    options: {
      colorize: true
    },
    target: 'pino-pretty'
  }
});

const init = async () => {
  const server = await app({
    logger: isDev ? false : false,
    mongoUrl: `mongodb://${mongoHost}`
  });

  try {
    await server.listen({ host: '0.0.0.0', port: PORT });
  } catch (err) {
    server.log.fatal(err);
    process.exit(1);
  }

  console.log('----');
  console.log('Server version:', pkg.version);
  console.log('Mongo server:', mongoHost);
  console.log();

  //@ts-ignore This is added by a fastify plugin
  server.logRoutes();
};

init();
