## What `strict` Actually Protects Us From

`strict: true` in `tsconfig.json` is actually an **umbrella setting** that enables a collection of individual rules. Here's what each one protects you from:

---

### The individual flags `strict` enables

---

### 1 — `strictNullChecks`
Probably the most impactful. Without it, `null` and `undefined` can be assigned to **any** type silently.

```typescript
// strictNullChecks: false ❌
function getUser(id: string): User {
    return null; // ✅ no error — but crashes at runtime
}

const user = getUser("123");
user.name; // 💥 CRASH — Cannot read properties of null

// strictNullChecks: true ✅
function getUser(id: string): User | null {
    return null; // forced to declare it can be null
}

const user = getUser("123");
user.name;        // ❌ ERROR — user could be null
user?.name;       // ✅ safe optional chaining
if (user) {
    user.name;    // ✅ TypeScript knows it's not null here
}
```

---

### 2 — `noImplicitAny`
Prevents TypeScript from silently falling back to `any` when it can't infer a type.

```typescript
// noImplicitAny: false ❌
function process(data) {
//               ^^^^
//               silently becomes `any` — no type safety at all
    data.doAnything(); // no error, but could crash
}

// noImplicitAny: true ✅
function process(data) {        // ❌ ERROR — must type this
function process(data: unknown) // ✅ forced to be explicit
function process(data: string)  // ✅ forced to be explicit
```

---

### 3 — `strictFunctionTypes`
Ensures function parameter types are checked correctly — prevents unsafe function assignments.

```typescript
// strictFunctionTypes: false ❌
type PrintUser = (user: User) => void;

const printAnimal: (animal: Animal) => void = (a) => {
    console.log(a.species); // Animal has species, User does not
};

const fn: PrintUser = printAnimal; // ✅ no error — but WRONG
fn({ name: "John" });              // 💥 CRASH — species undefined

// strictFunctionTypes: true ✅
const fn: PrintUser = printAnimal; // ❌ ERROR — caught at compile time
```

---

### 4 — `strictBindCallApply`
Makes sure `bind`, `call`, and `apply` are called with the correct argument types.

```typescript
function add(a: number, b: number): number {
    return a + b;
}

// strictBindCallApply: false ❌
add.call(null, "hello", "world");  // ✅ no error — but wrong types
add.apply(null, [true, false]);    // ✅ no error — but wrong types

// strictBindCallApply: true ✅
add.call(null, "hello", "world");  // ❌ ERROR — must be numbers
add.call(null, 10, 20);           // ✅ correct
```

---

### 5 — `strictPropertyInitialization`
Ensures class properties are initialised in the constructor.

```typescript
// strictPropertyInitialization: false ❌
class User {
    name: string;   // never set — will be undefined at runtime
    age:  number;   // never set — will be undefined at runtime

    greet() {
        return `Hi ${this.name.toUpperCase()}`; // 💥 CRASH
    }
}

// strictPropertyInitialization: true ✅
class User {
    name: string;  // ❌ ERROR — not initialised

    // Must either initialise in constructor:
    constructor(name: string) {
        this.name = name; // ✅
    }

    // Or declare with definite assignment if you know what you're doing:
    name!: string; // ✅ tells TS "trust me, this will be set"
}
```

---

### 6 — `noImplicitThis`
Prevents `this` from being implicitly typed as `any` inside functions.

```typescript
// noImplicitThis: false ❌
function greet() {
    return `Hello ${this.name}`; // this is `any` — no safety
}

// noImplicitThis: true ✅
function greet() {
    return `Hello ${this.name}`; // ❌ ERROR — what is `this`?
}

// Must be explicit
function greet(this: User) {
    return `Hello ${this.name}`; // ✅ TypeScript knows this is User
}
```

---

### 7 — `alwaysStrict`
Adds `"use strict"` to every emitted JavaScript file — prevents a whole class of JS runtime issues like using undeclared variables.

```typescript
// alwaysStrict: true
// Every compiled JS file gets "use strict" at the top
"use strict";

x = 10; // 💥 ReferenceError in strict mode — x not declared
        // would silently create a global variable without it
```

---

### 8 — `useUnknownInCatchVariables` (added in TS 4.4)
Makes caught errors `unknown` instead of `any`.

```typescript
// useUnknownInCatchVariables: false ❌
try {
    fetchData();
} catch (error) {
    console.log(error.message); // error is `any` — no safety
    error.doAnything();         // ✅ no error — dangerous
}

// useUnknownInCatchVariables: true ✅
try {
    fetchData();
} catch (error) {
    console.log(error.message); // ❌ ERROR — error is `unknown`

    // Must narrow first
    if (error instanceof Error) {
        console.log(error.message); // ✅ safe
    }
}
```

---

### All together in tsconfig.json

```json
{
    "compilerOptions": {
        "strict": true
        // This one line enables ALL of the above:
        // "strictNullChecks": true,
        // "noImplicitAny": true,
        // "strictFunctionTypes": true,
        // "strictBindCallApply": true,
        // "strictPropertyInitialization": true,
        // "noImplicitThis": true,
        // "alwaysStrict": true,
        // "useUnknownInCatchVariables": true
    }
}
```

---

### Summary

| Flag | Protects against |
|---|---|
| `strictNullChecks` | Null/undefined crashes at runtime |
| `noImplicitAny` | Silent loss of type safety |
| `strictFunctionTypes` | Unsafe function assignments |
| `strictBindCallApply` | Wrong argument types in call/bind/apply |
| `strictPropertyInitialization` | Uninitialised class properties |
| `noImplicitThis` | `this` being silently typed as `any` |
| `alwaysStrict` | JS runtime issues from non-strict mode |
| `useUnknownInCatchVariables` | Unsafe access on caught errors |

The core idea: **`strict` closes the gaps where TypeScript would otherwise silently allow unsafe code — turning potential runtime crashes into compile time errors where you can actually fix them.**