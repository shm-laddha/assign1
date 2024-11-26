import { ApolloServer } from '@apollo/server';
import { resolvers } from './resolvers';
import {
  constraintDirective,
  constraintDirectiveTypeDefs
} from 'graphql-constraint-directive';
import DataLoader from 'dataloader';
import { authorService } from 'src/services/author';
import { bookService } from 'src/services/book';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './schema.graphql';

let schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typeDefs],
  resolvers
});
schema = constraintDirective()(schema);

const gqlServer = new ApolloServer({
  schema
});

const getDataLoaders = () => {
  const authorLoader = new DataLoader(async (ids: readonly string[]) => {
    authorLoader.clearAll(); // clear out cache for fetching the most updated data from the source
    const authorMap = {};
    for (const id of ids) {
      const author = await authorService.getById(id);
      if (author) {
        authorMap[id] = author;
      } else {
        authorMap[id] = null;
      }
    }
    return ids.map((id) => authorMap[id]);
  });
  const bookLoader = new DataLoader(async (ids: readonly string[]) => {
    bookLoader.clearAll(); // clear out cache for fetching the most updated data from the source
    const bookMap = {};
    for (const id of ids) {
      const book = await bookService.getById(id);
      if (book) {
        bookMap[id] = book;
      } else {
        bookMap[id] = null;
      }
    }
    return ids.map((id) => bookMap[id]);
  });
  return {
    authors: authorLoader,
    books: bookLoader
  };
};

export { gqlServer, getDataLoaders };
