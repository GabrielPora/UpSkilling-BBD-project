# DAY 2 — React architecture
Don't study React as:
"How do I make a component?"

You need:
"How do I structure a large React application?"

## Learn
- Functional components
- props
- state
- hooks
- useEffect
- useMemo
- useCallback
- useRef
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



## Critical team-lead question
When should state live where?
You need to be comfortable discussing:

	Component state
		↓
	Parent state
		↓
	Context
		↓
	Server state
		↓
	Global state

And importantly:
Apollo cache is server state.
Don't automatically shove API data into some separate global state store.