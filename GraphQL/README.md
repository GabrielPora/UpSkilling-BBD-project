# DAY 5 — GraphQL fundamentals

This is extremely important because it connects your App and BFF.

### Understand:
	type User {
		id: ID!
		name: String!
		email: String!
	}

	type Query {
		user(id: ID!): User
	}

Then understand:

### Query
	query GetUser($id: ID!) {
		user(id: $id) {
			id
			name
			email
		}
	}

### Mutation
	mutation CreateUser($input: CreateUserInput!) {
		createUser(input: $input) {
			id
			name
		}
	}

### Variables
	{
	"id": "123"
	}

### Understand deeply
- Schema
- Types
- Queries
- Mutations
- Inputs
- Arguments
- Resolvers
- Context
- Errors
- Nullability
- Lists
- Fragments
- Interfaces
- Unions
- Directives
- Authentication
- Authorization
- N+1 problem
- DataLoader
- pagination
- caching

Your Java/Spring background will make the resolver/service separation fairly intuitive.