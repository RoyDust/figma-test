# Twitter MVP Design

**Goal:** Build a simple Twitter-like MVP from scratch with real authentication, posting, timeline browsing, and likes.

**Architecture:** Use a single Next.js App Router application to serve the UI and backend endpoints. Persist data with Prisma on local SQLite, and manage sessions with NextAuth so the first release is easy to run locally while keeping a clear path to future database upgrades.

**Tech Stack:** Next.js App Router, Prisma, SQLite, NextAuth

## Product Scope

This MVP supports user registration, login, logout, posting short text updates, viewing a reverse-chronological home timeline, and liking or unliking posts. It intentionally excludes follows, comments, reposts, media upload, notifications, and recommendation features.

## Architecture

- Next.js App Router provides pages, route handlers, and server-side rendering.
- Prisma manages the data model and database access against a local SQLite database.
- NextAuth manages session state and protected actions.
- Route handlers or server actions provide the server boundary for register, create post, and like actions.

## Data Model

- `User`: identity, profile basics, and hashed password storage.
- `Post`: post content, author reference, and timestamps.
- `Like`: unique user-to-post like relationship.
- NextAuth adapter tables handle account and session persistence.

## UX and Permissions

- Guests can browse the timeline but cannot post or like.
- Authenticated users can publish posts and toggle likes.
- Post content is limited and validated server-side.
- Auth errors and duplicate signup errors return clear, user-facing messages.

## Testing Strategy

- Service and model tests for registration, password validation, post creation, and like uniqueness.
- API tests for register, login, posting, and like toggling.
- A small end-to-end flow covering login, posting, timeline visibility, and likes.
