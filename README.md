# Quiz Builder — Monorepo

This repository contains a Next.js frontend and a NestJS + Prisma backend for creating and taking quizzes.

What this README covers
- How to start the frontend and backend
- How to set up the PostgreSQL database (local via Docker)
- How to run Prisma migrations and generate the client
- How to create a sample quiz via the backend API

Prerequisites
- Node.js 18+ and npm
- Docker (recommended for local Postgres) or an existing Postgres instance
- Git (optional)

Repository layout
- Frontend: frontend
- Backend: backend
- Backend Docker compose: backend/compose.yaml

1) Environment variables
Create a `.env` in the `backend` folder with a `DATABASE_URL`. Example:
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/quizzes-app?schema=public

2) Start local Postgres (Docker)
From the `backend` folder:
```bash
cd backend
docker compose -f [compose.yaml](http://_vscodecontentref_/1) up -d
```

3) Defaults in compose:

DB name: quizzes-app
User: postgres
Password: postgres
Backend — install, generate Prisma client, run migrations, and run

```bash
cd backend
npm install

# generate Prisma client
npx prisma generate [schema.prisma](http://_vscodecontentref_/2)

# run migrations (creates DB schema)
npx prisma migrate dev --name init [schema.prisma](http://_vscodecontentref_/3)

# start backend (dev)
npm run start:dev
```

Default backend URL: http://localhost:8080

4) Frontend — install and start

```bash
cd frontend
npm install
npm run dev
```

Default frontend URL: http://localhost:3000

5) Create a sample quiz (HTTP POST)

POST to http://localhost:8080/quizzes:
```bash
curl -X POST http://localhost:8080/quizzes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Quiz",
    "questions": [
      {
        "question": "Is the sky blue?",
        "type": "Boolean",
        "answer": ["true"]
      },
      {
        "question": "What is 2 + 2?",
        "type": "Input",
        "answer": ["4"]
      },
      {
        "question": "Choose the fruit(s):",
        "type": "Checkbox",
        "answerOptions": ["Apple", "Carrot", "Banana"],
        "answer": ["Apple", "Banana"]
      }
    ]
  }'
```

6) Useful API endpoints
- GET /quizzes — list all quizzes
- GET /quizzes/:id — get a quiz by id
- POST /quizzes — create a quiz
- PATCH /quizzes/:id — update quiz title (body: { "title": "New title" })
- DELETE /quizzes/:id — delete quiz

7) Notes & troubleshooting
- If Prisma or Nest throws DATABASE_URL is not defined, ensure backend/.env exists or export DATABASE_URL.
- If npx prisma migrate dev errors about connections, ensure Postgres is running and accessible.
- Backend CORS allows http://localhost:3000; change if needed.