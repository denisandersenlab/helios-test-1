# Next.js + Storyblok + Tailwind CSS

A modern web application built with:

- **Next.js 14+** (App Router)
- **Storyblok CMS** for content management
- **Tailwind CSS** for styling
- **TypeScript** for type safety

## Getting Started

### 1. Install Dependencies

```bash
pnpm i
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your Storyblok credentials:

```env
STORYBLOK_PAT_TOKEN=""
NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN=""
STORYBLOK_SPACE_ID=
```

### 3. Generate Types (Optional)

Generate TypeScript types from your Storyblok components:

```bash
pnpm run pull-schemas
```

### 4. Run Development Server

```bash
pnpm run dev
```

Open [https://localhost:3000](https://localhost:3000) in your browser.

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint
- `pnpm run type-check` - Run TypeScript compiler
- `pnpm run pull-schemas` - Generate types from Storyblok
- `pnpm run generate-types` - Alias for pull-schemas

## Storyblok Components

The following components are configured:

- **Page** - Main page wrapper
- **Hero** - Hero section with title, subtitle, and optional image
- **Feature** - Feature card with image, name, and description
- **Grid** - Responsive grid layout for organizing content
- **Teaser** - Content teaser with headline, description, and link

## Project Structure

```
├── app/                    # Next.js App Router
├── components/
│   ├── storyblok/         # Storyblok components
│   ├── StoryblokProvider.tsx
│   └── StoryblokStory.tsx
├── src/generated/         # Auto-generated types
└── ...
```

## Storyblok Setup

1. Create a new space in Storyblok
2. Create the following component schemas:
   - Page (with body field)
   - Hero (title, subtitle, image)
   - Feature (name, description, image)
   - Grid (columns field)
   - Teaser (headline, description, link)
3. Create a "Home" story using the Page component
4. Add your API tokens to the environment variables

## Type Safety

This project uses TypeScript interfaces for all Storyblok components. You can generate updated types by running:

```bash
npm run pull-schemas
```

This will create type definitions in `src/generated/` based on your Storyblok component schemas.
