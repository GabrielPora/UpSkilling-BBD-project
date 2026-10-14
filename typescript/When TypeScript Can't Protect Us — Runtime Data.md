## When TypeScript Can't Protect Us — Runtime Data

TypeScript's type system **only exists at compile time**. Once your code is compiled to JavaScript, all the types are erased. So anything that comes in from the outside world at runtime is a blind spot.

---

### The core problem
```typescript
// TypeScript sees this and is perfectly happy ✅
interface User {
    name: string;
    age:  number;
}

const user: User = JSON.parse(data); // ❌ DANGEROUS
//                 ^^^^^^^^^^^^
//                 TypeScript trusts you here
//                 but JSON.parse returns `any`
//                 and the actual data could be ANYTHING
```

---

### Where runtime data comes from

---

### 1 — API responses
```typescript
interface User {
    name: string;
    age:  number;
}

async function getUser(): Promise<User> {
    const res  = await fetch("/api/user");
    const data = await res.json(); // type is `any`

    return data; // ✅ TypeScript is happy
                 // ❌ but what if the API returns:
                 // { name: null, age: "twenty" }
                 // { error: "not found" }
                 // null
                 // a completely different shape
}

const user = await getUser();
user.name.toUpperCase(); // 💥 CRASH if name is null
```

---

### 2 — `JSON.parse`
```typescript
const stored = localStorage.getItem("user");
const user: User = JSON.parse(stored!);
//                 ^^^^^^^^^^^^^^^^^^^
//                 TypeScript sees User
//                 Runtime could be absolutely anything

user.name.toUpperCase(); // 💥 CRASH — no guarantee name exists
```

---

### 3 — User / form input
```typescript
const input = document.getElementById("age") as HTMLInputElement;
const age: number = Number(input.value);
//                  ^^^^^^^^^^^^^^^^^^^
//                  user could type "hello", "", "abc123"
//                  Number("hello") = NaN
//                  TypeScript has no idea

const doubled = age * 2; // NaN * 2 = NaN 💥 silent bug
```

---

### 4 — `any` type assertions
```typescript
// You're telling TypeScript "trust me" —
// it stops checking and believes you completely
const data = response as User;        // ❌ unsafe cast
const data = <User>response;          // ❌ same thing
const data = response as unknown as User; // ❌ double cast — even worse
                                          // forces TS to accept anything

data.name.toUpperCase(); // 💥 CRASH if data isn't actually a User
```

---

### 5 — Third party libraries without types
```typescript
// Some libraries have no @types package
// and return untyped data
const result = someUntypedLibrary.doSomething();
// result is `any` — TypeScript gives up completely

result.whatever.you.want; // ✅ no error — but could crash
```

---

### 6 — Environment variables
```typescript
const port = process.env.PORT;
//    ^^^^
//    type is `string | undefined`
//    TypeScript warns about undefined but not about content

const portNumber: number = Number(process.env.PORT);
// what if PORT isn't set?        → NaN
// what if PORT is "hello"?       → NaN
// what if PORT is "99999999"?    → invalid port, runtime error
```

---

### 7 — `localStorage` / `sessionStorage`
```typescript
interface Settings {
    theme:    "light" | "dark";
    fontSize: number;
}

const raw      = localStorage.getItem("settings");
const settings = JSON.parse(raw!) as Settings;
//                                ^^ TypeScript trusts this

// But what if:
// - localStorage is empty        → JSON.parse(null!) 💥
// - data was saved by old code   → wrong shape
// - user manually edited storage → anything goes
settings.theme.toUpperCase(); // 💥 potential crash
```

---

### The solution — runtime validation

You need a library that validates the **shape of data at runtime** to match your TypeScript types.

**Using Zod — the most popular solution:**
```typescript
import { z } from "zod";

// Define the schema — this exists at RUNTIME too
const UserSchema = z.object({
    name: z.string(),
    age:  z.number(),
});

// Infer the TypeScript type from the schema
type User = z.infer<typeof UserSchema>;

// Now validate incoming data
async function getUser(): Promise<User> {
    const res  = await fetch("/api/user");
    const data = await res.json();

    // parse() throws if data doesn't match schema
    const user = UserSchema.parse(data);
    //           ^^^^^^^^^^^^^^^^^^^^
    //           validated at runtime ✅
    //           TypeScript type is correct ✅

    return user; // guaranteed to be a real User
}

// Safe to use — both TS and runtime agree
const user = await getUser();
user.name.toUpperCase(); // ✅ genuinely safe
```

---

### Summary — TypeScript's blind spots

| Source | Why TS can't protect you |
|---|---|
| API responses | Data comes in at runtime as `any` |
| `JSON.parse` | Returns `any` — no shape guarantee |
| User input | TypeScript can't know what a user types |
| Type assertions (`as`) | You're telling TS to stop checking |
| Untyped libraries | No type information available |
| Environment variables | Content unknown until runtime |
| `localStorage` | Data could be from old/different code |

### The rule of thumb

> **TypeScript protects you from yourself** — mistakes you make in your own code.
> **It cannot protect you from the outside world** — anything that arrives at runtime needs to be validated explicitly with a tool like **Zod**, **Yup**, or **io-ts**.