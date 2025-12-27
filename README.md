# My Monorepo Project

Welcome to the project! This is a **Monorepo** powered by **Turborepo** and **pnpm**.

This guide is designed to help you understand the structure, set up your environment, and get started with development.

## 📚 What is a Monorepo?

A **Monorepo** (Monolithic Repository) is a single repository that contains multiple distinct projects, with well-defined relationships.

Instead of having separate repositories for the frontend (`web`), backend (`api`), and shared libraries (`ui`, `database`), we keep them all here. This allows us to:

- Share code easily (like UI components and database types).
- Manage dependencies in one place.
- Refactor across the entire stack atomically.

## 🚀 What is Turborepo?

**Turborepo** is a high-performance build system for JavaScript and TypeScript monorepos. It handles the task running (like checking for cache hits so you don't rebuild things that haven't changed) and orchestration (running tasks in parallel).

## 📂 Project Structure

Here is an overview of the folder structure:

```
file-forge/
├── apps/
│   ├── api/            # Backend API (Express/Node)
│   │   ├── src/        # API source code (routes, controllers)
│   │   └── ...
│   └── web/            # Frontend application (Next.js)
│       ├── src/        # React components and pages
│       ├── public/     # Static assets
│       └── ...
├── packages/           # Shared libraries
│   ├── database/       # Prisma ORM setup
│   │   ├── prisma/     # Schema definition
│   │   └── src/        # Generated client and seed scripts
│   ├── eslint-config/  # Shared code linting rules
│   ├── typescript-config/ # Shared TS compiler options
│   └── ui/             # Design System & Shadcn Components
│       ├── src/
│       │   ├── components/ # Shared UI components (Button, Input, etc.)
│       │   └── styles/     # Global CSS and Tailwind config
│       └── ...
├── package.json        # Root scripts (pnpm dev, build)
├── pnpm-workspace.yaml # Defines the workspace roots
└── turbo.json          # Turbo build pipeline config
```

## 🛠️ Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (Package Manager)

## 🎨 UI & Design System (Shadcn + Tailwind)

Our project uses a shared UI package (`packages/ui`) that includes **Shadcn UI** components and **Tailwind CSS** configuration. This allows both the web app and potential future apps to use the same design system.

### How it works

- **Tailwind Setup**: The tailwind configuration is centralized in `packages/ui`. Apps import the global CSS from `@repo/ui/globals.css`.
- **Component Library**: All Shadcn components (Button, Card, etc.) live in `packages/ui/src/components`.

### Installing New Components

You can install new Shadcn components directly into the shared UI library.

**Method 1: From `packages/ui` (Recommended)**
Navigate to the UI package and run the add command:

```bash
cd packages/ui
pnpm dlx shadcn@latest add [component-name]
```

**Method 2: From `apps/web`**
Since our `web` app is configured with path aliases pointing to the UI package, you can also run the command from there:

```bash
cd apps/web
pnpm dlx shadcn@latest add [component-name]
```

_Note: This works because `apps/web/tsconfig.json` maps `@repo/ui/_`to`../../packages/ui/src/_`._

After installation, the component will appear in `packages/ui/src/components` and can be imported in your app:

```tsx
import { Button } from "@repo/ui/components/button";

export default function Page() {
  return <Button>Click me</Button>;
}
```

Before you begin, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (Package Manager)

If you don't have `pnpm` installed, you can enable it with Corepack (included with Node.js):

```bash
corepack enable
```

## 🏁 Getting Started

### 1. Install Dependencies

Install all dependencies for all apps and packages from the root directory:

```bash
pnpm install
```

### 2. Database Setup (Prisma)

Our database configuration lives in `packages/database`. You need to generate the Prisma Client types before running the apps.

```bash
# Generate Prisma Client
pnpm generate

# Push schema changes to your database (if you have a database connection set up in .env)
pnpm db:push
```

_Note: Make sure you have your environment variables set up (e.g., `DATABASE_URL`) in the root directory `.env.local` file._

## 🏃‍♂️ Running the Project

### Run Everything (Dev Mode)

To start both the **Web** and **API** applications simultaneously:

```bash
pnpm dev:apps
```

This command uses Turbo to run the `dev` script in all workspaces.

### Run Individual Apps

If you only want to work on one part of the stack, you can filter the run command:

**Run only the Web App:**

```bash
# Using pnpm filter
pnpm --filter @repo/web dev
```

**Run only the API:**

```bash
# Using pnpm filter
pnpm --filter @repo/api dev
```

## 📋 Common Scripts

These scripts are defined in the root `package.json` and are helpful for daily tasks:

| Command | Description |
|Col1|Col2|
| `pnpm build` | Build all apps and packages. |
| `pnpm format` | Format code using Prettier. |
| `pnpm clean` | Delete all `node_modules`, `.next`, and build artifacts to start fresh. |
| `pnpm check-types` | Run TypeScript type checking. |

## 🗄️ Working with Prisma (Database)

Since the database is a shared package, most Prisma commands can be run from the root using Turbo or by filtering.

- **Generate Client**: `pnpm generate`
- **Push Schema**: `pnpm db:push`
- **Migrate Deploy**: `pnpm db:migrate:deploy`
- **Seed Database**: `pnpm db:seed`
