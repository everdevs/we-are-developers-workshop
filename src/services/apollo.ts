import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { stripIgnoredCharacters } from 'graphql';

const URI =
  'https://graphql.contentful.com/content/v1/spaces/7bzo6ocd98xl/environments/master?access_token=5pBvUN2g9nfHFeeHfnI_xUKuwzu4J67zulI1RLms6IY';
let apolloClient: ApolloClient<NormalizedCacheObject>;

export function initializeApollo(): ApolloClient<NormalizedCacheObject> {
  // Create the Apollo Client once per app execution
  if (!apolloClient) {
    apolloClient = new ApolloClient({
      ssrMode: true,
      link: ApolloLink.from([
        new RetryLink({
          delay: {
            initial: 300,
            max: Number.POSITIVE_INFINITY,
            jitter: true,
          },
          attempts: {
            max: 5,
            retryIf: (error, _operation) => Boolean(error),
          },
        }),
        new HttpLink({
          uri: URI,
          print: (ast, originalPrint) =>
            stripIgnoredCharacters(originalPrint(ast)),
        }),
      ]),
      cache: new InMemoryCache({ addTypename: false }),
      defaultOptions: {
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all',
        },
      },
    });
  }

  return apolloClient;
}
