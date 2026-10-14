## Discriminated Unions in TypeScript

A discriminated union is when you have a **shared literal field** (the "discriminant") that tells TypeScript which specific type it's dealing with.

---

### Basic Structure
```typescript
type Shape =
    | { kind: "circle";    radius: number }
    | { kind: "rectangle"; width: number; height: number }
    | { kind: "triangle";  base: number;  height: number }
//    ^^^^
//    this is the discriminant — a literal type that narrows the union
```

---

### Without discriminated union — messy and unsafe
```typescript
type Shape = {
    radius?: number;
    width?:  number;
    height?: number;
    base?:   number;
}

function getArea(shape: Shape) {
    if (shape.radius) {
        // TypeScript doesn't KNOW this is a circle
        // radius could just happen to be set alongside width/height
        return Math.PI * shape.radius ** 2;
    }
    // lots of optional chaining, runtime guessing ❌
}
```

### With discriminated union — clean and safe
```typescript
type Shape =
    | { kind: "circle";    radius: number }
    | { kind: "rectangle"; width: number; height: number }
    | { kind: "triangle";  base: number;  height: number }

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
            // ✅ TypeScript KNOWS radius exists here

        case "rectangle":
            return shape.width * shape.height;
            // ✅ TypeScript KNOWS width and height exist here

        case "triangle":
            return 0.5 * shape.base * shape.height;
            // ✅ TypeScript KNOWS base and height exist here
    }
}
```

---

### Real world use cases

**1 — API / network responses**
```typescript
type ApiResponse =
    | { status: "success"; data: User }
    | { status: "error";   message: string }
    | { status: "loading" }

function handleResponse(res: ApiResponse) {
    switch (res.status) {
        case "success":
            console.log(res.data.name); // ✅ TypeScript knows data exists
            break;
        case "error":
            console.log(res.message);   // ✅ TypeScript knows message exists
            break;
        case "loading":
            console.log("Loading...");  // ✅ no extra fields to worry about
            break;
    }
}
```

**2 — Redux / state management actions**
```typescript
type Action =
    | { type: "INCREMENT";  amount: number }
    | { type: "DECREMENT";  amount: number }
    | { type: "RESET" }

function reducer(state: number, action: Action): number {
    switch (action.type) {
        case "INCREMENT": return state + action.amount; // ✅ amount exists
        case "DECREMENT": return state - action.amount; // ✅ amount exists
        case "RESET":     return 0;                     // ✅ no amount needed
    }
}
```

**3 — UI component states**
```typescript
type ButtonState =
    | { state: "idle" }
    | { state: "loading" }
    | { state: "error";   message: string }
    | { state: "success"; redirectUrl: string }

function renderButton(btn: ButtonState) {
    switch (btn.state) {
        case "idle":    return "<button>Submit</button>";
        case "loading": return "<button>Loading...</button>";
        case "error":   return `<p>Error: ${btn.message}</p>`;
        case "success": return `<a href="${btn.redirectUrl}">Done!</a>`;
    }
}
```

---

### Exhaustiveness checking — bonus safety

```typescript
function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":    return Math.PI * shape.radius ** 2;
        case "rectangle": return shape.width * shape.height;
        case "triangle":  return 0.5 * shape.base * shape.height;
        default:
            // If you add a new shape and forget to handle it,
            // TypeScript will error here ✅
            const _exhaustiveCheck: never = shape;
            throw new Error(`Unhandled shape: ${_exhaustiveCheck}`);
    }
}

// Now add a new shape:
type Shape =
    | { kind: "circle";    radius: number }
    | { kind: "rectangle"; width: number; height: number }
    | { kind: "triangle";  base: number;  height: number }
    | { kind: "pentagon";  side: number }  // ← added

// TypeScript immediately errors at the default case ✅
// forcing you to handle the new case
```

---

### Summary — when to use it

| Situation | Use discriminated union? |
|---|---|
| Multiple types that share a common field | ✅ yes |
| API responses with different shapes | ✅ yes |
| Redux / event / action systems | ✅ yes |
| UI with multiple distinct states | ✅ yes |
| Simple optional fields on one type | ❌ use optional fields instead |
| Only two types, simple condition | ❌ a plain union is fine |

The core rule: **when you have a group of types that are related but structurally different, and you need to handle each one differently** — that's exactly what discriminated unions are built for.