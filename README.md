# Tiketing Pro

A TypeScript + React single-page application that visualises support and operations metrics for a fictional ticketing
platform. The project is built with Vite, Tailwind CSS, and a small collection of reusable UI primitives.

## Getting started

1. Install dependencies (uses [pnpm](https://pnpm.io/) by default):

   ```bash
   corepack enable
   pnpm install
   ```

   > **Note:** The automated review environment blocks access to the public npm
   > registry, so `pnpm install`/`npm install` will fail with `403 Forbidden`
   > here. On a workstation with registry access the command will complete and
   > download React, React DOM, and the other dependencies declared in
   > [`package.json`](./package.json).

2. Run the development server:

   ```bash
   pnpm dev
   ```

   The app is served from <http://localhost:5173>.

3. Create a production build:

   ```bash
   pnpm build
   ```

   Preview the production output with:

   ```bash
   pnpm preview
   ```

## Scripts

- `pnpm dev` – start the Vite development server.
- `pnpm build` – type-check and build the production bundle.
- `pnpm preview` – serve the pre-built assets locally.
- `pnpm lint` – run ESLint across the TypeScript source files.

## Tech stack

- [React](https://react.dev/) with React Router for client-side routing.
- [TypeScript](https://www.typescriptlang.org/).
- [Vite](https://vitejs.dev/) for bundling and dev tooling.
- [Tailwind CSS](https://tailwindcss.com/) for styling.
- [lucide-react](https://lucide.dev/) and [Radix UI](https://www.radix-ui.com/) icon/primitives.
