import { defineConfig } from 'tsup';
import graphqlLoaderPlugin from '@luckycatfactory/esbuild-graphql-loader';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: false,
  clean: true,
  esbuildPlugins: [(graphqlLoaderPlugin as any).default()]
});
