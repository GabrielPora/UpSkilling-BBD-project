## `unknown` vs `any` in TypeScript

### `any` — turns off type checking entirely
```typescript
let value: any = "hello";

// TypeScript allows ALL of these — no errors at compile time
value.toUpperCase();     // ✅ no error
value.foo.bar.baz;       // ✅ no error — but CRASHES at runtime
value();                 // ✅ no error — but CRASHES at runtime
value * 100;             // ✅ no error — but CRASHES at runtime
```
`any` essentially says **"trust me, I know what this is"** — TypeScript steps aside completely.

---

### `unknown` — forces you to check before using
```typescript
let value: unknown = "hello";

// TypeScript BLOCKS all of these until you narrow the type
value.toUpperCase();     // ❌ ERROR — can't call method on unknown
value.foo.bar.baz;       // ❌ ERROR
value();                 // ❌ ERROR
value * 100;             // ❌ ERROR

// You MUST check the type first
if (typeof value === "string") {
    value.toUpperCase();  // ✅ now TypeScript knows it's a string
}
```

---

### Real world example — parsing API response

```typescript
// ❌ any — dangerous, no protection
async function fetchData_unsafe(): Promise<any> {
    const res = await fetch("/api/user");
    const data = await res.json();
    return data;
}

const user = await fetchData_unsafe();
console.log(user.name.toUpperCase()); // TypeScript says ✅ but could CRASH at runtime
                                      // if name is undefined or not a string

// ✅ unknown — forces you to validate
async function fetchData_safe(): Promise<unknown> {
    const res = await fetch("/api/user");
    const data = await res.json();
    return data;
}

const user = await fetchData_safe();
console.log(user.name.toUpperCase()); // ❌ ERROR — TypeScript stops you here

// Must narrow first
if (
    typeof user === "object" &&
    user !== null &&
    "name" in user &&
    typeof (user as any).name === "string"
) {
    console.log((user as { name: string }).name.toUpperCase()); // ✅ safe
}
```

---

### Assignability difference

```typescript
let anyVal: any    = "hello";
let unknownVal: unknown = "hello";

let str: string;

str = anyVal;      // ✅ any assigns to anything
str = unknownVal;  // ❌ ERROR — unknown won't assign without a check
```

| | `any` | `unknown` |
|---|---|---|
| Assignable to any type | ✅ | ❌ |
| Requires type check before use | ❌ | ✅ |
| Methods/properties accessible | ✅ | ❌ |
| Type safety | ❌ none | ✅ enforced |
| When to use | Legacy code / quick prototyping | API responses, user input, truly unknown data |

---

### One line summary

> **`any`** tells TypeScript to stop checking. **`unknown`** tells TypeScript "I don't know the type yet — remind me to check before I use it."

`unknown` gives you the flexibility of not knowing a type while still keeping the **safety net** of TypeScript's type system.