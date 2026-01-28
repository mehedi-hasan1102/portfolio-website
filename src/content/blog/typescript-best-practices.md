---
title: "TypeScript Best Practices"
description: "Write safer, more maintainable code with TypeScript"
author: "Mehedi Hasan"
pubDate: 2025-01-05
image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop"
tags: ["TypeScript", "JavaScript", "Best Practices"]
---

## Why TypeScript?

TypeScript adds static type checking to JavaScript, helping you catch errors before runtime and write more maintainable code.

## Type Annotations

### Basic Types
```typescript
let name: string = "Mehedi";
let age: number = 25;
let isActive: boolean = true;
let tags: string[] = ["web", "dev"];
```

### Union Types
```typescript
type Status = 'pending' | 'completed' | 'failed';
const status: Status = 'completed';
```

### Interfaces
```typescript
interface User {
  id: number;
  name: string;
  email?: string; // Optional
}

const user: User = {
  id: 1,
  name: "John"
};
```

## Advanced Types

### Generics
```typescript
function getId<T extends { id: number }>(obj: T): number {
  return obj.id;
}
```

### Type Guards
```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
```

## Best Practices

1. **Use strict mode**: Enable `strict` in `tsconfig.json`
2. **Avoid `any`**: Use `unknown` or specific types instead
3. **Leverage inference**: Let TypeScript infer types when obvious
4. **Use enums for constants**: Better than magic strings
5. **Document with JSDoc**: Add comments for clarity

## Common Patterns

### Discriminated Unions
```typescript
type Result = 
  | { status: 'success'; data: string }
  | { status: 'error'; error: Error };
```

### Readonly Properties
```typescript
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}
```

## Conclusion

TypeScript improves code quality and developer experience. Start with basics and gradually adopt more advanced patterns as you grow!
