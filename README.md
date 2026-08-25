# Auracare website (SvelteKit + Yarn)

Marketing site for Auracare built with SvelteKit 2, Svelte 5, Vite 7 and Tailwind CSS 4.

## Prerequisites

- Node: 22.12.0 is pinned via `.nvmrc` (engines also allow `^20.19` or `>=24`).
- Package manager: Yarn Classic (v1). The repo is standardized on Yarn and includes a `yarn.lock`.

## Setup

```sh
# Use the pinned Node version
nvm use    # or: fnm use

# Install dependencies without modifying yarn.lock
yarn install --frozen-lockfile
```

## Develop

```sh
yarn dev
# or open a browser automatically
yarn dev --open
```

## Build and preview

```sh
yarn build
yarn preview
```

## Notes

- Deploys target Azure Static Web Apps using `svelte-adapter-azure-swa`.
- If you use a different Node manager, ensure it respects `.nvmrc` (e.g., `fnm env --use-on-cd`).
