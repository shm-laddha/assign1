import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { expressMiddleware } from '@apollo/server/express4';
import { establishSequelizeConnection } from './database/sql';
import { getDataLoaders, gqlServer } from './graphql/server';
import { establishMongoConnection } from './database/mongo/connection';

export const startBackendServer = async () => {
  const app: Express = express();

  await establishSequelizeConnection();
  await establishMongoConnection();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
  app.use(helmet());

  app.use('/api/health', (req, res, next) => {
    res.status(200);
    res.json({ message: 'Server is healthy' });
  });

  await gqlServer.start();
  app.use(
    '/api/graphql',
    expressMiddleware(gqlServer, {
      context: async ({ req, res }) => ({
        /* Creating new dataloader instance for each request */
        loaders: getDataLoaders()
      })
    })
  );

  return app;
};
