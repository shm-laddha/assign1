import dotenv from 'dotenv';
import { cleanEnv, host, port, str, testOnly } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    devDefault: testOnly('test'),
    choices: ['development', 'production', 'test']
  }),
  HOST: host({ default: 'localhost' }),
  PORT: port({ default: 3000 }),
  CORS_ORIGIN: str({ default: '*' }),
  PG_URL: str({
    default: 'postgresql://username:password@host/database'
  }),
  MONGO_URL: str({
    default: 'mongodb+srv://user:password@host'
  })
});
