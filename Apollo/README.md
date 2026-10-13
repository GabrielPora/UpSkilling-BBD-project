# DAY 6 — Apollo Client

Now connect GraphQL to React Native.

Apollo Client provides the client-side GraphQL layer, including the cache, error handling and React integration. Apollo GraphQL

### Learn:
	const { data, loading, error } = useQuery(GET_USER);

Then understand what actually happens.

	React Component
		↓
	useQuery()
		↓
	Apollo Client
		↓
	Cache?
		↓
	Network
		↓
	GraphQL
		↓
	BFF

### Must understand
- ApolloProvider
- useQuery
- useMutation
- useLazyQuery
- variables
- loading/error states
- normalized cache
- cache policies
- cache invalidation
- refetch
- optimistic updates
- pagination
- fragments
- GraphQL code generation
- authentication headers
- error handling
- network failures

Apollo explicitly supports TypeScript typing for GraphQL operations, so understand how generated operation types fit into the application. [Apollo and Typescript](https://www.apollographql.com/docs/react/data/typescript)

