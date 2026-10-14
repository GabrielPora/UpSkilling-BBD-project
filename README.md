Absolutely. With your background, **2 weeks is aggressive but realistic for becoming operationally team-lead-level**, provided we define “team lead level” correctly.

You are **not** going to become a 5-year expert in React Native, GraphQL, Keycloak, Dynatrace, etc. in 14 days. But you can get to the point where you can:

- Read and understand the codebase.
- Make architectural decisions.
- Review PRs intelligently.
- Debug production issues.
- Explain trade-offs to developers.
- Design new features.
- Identify bad patterns.
- Lead implementation discussions.
- Know when to go into documentation rather than guessing.

And importantly, **you already have a lot of the underlying engineering knowledge**. Your biggest gap is the ecosystem and its conventions, not fundamental software engineering.

---

# 1. Your priority order

I would **not** give every technology equal study time.

### 🔴 Tier 1 — Must be strong

| Technology | Priority | Why |
|---|---:|---|
| TypeScript | 🔴 Critical | Everything depends on it |
| React / React Native | 🔴 Critical | Core ClarityApp |
| Expo + Expo Router | 🔴 Critical | Application architecture/navigation |
| GraphQL | 🔴 Critical | App ↔ BFF architecture |
| Apollo Client | 🔴 Critical | Frontend data layer |
| Node + TypeScript | 🔴 Critical | BFF |
| Apollo Server + Express | 🔴 Critical | BFF |
| Keycloak | 🔴 Critical | Authentication/authorization |
| EAS Build + Azure DevOps | 🔴 Critical | Delivery/release |

### 🟠 Tier 2 — Team-lead working knowledge

| Technology | Priority |
|---|---:|
| React Native Web | 🟠 |
| Keycloakify | 🟠 |
| Vitest | 🟠 |
| Storybook | 🟠 |
| ESLint | 🟠 |
| Dynatrace | 🟠 |

### 🟡 Tier 3 — Integration knowledge

| Technology | Priority |
|---|---:|
| Pushwoosh | 🟡 |
| Intercom | 🟡 |

For Pushwoosh and Intercom, you don't need to become the person who knows every SDK method. You need to understand **how they fit into the application architecture, lifecycle, authentication, events, failure modes and release process.**

---

# 2. The architecture you need in your head

This is the most important thing.

Think of the system as:

```text
                    ┌─────────────────────┐
                    │     ClarityApp      │
                    │                     │
                    │ React Native        │
                    │ Expo                │
                    │ Expo Router         │
                    │ React Native Web    │
                    │                     │
                    │ Apollo Client       │
                    └──────────┬──────────┘
                               │
                         GraphQL requests
                               │
                               ▼
                    ┌─────────────────────┐
                    │     ClarityBFF      │
                    │                     │
                    │ Node.js             │
                    │ TypeScript          │
                    │ Express             │
                    │ Apollo Server       │
                    └──────────┬──────────┘
                               │
                     APIs / services / DB
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
          Backend A        Backend B        Backend C


Authentication
      │
      ▼
   Keycloak
      │
      ├── Authentication
      ├── Tokens
      ├── Roles
      └── Identity


Supporting platform
      │
      ├── Pushwoosh → Push notifications
      ├── Intercom  → Customer communication
      ├── Dynatrace → Observability
      ├── Storybook → Component development
      ├── Vitest    → Testing
      └── ESLint    → Code quality


Delivery
      │
      ▼
Azure DevOps
      │
      └── EAS Build
              │
              ├── Android
              ├── iOS
              └── Web
```

If you understand that diagram deeply, you're already halfway there.

---

# 3. Your 14-day crash programme

I'm assuming approximately **6–8 focused hours per day**.

If you only have 3–4 hours/day, I'd change the programme rather than simply trying to cram everything in.

---

## DAY 1 — TypeScript at senior level

You already know TypeScript, so **do not waste the day learning syntax**.

Focus on the things that differentiate a junior TS developer from someone reviewing architecture.

### Learn

- `interface` vs `type`
- unions
- intersections
- generics
- narrowing
- discriminated unions
- type guards
- `unknown` vs `any`
- `never`
- `keyof`
- `typeof`
- indexed access types
- mapped types
- conditional types
- utility types
- function typing
- async/Promise types
- module patterns
- strict mode
- declaration files

TypeScript's own documentation specifically covers generics, type operators, mapped/conditional types and utility types. [TypeScript](https://www.typescriptlang.org/docs/handbook/generics.html?utm_source=chatgpt.com)

### Team-lead test

You should be able to explain:

> Why is `unknown` generally safer than `any`?

> When would you use a discriminated union?

> Why would you use a generic instead of duplicating interfaces?

> What does `strict` actually protect us from?

> When does TypeScript stop protecting us because the problem is runtime data?

That last one is **very important**.

For example:

```typescript
type User = {
    id: string;
    name: string;
};

const response = await fetch("/user");

const user = await response.json() as User;
```

That does **not** mean the API returned a valid `User`.

You've only told TypeScript:

> "Trust me."

That's where runtime validation/schema contracts become important.

---

# DAY 2 — React architecture

Don't study React as:

> "How do I make a component?"

You need:

> "How do I structure a large React application?"

### Learn

- Functional components
- props
- state
- hooks
- `useEffect`
- `useMemo`
- `useCallback`
- `useRef`
- custom hooks
- context
- component composition
- controlled/uncontrolled components
- rendering lifecycle
- dependency arrays
- stale closures
- state ownership
- memoisation
- performance
- error boundaries
- platform-specific components

### Critical team-lead question

**When should state live where?**

You need to be comfortable discussing:

```text
Component state
      ↓
Parent state
      ↓
Context
      ↓
Server state
      ↓
Global state
```

And importantly:

**Apollo cache is server state.**

Don't automatically shove API data into some separate global state store.

---

# DAY 3 — React Native + Expo

This is where you start becoming dangerous. 😄

Learn the differences between:

```text
React
React Native
React Native Web
Expo
Expo Router
```

React Native uses components such as:

```typescript
<View>
<Text>
<Pressable>
<ScrollView>
<Image>
<TextInput>
```

rather than normal DOM elements.

React Native Web allows many of those components to target the browser; Expo describes RN Web as wrapping React DOM primitives and enabling significant code reuse across platforms. [Expo documentation](https://docs.expo.dev/workflow/web/?utm_source=chatgpt.com)

### Understand

```text
                 Shared code
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
      iOS / Android          Web
          │                   │
    React Native        React Native Web
```

Then learn:

- `Platform`
- `.ios.tsx`
- `.android.tsx`
- `.web.tsx`
- `.native.tsx`
- permissions
- native modules
- app lifecycle
- deep links
- environment configuration
- Expo Go vs development builds
- native builds

---

# DAY 4 — Expo Router

This deserves its own day.

Expo Router is **file-based routing** for universal React Native applications. Routes are represented by files under the application's route directory, with layouts defining navigation relationships. [Expo documentation](https://docs.expo.dev/router/introduction/?utm_source=chatgpt.com)

You should be able to look at:

```text
src/
  app/
    _layout.tsx
    index.tsx
    login.tsx

    (tabs)/
      _layout.tsx
      home.tsx
      profile.tsx

    users/
      [id].tsx
```

and immediately understand the architecture.

Know:

- `_layout.tsx`
- `index.tsx`
- route groups `(tabs)`
- dynamic routes `[id]`
- nested layouts
- Stack
- Tabs
- navigation
- params
- deep linking
- protected routes
- authentication flows
- typed routes
- web routing

Expo Router also supports universal/deep-linked routes across native and web, which is one of the major architectural advantages you need to understand. [Expo documentation](https://docs.expo.dev/router/introduction/?utm_source=chatgpt.com)

### Your practical exercise

Build:

```text
/login
/home
/profile
/users
/users/[id]
```

with:

```text
Auth
 └── Protected routes
       ├── Home
       ├── Profile
       └── Users
```

---

# DAY 5 — GraphQL fundamentals

This is **extremely important** because it connects your App and BFF.

Understand:

```graphql
type User {
    id: ID!
    name: String!
    email: String!
}

type Query {
    user(id: ID!): User
}
```

Then understand:

### Query

```graphql
query GetUser($id: ID!) {
    user(id: $id) {
        id
        name
        email
    }
}
```

### Mutation

```graphql
mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
        id
        name
    }
}
```

### Variables

```json
{
  "id": "123"
}
```

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

---

# DAY 6 — Apollo Client

Now connect GraphQL to React Native.

Apollo Client provides the client-side GraphQL layer, including the cache, error handling and React integration. [Apollo GraphQL](https://www.apollographql.com/docs/react/get-started?utm_source=chatgpt.com)

Learn:

```typescript
const { data, loading, error } = useQuery(GET_USER);
```

Then understand **what actually happens**.

```text
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
```

### Must understand

- ApolloProvider
- `useQuery`
- `useMutation`
- `useLazyQuery`
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

Apollo explicitly supports TypeScript typing for GraphQL operations, so understand how generated operation types fit into the application. [Apollo GraphQL](https://www.apollographql.com/docs/react/data/typescript?utm_source=chatgpt.com)

### Team-lead question

> "Why is my UI showing stale data even though the API returned the new value?"

You should immediately think:

**Apollo cache policy / normalized cache / mutation cache update / refetch strategy.**

---

# DAY 7 — Node + TypeScript + Apollo Server

Now switch to the BFF.

Your architecture becomes:

```text
React Native
      │
      ▼
Apollo Client
      │
      ▼
HTTP
      │
      ▼
Express
      │
      ▼
Apollo Server
      │
      ▼
Resolvers
      │
      ▼
Services
      │
      ▼
Backend APIs
```

Build this yourself.

### Learn

- Node runtime
- ESM/CommonJS
- npm
- package management
- environment variables
- async/await
- promises
- error handling
- middleware
- Express
- HTTP lifecycle
- Apollo Server
- schema
- resolvers
- context
- authentication
- authorization

### Make this:

```text
GET USER
   ↓
GraphQL Query
   ↓
Resolver
   ↓
UserService
   ↓
REST API
   ↓
Transform
   ↓
GraphQL response
```

That is **BFF architecture**.

---

# DAY 8 — Apollo Server architecture

Now go deeper.

Build:

```text
src/
 ├── graphql/
 │    ├── schema/
 │    ├── resolvers/
 │    └── context/
 │
 ├── services/
 │
 ├── clients/
 │
 ├── middleware/
 │
 ├── config/
 │
 └── server.ts
```

Don't obsess over whether that exact folder structure matches ClarityBFF.

Learn the **separation of concerns**.

### Resolver

Should ideally be thin:

```typescript
user: async (_, args, context) => {
    return context.userService.getUser(args.id);
}
```

Not:

```text
Resolver
 ├── authentication
 ├── SQL
 ├── REST
 ├── transformation
 ├── business logic
 ├── logging
 └── error handling
```

That is something you should be able to call out during a code review.

---

# DAY 9 — Keycloak + Keycloakify

This is your security day.

Given your existing security experience, you should move quickly here.

Understand:

```text
User
 ↓
Keycloak
 ↓
Authentication
 ↓
Access Token
 ↓
Application
 ↓
Authorization
```

Know:

- Realm
- Client
- User
- Group
- Role
- Scope
- Access token
- Refresh token
- ID token
- OIDC
- OAuth 2.0
- Authorization Code flow
- PKCE
- token expiry
- refresh
- audience
- issuer
- claims
- role mapping

Then understand **where authorization happens**.

For example:

```text
Keycloak
    ↓
Token says:
role = ADMIN
    ↓
BFF validates token
    ↓
Resolver/service checks permission
    ↓
Operation allowed
```

### Keycloakify

Don't confuse Keycloakify with Keycloak itself.

Keycloakify is primarily a way of creating/customising Keycloak's UI themes using modern frontend technologies such as TypeScript and React, with the resulting theme bundled for Keycloak. [Keycloakify Docs](https://docs.keycloakify.dev/?utm_source=chatgpt.com)

So:

```text
Keycloak
 ├── Identity
 ├── Authentication
 ├── Authorization
 └── Token issuance

Keycloakify
 └── Custom Keycloak UI/theme
```

That's the distinction you need to be able to explain.

---

# DAY 10 — Testing + code quality

Now:

## Vitest

You need to know:

```text
Unit test
Integration test
Mock
Spy
Stub
Fixture
Assertion
Coverage
```

And:

```typescript
vi.fn()
vi.spyOn()
vi.mock()
```

Vitest's current mocking API revolves around `vi.fn`, `vi.spyOn` and `vi.mock`. [Vitest](https://vitest.dev/guide/mocking.html?utm_source=chatgpt.com)

Practice testing:

```text
React hook
service
GraphQL resolver
API client
error condition
authentication failure
```

### Team-lead level

You should be asking:

> What behaviour are we testing?

rather than:

> How much code coverage do we have?

---

## ESLint

Understand:

```text
ESLint
  ↓
Rules
  ↓
Plugins
  ↓
Configuration
  ↓
CI quality gate
```

Modern ESLint uses flat configuration via `eslint.config.*`, with configuration objects controlling files, rules, plugins and language options. [ESLint](https://eslint.org/docs/latest/use/configure/configuration-files?utm_source=chatgpt.com)

You should be able to review a team's ESLint setup and understand:

- what rules apply
- what is warning vs error
- TypeScript integration
- ignored files
- CI enforcement
- why rules exist

---

# DAY 11 — Storybook + frontend architecture

Storybook is not just:

> "A place to see buttons."

Understand it as a **component development and documentation environment**.

```text
Component
    ↓
Story
    ↓
Props / States
    ↓
Visual testing
    ↓
Documentation
```

Storybook currently supports React Native both on-device and through React Native Web; the web approach uses Vite. [Storybook](https://storybook.js.org/docs/get-started/frameworks/react-native-web-vite?utm_source=chatgpt.com)

Build stories for:

```text
Button
Input
Card
Modal
Loading
Error
Empty state
```

Then deliberately create:

```text
Button
 ├── Default
 ├── Disabled
 ├── Loading
 ├── Error
 └── Long text
```

That's much closer to team-lead thinking.

---

# DAY 12 — Dynatrace + Pushwoosh + Intercom

This day is about **integration architecture**, not memorising SDKs.

## Dynatrace

Understand:

```text
Mobile App
    ↓
Dynatrace
    ↓
User sessions
    ↓
Navigation
    ↓
HTTP requests
    ↓
Crashes
    ↓
ANRs
    ↓
Errors
```

Current Dynatrace React Native RUM capabilities include monitoring app startup, views/navigation, HTTP requests, crashes, ANRs, exceptions and user/session information. [Dynatrace Documentation](https://docs.dynatrace.com/docs/observe/digital-experience/rum/mobile-frontends/react-native?utm_source=chatgpt.com)

Team-lead question:

> "The app is slow. What do you do?"

You should say:

```text
User report
 ↓
Dynatrace
 ↓
Identify affected version/platform
 ↓
Identify slow screen
 ↓
Identify slow API request
 ↓
Correlate with BFF
 ↓
Trace downstream dependency
 ↓
Determine client/server responsibility
```

That connects your existing observability experience directly to this stack.

---

## Pushwoosh

Understand:

```text
Application
   ↓
Pushwoosh SDK
   ↓
Device registration
   ↓
Push token
   ↓
Pushwoosh
   ↓
Notification
   ↓
Device
```

Know:

- registration
- device tokens
- permissions
- notification lifecycle
- deep links
- foreground/background behaviour
- failures
- environment separation
- testing

---

## Intercom

Think:

```text
User
 ↓
Authenticated application
 ↓
Intercom identity
 ↓
User/session
 ↓
Conversation/support
```

Understand:

- user identity
- authentication
- user attributes
- events
- conversation lifecycle
- privacy
- environment separation

---

# DAY 13 — EAS + Azure DevOps

This is where your existing DevOps experience becomes a **huge advantage**.

EAS Build is Expo's hosted service for producing Android/iOS application binaries, with build profiles and CI integration. [Expo documentation](https://docs.expo.dev/build/?utm_source=chatgpt.com)

Understand:

```text
Developer
    ↓
Git
    ↓
Azure DevOps
    ↓
Pipeline
    ↓
EAS CLI
    ↓
EAS Build
    ↓
Android / iOS
```

Learn:

### `eas.json`

Conceptually:

```json
{
  "build": {
    "development": {},
    "preview": {},
    "production": {}
  }
}
```

Understand:

- build profiles
- environment variables
- secrets
- signing
- credentials
- Android builds
- iOS builds
- versioning
- artifacts
- preview builds
- production builds
- EAS Update
- CI/CD
- failure troubleshooting

### Your Azure DevOps pipeline should conceptually be:

```text
Checkout
   ↓
Install dependencies
   ↓
Lint
   ↓
Unit tests
   ↓
Build
   ↓
Security/quality checks
   ↓
EAS
   ↓
Artifact
   ↓
Distribution
```

And you should be able to discuss:

> "What happens if the build succeeds but the app cannot authenticate?"

That's where your architecture knowledge matters.

---

# DAY 14 — TEAM LEAD DAY

**Do NOT spend Day 14 learning another library.**

You need to practise leading.

I'd spend the entire day doing architecture/code-review/problem-solving exercises.

---

# Your final architecture exercise

Design this:

> A user opens the ClarityApp and logs in.

You should be able to explain the entire lifecycle:

```text
                   ┌──────────────┐
                   │     User     │
                   └──────┬───────┘
                          │
                          ▼
                   ClarityApp
                          │
                          ▼
                      Keycloak
                          │
                     OIDC / PKCE
                          │
                          ▼
                    Access Token
                          │
                          ▼
                  Apollo Client
                          │
                      GraphQL
                          │
                          ▼
                   ClarityBFF
                          │
                    Validate JWT
                          │
                    Check claims
                          │
                          ▼
                    Resolver
                          │
                       Service
                          │
                          ▼
                  Backend systems
                          │
                          ▼
                     Response
                          │
                          ▼
                   Apollo Cache
                          │
                          ▼
                     React UI
```

Then add:

```text
Dynatrace
    ↓
Observe the entire journey
```

and:

```text
Pushwoosh
    ↓
Notifications

Intercom
    ↓
Customer communication
```

and:

```text
Azure DevOps
    ↓
EAS Build
    ↓
Mobile releases
```

If you can explain that architecture confidently, you've moved from **"I know these technologies"** to **"I understand how this system works."**

---

# The most important thing: build ONE project

Do not build 14 tiny tutorials.

Build **one miniature Clarity platform**.

Call it something like:

```text
clarity-training
```

## Frontend

```text
Expo
React Native
TypeScript
Expo Router
React Native Web
Apollo Client
Keycloak
Storybook
Vitest
ESLint
```

## Backend

```text
Node
TypeScript
Express
Apollo Server
GraphQL
```

## Supporting

```text
Keycloak
Dynatrace concepts
Push notification abstraction
Intercom abstraction
```

## CI/CD

```text
Azure DevOps
      ↓
EAS Build
```

---

# Your mini application

Build:

### Login

```text
Keycloak
```

### Home

```text
User profile
```

### Users

```text
GraphQL query
      ↓
BFF
      ↓
Mock backend
```

### User details

```text
/users/[id]
```

### Create user

```text
GraphQL mutation
```

### Notifications

```text
Pushwoosh abstraction
```

### Support

```text
Intercom abstraction
```

### Observability

```text
Dynatrace instrumentation points
```

### Component library

```text
Storybook
```

### Tests

```text
Vitest
```

### CI

```text
Azure DevOps
 ↓
lint
 ↓
test
 ↓
build
 ↓
EAS
```

---

# What I want you to be able to answer by the end

I'm going to be particularly strict on these because these are **team-lead questions**, rather than "have you used the framework?" questions.

### TypeScript

**Why would you use `unknown` instead of `any`?**

### React

**Why is putting everything into global state usually a bad idea?**

### React Native

**What belongs in shared code versus platform-specific code?**

### Expo Router

**Why use file-based routing instead of manually defining navigation?**

### GraphQL

**Why use GraphQL instead of REST for the frontend/BFF boundary?**

### Apollo Client

**Why is my UI displaying stale data after a successful mutation?**

### Apollo Server

**What logic belongs in a resolver versus a service?**

### BFF

**Why have a BFF rather than allowing the mobile application to call every backend service directly?**

### Keycloak

**Authentication vs authorization — what's the difference?**

### Security

**Where should JWT validation happen?**

### Storybook

**Why would a team use Storybook instead of just testing the application?**

### Vitest

**What should you mock and what shouldn't you mock?**

### Dynatrace

**How would you determine whether a performance issue is caused by the mobile app or backend?**

### EAS

**What's the difference between building the application and deploying/updating it?**

### Azure DevOps

**How would you prevent a broken build from reaching production?**

---

# Your biggest advantage

I wouldn't approach this as:

> "Gabriel has to learn 15 new technologies."

That's the wrong mental model.

Your existing experience already gives you:

```text
Software engineering
        +
APIs
        +
TypeScript / Node
        +
Security
        +
CI/CD
        +
Docker
        +
Kubernetes
        +
Cloud
        +
Observability
        +
Architecture
        +
Production troubleshooting
```

We're essentially adding:

```text
React Native ecosystem
        +
Expo ecosystem
        +
GraphQL/Apollo
        +
Keycloak ecosystem
        +
Mobile delivery
```

That is **much more manageable**.

And your old React Native experience from the RMB work is particularly useful here—you aren't approaching React Native completely cold. 

### The target after two weeks

Don't aim to say:

> "I am an expert in Pushwoosh."

Aim to be able to say:

> "I understand where Pushwoosh sits in the architecture, how the application integrates with it, what lifecycle concerns we need to consider, how I'd troubleshoot failures, and where I'd go into the SDK documentation for implementation-specific details."

**That is much closer to what I would expect from a good Team Lead.**

---

## We can make this much more aggressive

If you have **access to the actual ClarityApp and ClarityBFF repositories**, that changes my recommendation substantially.

Instead of spending two weeks on generic tutorials, we can do:

**Day 1:** map the actual repositories  
**Day 2:** TypeScript patterns used by the team  
**Day 3:** React Native/Expo architecture  
**Day 4:** Expo Router  
**Day 5:** Apollo Client + actual queries  
**Day 6:** Keycloak/auth flow  
**Day 7:** BFF architecture  
**Day 8:** Apollo Server/resolvers  
**Day 9:** integrations  
**Day 10:** testing  
**Day 11:** observability  
**Day 12:** EAS/Azure DevOps pipeline  
**Day 13:** architecture/code review  
**Day 14:** **mock Team Lead interview + production incident**

That would be **far more valuable than generic studying**.

For the official material, the most useful starting points are the current [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro?utm_source=chatgpt.com), [Expo Router documentation](https://docs.expo.dev/router/introduction/?utm_source=chatgpt.com), [Apollo Client documentation](https://www.apollographql.com/docs/react/get-started?utm_source=chatgpt.com), [Keycloakify documentation](https://docs.keycloakify.dev/?utm_source=chatgpt.com) and [Expo EAS Build documentation](https://docs.expo.dev/build/?utm_source=chatgpt.com). [TypeScript](https://www.typescriptlang.org/docs/handbook/intro?utm_source=chatgpt.com)