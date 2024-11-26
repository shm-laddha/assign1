import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'src/graphql/schema.graphql',
  generates: {
    'src/graphql/grqphql.d.ts': {
      plugins: ['typescript', 'typescript-resolvers']
    }
  }
};

export default config;
