# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn format` - Format code with Prettier
- `yarn lint` - Check code formatting with Prettier
- `yarn check` - Type-check with svelte-check (runs svelte-kit sync first)
- `yarn check:watch` - Type-check in watch mode

## Architecture Overview

This is a SvelteKit application for Auracare - an AI triage and diagnostics platform for primary care. The application is deployed to Azure Static Web Apps and uses a modern web stack optimized for performance.

### Tech Stack

- **Framework**: SvelteKit 2.22+ with Svelte 5 (using runes and modern Svelte syntax)
- **Deployment**: Azure Static Web Apps adapter (svelte-adapter-azure-swa)
- **Type Safety**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with custom theme utilities and PostCSS
- **Build Tool**: Vite 7+

### Project Structure

- `/src/routes/` - SvelteKit routes (file-based routing)
  - `+page.svelte` - Landing page with all sections (hero, about, team, contact)
  - `+layout.svelte` - Root layout with global styles and animations
- `/src/lib/` - Shared library code and assets
  - `/assets/` - SVG and other assets
- `/src/app.d.ts` - Global TypeScript type definitions
- `/src/app.css` - Global styles with Tailwind CSS and custom utilities
- `/src/app.html` - HTML template
- `/static/` - Static assets served directly
  - Brand assets in multiple formats (SVG, PNG, WebP)
  - favicon files

### Key Implementation Details

#### Svelte 5 Features

- Uses `$state()` for reactive state management
- Uses `$props()` for component properties
- Uses `@render` directive for rendering children

#### Styling Approach

- Custom Tailwind CSS theme with healthcare-focused color palette
- Custom utility classes defined with `@utility` directive
- Responsive design with mobile-first approach
- Animation utilities for fade-in and slide-in effects
- Custom components: btn, card, feature-card, team-card

#### Animation System

- Intersection Observer for scroll-triggered animations
- CSS animation classes: fade-in, slide-in-left, slide-in-right
- Animation delays for staggered effects

### Type Checking and Linting

Always run these commands before committing:

- `yarn check` - Ensures TypeScript types are correct
- `yarn lint` - Ensures code formatting is consistent

The project uses:

- TypeScript strict mode for maximum type safety
- Prettier for consistent code formatting
- svelte-check for Svelte-specific type checking
