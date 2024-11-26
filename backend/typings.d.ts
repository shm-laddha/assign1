declare module '*.graphql' {
  import { GraphQLSchema } from 'graphql';
  const schema: GraphQLSchema;
  export default schema;
}
