# Vartur Assignment

## 📋 Project Overview

This project is a backend API built with **Fastify**, **TypeScript**, **Prisma ORM**, **MySQL**, and **Redis**.  
It includes:

- User authentication with JWT
- CRUD operations for Categories and Products
- Input validation
- Swagger (OpenAPI) documentation
- Redis integration for token storage

---

## 🚀 Tech Stack

- Fastify (v5.x)
- TypeScript
- Prisma ORM
- MySQL database
- Redis server
- Swagger (OpenAPI) Documentation

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/vartur-assignment.git
cd vartur-assignment
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file in the project root with the following content:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_key
DATABASE_URL="mysql://<username>:<password>@localhost:3306/vartur_assignment"
REDIS_URL="redis://localhost:6379"
ENVIRONMENT=dev
```

👉 Replace `<username>` and `<password>` with your MySQL user credentials.

---

### 4. Setup Database

Run the following commands:

```bash
npm run migrate
npm run seed
```

The seeded user credentials are:

| Username | Password |
| -------- | -------- |
| admin    | admin    |

---

### 5. Start Redis Server

If Redis is installed via Homebrew:

```bash
brew services start redis
```

---

### 6. Build and Run the Application

In a new terminal:

```bash
npm run build
npm start
```

👉 The server will start on:

```
http://localhost:3000
```

---

## 📚 API Documentation

Once the server is running, open your browser at:

```
http://localhost:3000/docs
```

👉 Swagger UI will show all available API endpoints.

---

## 📦 Available Scripts

| Script          | Command                                                  | Purpose                                                  |
| --------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `npm run local` | `ENVIRONMENT=local nodemon --exec ts-node src/server.ts` | Run server in Local environment (local DB, local Redis)  |
| `npm run dev`   | `ENVIRONMENT=dev nodemon --exec ts-node src/server.ts`   | Run server in Dev environment (dev DB, dev Redis)        |
| `npm run prod`  | `ENVIRONMENT=prod node dist/server.js`                   | Run server in Production environment from compiled files |
| `npm run build` | `tsc`                                                    | Build TypeScript files into `/dist` folder               |
| `npm start`     | Alias for `npm run prod`                                 | Shortcut to start production build                       |

These scripts automatically apply the correct environment (`local`, `dev`, or `prod`).  
No need to change `.env` manually.  
Simply run the corresponding script depending on the target environment.

---

## ✨ Author

Prepared by **Mo'men Ayman** for **Vartur Backend Developer Assignment**.

---
