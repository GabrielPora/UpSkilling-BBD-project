## Generics vs Duplicating Interfaces

### The problem — duplicating interfaces
```typescript
// ❌ BAD — copy-pasting the same structure for every type
interface NumberApiResponse {
    data:    number;
    status:  number;
    message: string;
    loading: boolean;
}

interface StringApiResponse {
    data:    string;
    status:  number;
    message: string;
    loading: boolean;
}

interface UserApiResponse {
    data:    User;
    status:  number;
    message: string;
    loading: boolean;
}

// Now if you need to add a new field like `timestamp`...
// you have to update EVERY interface ❌
```

---

### The solution — one generic interface
```typescript
// ✅ GOOD — one interface, works for any type
interface ApiResponse<T> {
    data:    T;
    status:  number;
    message: string;
    loading: boolean;
}

// Use it for any type
const numResponse:  ApiResponse<number> = { data: 42,      status: 200, message: "ok", loading: false };
const strResponse:  ApiResponse<string> = { data: "hello", status: 200, message: "ok", loading: false };
const userResponse: ApiResponse<User>   = { data: user,    status: 200, message: "ok", loading: false };

// Add timestamp once — all usages get it ✅
interface ApiResponse<T> {
    data:      T;
    status:    number;
    message:   string;
    loading:   boolean;
    timestamp: Date;   // ← added once, works everywhere
}
```

---

### Real world examples

**1 — Paginated responses**
```typescript
// ❌ Without generics — one per entity
interface PaginatedUsers {
    items:      User[];
    total:      number;
    page:       number;
    pageSize:   number;
}

interface PaginatedProducts {
    items:      Product[];
    total:      number;
    page:       number;
    pageSize:   number;
}

interface PaginatedOrders {
    items:      Order[];
    total:      number;
    page:       number;
    pageSize:   number;
}

// ✅ With generics — one interface for everything
interface Paginated<T> {
    items:    T[];
    total:    number;
    page:     number;
    pageSize: number;
}

type PaginatedUsers    = Paginated<User>;
type PaginatedProducts = Paginated<Product>;
type PaginatedOrders   = Paginated<Order>;

// Or use inline
function fetchUsers(): Promise<Paginated<User>> { ... }
function fetchProducts(): Promise<Paginated<Product>> { ... }
```

**2 — Form state**
```typescript
// ❌ Without generics
interface UserFormState {
    values:  User;
    errors:  Partial<Record<keyof User, string>>;
    touched: Partial<Record<keyof User, boolean>>;
    isValid: boolean;
}

interface ProductFormState {
    values:  Product;
    errors:  Partial<Record<keyof Product, string>>;
    touched: Partial<Record<keyof Product, boolean>>;
    isValid: boolean;
}

// ✅ With generics
interface FormState<T> {
    values:  T;
    errors:  Partial<Record<keyof T, string>>;
    touched: Partial<Record<keyof T, boolean>>;
    isValid: boolean;
}

type UserFormState    = FormState<User>;
type ProductFormState = FormState<Product>;
```

**3 — Repository / data access pattern**
```typescript
// ❌ Without generics — repeat for every entity
interface UserRepository {
    findById(id: string):    Promise<User>;
    findAll():               Promise<User[]>;
    create(data: User):      Promise<User>;
    update(id: string, data: Partial<User>): Promise<User>;
    delete(id: string):      Promise<void>;
}

interface ProductRepository {
    findById(id: string):       Promise<Product>;
    findAll():                  Promise<Product[]>;
    create(data: Product):      Promise<Product>;
    update(id: string, data: Partial<Product>): Promise<Product>;
    delete(id: string):         Promise<void>;
}

// ✅ With generics — one interface, implement for any entity
interface Repository<T> {
    findById(id: string):           Promise<T>;
    findAll():                      Promise<T[]>;
    create(data: T):                Promise<T>;
    update(id: string, data: Partial<T>): Promise<T>;
    delete(id: string):             Promise<void>;
}

class UserRepository    implements Repository<User>    { ... }
class ProductRepository implements Repository<Product> { ... }
class OrderRepository   implements Repository<Order>   { ... }
```

---

### Multiple type parameters
```typescript
// Generics can take more than one type parameter
interface KeyValuePair<K, V> {
    key:   K;
    value: V;
}

const pair1: KeyValuePair<string, number>  = { key: "age",  value: 25 };
const pair2: KeyValuePair<number, boolean> = { key: 1,      value: true };
const pair3: KeyValuePair<string, User>    = { key: "john", value: user };
```

---

### Adding constraints
```typescript
// You can restrict what T can be
interface Repository<T extends { id: string }> {
//                    ^^^^^^^^^^^^^^^^^^^
//                    T must have an id field
    findById(id: string): Promise<T>;
}

// ✅ Works — User has an id
class UserRepository implements Repository<User> { ... }

// ❌ Error — number has no id field
class NumberRepository implements Repository<number> { ... }
```

---

### Summary

| | Duplicating interfaces | Generic interface |
|---|---|---|
| Code reuse | ❌ copy-paste everywhere | ✅ write once |
| Maintenance | ❌ update every duplicate | ✅ update in one place |
| Type safety | ✅ | ✅ |
| Flexibility | ❌ rigid, one type each | ✅ works for any type |
| Readability | ❌ lots of near-identical code | ✅ clean and clear |

The core rule: **if you find yourself writing the same interface shape more than once with only the type changing — that's your signal to reach for a generic.**