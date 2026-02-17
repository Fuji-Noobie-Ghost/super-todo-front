# Super Todo Front

A modern todo application frontend built with React, TypeScript, and Vite.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material-UI** - UI component library
- **React Query** - Data fetching and state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client

## Prerequisites

- Node.js 23+
- pnpm (enabled via corepack)

## Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

### Preview Production Build

```bash
pnpm preview
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
VITE_API_BASE_URL=
```

## Docker

Build and run with Docker:

```bash
docker build --build-arg VITE_API_BASE_URL=http://your-api-url -t super-todo-front .
docker run -p 80:80 super-todo-front
```

## Project Structure

```
src/
├── core/           # Core utilities and configurations
│   └── api/        # API client setup
├── features/       # Feature modules
│   └── todo/       # Todo feature (components, pages, services, queries, mutations)
├── components/     # Shared components
├── App.tsx         # Root component
└── main.tsx        # Entry point
```

## Features

- Create, read, update, and delete todos
- Form validation with Zod
- Optimistic updates with React Query
- Responsive UI with Material-UI
