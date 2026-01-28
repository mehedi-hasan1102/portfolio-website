---
title: "Database Design Fundamentals"
description: "Learn how to design efficient and scalable databases"
author: "Mehedi Hasan"
pubDate: 2025-01-12
image: "https://images.unsplash.com/photo-1516534775068-bb57314e5f1a?w=600&h=400&fit=crop"
tags: ["Database", "SQL", "Backend"]
---

## Database Basics

A good database design is the foundation of any application. Let's explore the fundamentals.

## Relational vs NoSQL

### Relational Databases
- Structured data
- ACID transactions
- Examples: PostgreSQL, MySQL

### NoSQL Databases
- Flexible schema
- Horizontal scaling
- Examples: MongoDB, Firebase

## Normalization

Organize data to reduce redundancy:

### First Normal Form (1NF)
- Eliminate repeating groups
- Atomic values only

### Second Normal Form (2NF)
- Must be in 1NF
- Remove partial dependencies

### Third Normal Form (3NF)
- Must be in 2NF
- Remove transitive dependencies

## SQL Basics

```sql
-- Creating a table
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  created_at TIMESTAMP
);

-- Querying data
SELECT * FROM users WHERE id = 1;

-- Inserting data
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');
```

## Indexing

Improve query performance:

```sql
CREATE INDEX idx_email ON users(email);
```

## Relationships

Define relationships between tables:
- One-to-One
- One-to-Many
- Many-to-Many

## Conclusion

Master database design and your applications will scale efficiently!
