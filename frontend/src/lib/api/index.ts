import { env } from "@/config";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: env.SERVER_URL,
  cache: new InMemoryCache(),
});
