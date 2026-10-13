# DAY 4 — Expo Router

This deserves its own day.

Expo Router is file-based routing for universal React Native applications. Routes are represented by files under the application's route directory, with layouts defining navigation relationships. [router introduction](https://docs.expo.dev/router/introduction/)

You should be able to look at:

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

and immediately understand the architecture.

### Know:
- _layout.tsx
- index.tsx
- route groups (tabs)
- dynamic routes [id]
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

Expo Router also supports universal/deep-linked routes across native and web, which is one of the major architectural advantages you need to understand. [router introduction](https://docs.expo.dev/router/introduction/)

Your practical exercise
Build:

	/login
	/home
	/profile
	/users
	/users/[id]

with

	Auth
	└── Protected routes
		├── Home
		├── Profile
		└── Users
