Below is a **professional, reviewer-ready README** you can place at the root of your **backend repository** (or adapt slightly if using a monorepo).
It is written to **signal senior-level thinking**, clarity, and ease of evaluation.

---

# 📚 Book Dashboard Backend

A backend service for managing a list of books, built as part of a **full-stack take-home coding challenge**.
The application exposes a **secured GraphQL API** that allows authenticated admins to create, view, update, and delete books.

---

## 🚀 Tech Stack

* **Node.js / TypeScript**
* **NestJS** – server-side framework
* **GraphQL (Apollo Server)** – API layer
* **TypeORM** – ORM for relational data
* **SQLite** – file-based relational database
* **Auth0** – authentication & authorization
* **Passport JWT** – request authentication
* **HTTPie** – API testing

---

## 🧠 Architectural Overview

This project follows **clean architecture principles**:

* **Modules** encapsulate domain features
* **Resolvers** handle GraphQL requests
* **Services** contain business logic
* **Entities** define database schema
* **Guards** enforce authentication & authorization

```
backend/
├── src/
│   ├── auth/
│   │   ├── auth.guard.ts
│   │   ├── auth.module.ts
│   │   └── jwt.strategy.ts
│   ├── book/
│   │   ├── dto/
│   │   │   ├── create-book.input.ts
│   │   │   └── update-book.input.ts
│   │   ├── book.entity.ts
│   │   ├── book.resolver.ts
│   │   ├── book.service.ts
│   │   └── book.module.ts
│   ├── app.module.ts
│   └── main.ts
├── database.sqlite
├── .env.example
├── package.json
└── README.md
```

Key architectural decisions:

* **GraphQL code-first approach** for strong typing and maintainability
* **SQLite file database** to simplify setup and comply with test constraints
* **Auth0 JWT guards** to restrict API access to authorized users only

---

## 📦 Data Model

```ts
Book {
  id: number
  name: string
  description: string
}
```

---

## 🔐 Authentication & Authorization

* Authentication is handled by **Auth0**
* Clients must send a valid **JWT access token**
* All GraphQL resolvers are protected by a JWT guard
* Unauthorized requests are rejected automatically

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/book-dashboard-backend.git
cd book-dashboard-backend
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Environment Variables

Create a `.env` file using the provided example:

```bash
cp .env.example .env
```

Fill in your Auth0 details:

```env
AUTH0_DOMAIN=your-domain.eu.auth0.com
AUTH0_AUDIENCE=https://book-dashboard-api
```

---

### 4️⃣ Run the Server

```bash
npm run start:dev
```

The server will start at:

```
http://localhost:3000
```

GraphQL Playground:

```
http://localhost:3000/graphql
```

---

## 🧪 Testing the API with HTTPie

### Install HTTPie

```bash
pip install httpie
```

---

### Obtain an Auth0 Access Token

```bash
http POST https://YOUR_DOMAIN/oauth/token \
  grant_type=password \
  username=ADMIN_EMAIL \
  password=PASSWORD \
  audience=https://book-dashboard-api \
  scope=openid \
  client_id=CLIENT_ID \
  client_secret=CLIENT_SECRET
```

Copy the returned `access_token`.

---

### Create a Book

```bash
http POST localhost:3000/graphql \
Authorization:"Bearer YOUR_ACCESS_TOKEN" \
query='mutation {
  createBook(input:{
    name:"Clean Code"
    description:"A handbook of agile software craftsmanship"
  }) {
    id
    name
  }
}'
```

---

### Fetch All Books

```bash
http POST localhost:3000/graphql \
Authorization:"Bearer YOUR_ACCESS_TOKEN" \
query='query {
  books {
    id
    name
    description
  }
}'
```

---

### Update a Book

```bash
http POST localhost:3000/graphql \
Authorization:"Bearer YOUR_ACCESS_TOKEN" \
query='mutation {
  updateBook(
    id: 1,
    input: { name: "Clean Code (2nd Edition)" }
  )
}'
```

---

### Delete a Book

```bash
http POST localhost:3000/graphql \
Authorization:"Bearer YOUR_ACCESS_TOKEN" \
query='mutation {
  deleteBook(id: 1)
}'
```

---

## 🧩 Database

* Uses **SQLite**
* Stored locally as `db.sqlite`
* Automatically generated and synchronized via TypeORM
* No external database setup required

---

## 🧾 Version Control & Commits

This repository follows the **Conventional Commits** specification.

Examples:

```
feat(book): add book graphql resolver and service
feat(auth): integrate auth0 jwt authentication
chore(db): configure sqlite with typeorm
```

---

## ✅ Features Implemented

* Admin authentication via Auth0
* Secured GraphQL API
* CRUD operations for books
* SQLite relational database
* Clean, modular NestJS architecture
* API testable via HTTPie or GraphQL Playground

---

## 🔍 Evaluation Notes (For Reviewers)

This project emphasizes:

* Code clarity and maintainability
* Proper separation of concerns
* Real-world authentication integration
* Industry-standard backend practices
* Ease of setup and testing

---

## 📌 Future Improvements

* Pagination and filtering for books
* Role-based authorization
* Input validation with class-validator
* Unit and integration tests
* Dockerized setup

---

## 👤 Author

**Koinyan Nelson**
Full-Stack Software Engineer (Next.js / NestJS / TypeScript)

---

If you want, next I can:

* Tailor this README for a **monorepo**
* Write a **frontend README**
* Add a **“How this meets the assessment criteria”** section
* Simulate **reviewer comments** based on this README
