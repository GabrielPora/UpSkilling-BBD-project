# DAY 1 — TypeScript at senior level

You already know TypeScript, so do not waste the day learning syntax.
Focus on the things that differentiate a junior TS developer from someone reviewing architecture.

## Learn
- interface vs type
- unions
- intersections
- generics
- narrowing
- discriminated unions
- type guards
- unknown vs any
- never
- keyof
- typeof
- indexed access types
- mapped types
- conditional types
- utility types
- function typing
- async/Promise types
- module patterns
- strict mode
- declaration files


TypeScript's own documentation specifically covers generics, type operators, mapped/conditional types and utility types. [Generics](https://www.typescriptlang.org/docs/handbook/generics.html)



## Team-lead test
You should be able to explain:
1. Why is unknown generally safer than any?
2. When would you use a discriminated union?
3. Why would you use a generic instead of duplicating interfaces?
4. What does strict actually protect us from?
5. When does TypeScript stop protecting us because the problem is runtime data?

That last one is very important.
For example:

	type User = {
		id: string;
		name: string;
	};

	const response = await fetch("/user");

	const user = await response.json() as User;

That does not mean the API returned a valid User.
You've only told TypeScript:
"Trust me."

That's where runtime validation/schema contracts become important.