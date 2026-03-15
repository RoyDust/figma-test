## Twitter MVP

A simple Twitter-like MVP built with `Next.js App Router + Prisma + SQLite + NextAuth`.

## Features

- User registration and login with credentials
- Create text posts
- Reverse-chronological timeline
- Like and unlike posts
- Guest users can browse but cannot post or like

## Getting Started

Install dependencies and initialize the local database:

```bash
npm install
npm run db:generate
npm run db:push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev`: start the local development server
- `npm run db:generate`: generate the Prisma client
- `npm run db:push`: initialize the local SQLite schema
- `npm test`: run the Vitest suite
- `npm run lint`: run ESLint
- `npm run build`: produce a production build

## Stack

- Next.js 16
- Prisma Client with SQLite
- NextAuth credentials provider
- Vitest for service and route guard tests
