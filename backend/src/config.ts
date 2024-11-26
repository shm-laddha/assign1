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
    default:
      'postgresql://root:F3sI1Fg5e193VsjZUk7kxTfNu1y8WpQK@dpg-ct2mudhu0jms738t5me0-a.singapore-postgres.render.com/db_prod_65wm'
  }),
  MONGO_URL: str({
    default:
      'mongodb+srv://user:password@123@cluster0.si6ez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  })
});
