UpSkilling for BBD project

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