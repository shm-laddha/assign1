"use client";
import { apolloClient } from "@/lib/api";
import { ApolloProvider } from "@apollo/client";

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
