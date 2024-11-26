import dotenv from 'dotenv';
import logger from './logger';
import { startBackendServer } from './server';
import { env } from './config';

dotenv.config();

console.log(process.env);

const run = async () => {
  const app = await startBackendServer();

  const server = app.listen(env.PORT, () => {
    const { NODE_ENV, HOST, PORT } = env;
    logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
  });
};

run();
