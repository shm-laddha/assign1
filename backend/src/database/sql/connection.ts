import { Sequelize, importModels } from '@sequelize/core';
import { env } from '../../config';
import { createAssociations } from './models';
import { Author, Book } from './models';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  schema: 'public',
  models: [Author, Book],
  url: env.PG_URL
});

createAssociations();

export const establishSequelizeConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;
