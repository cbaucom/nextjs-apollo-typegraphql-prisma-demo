import { useMemo } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";

let apolloClient;

function createIsomorphLink() {
  const { HttpLink } = require("@apollo/client/link/http");
  return new HttpLink({
    uri: "/api/graphql",
    credentials: "same-origin",
  });
}

async function createIsomorphLinkAsync() {
  if (typeof window === "undefined") {
    console.log("serverside apollo");
    const { SchemaLink } = require("@apollo/client/link/schema");
  } else {
    const { HttpLink } = require("@apollo/client/link/http");
    return new HttpLink({
      uri: "/api/graphql",
      credentials: "same-origin",
    });
  }
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  });
}

async function createApolloClientAsync() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: await createIsomorphLinkAsync(),
    cache: new InMemoryCache(),
  });
}

export async function initializeApolloAsync(initialState = null) {
  const _apolloClient = apolloClient ?? (await createApolloClientAsync());

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
