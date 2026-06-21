# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Design system:** Before designing or generating any new UI, read `content/system.mdx` — the single source of truth for tokens, type, components (`registry/`), and patterns. It renders at the unlisted `/system` route (`app/system/`). `app/globals.css` is canonical for token values; keep `content/system.mdx` in sync when they change.

## Project Overview

Personal design portfolio of Maximillian Piras showcasing product design work for tech startups, with specialization in AI-powered interfaces, UX design, and creative technology. The site features interactive card stacks, AI chat integration, and animated UI components.

**Live Site**: https://www.maximin.design
**Tech Stack**: Vanilla JS frontend + Express.js backend + OpenAI API + Vercel Postgres
**Deployment**: Vercel

## High-Level Architecture

### Main Application Structure

The portfolio is built as a **static frontend with Express API backend**:

1. **Frontend (`/public/`)**: Vanilla JavaScript application with custom component architecture
   - No build step or bundler required
   - Direct DOM manipulation and CSS transitions
   - jQuery used for animations and DOM utilities

2. **Backend (`/api/index.js`)**: Express server handling:
   - OpenAI API proxy endpoints (`/api/openai/meta`, `/api/openai/folio`)
   - Database operations via Vercel Postgres
   - Serves static files from `/public/`

3. **Controllers (`/controllers/`)**: Business logic layer
   - `openaiController.js`: AI chat functionality with extensive prompt engineering for portfolio recommendations

### Component System

Custom modular component architecture in `/public/components/`:

- **FolioEngine.js** (758 lines): Core portfolio interaction system
  - Card stack positioning with randomized rotations
  - Expand/collapse animations for card stacks
  - Video/image lazy loading
  - Hover effects and blur transitions
  - Initial styles object defines all default states
  - Uses Map to store per-stack random rotation factors

- **NavBar.js**: Navigation system with slide-out panels
  - Info view, chat view, and contact view states
  - Manages overlay and panel visibility

- **ChatIntelligence.js**: AI chat integration
  - Connects to OpenAI endpoints
  - Displays portfolio recommendations based on user queries

- **CardStack.js**: Reusable card stack component with various configurations

### Experiments Directory (`/public/exp/`)

Numbered experimental projects (001-016+) containing:
- **React/Next.js projects** (e.g., 002, 009, 012-014): Modern web experiments with TypeScript
  - Run with `npm run dev` (Next.js) or `npm start` (Create React App)
  - Next.js projects use Tailwind v4, AI SDK integrations
  - React projects may include video processing, ASCII art, text effects

- **Standalone HTML demos** (e.g., 001, 008): Pure HTML/CSS/JS prototypes
  - Often use Tailwind CSS
  - Self-contained demonstrations

Each experiment is independent with its own `node_modules/` and `package.json`

## Development Commands

### Main Portfolio

```bash
# Local development (from root)
node api/index.js
# Server runs on http://localhost:8080

# Deploy to Vercel (automatic on git push to main)
```

### Experiments (Next.js projects)

```bash
cd public/exp/XXX  # where XXX is experiment number

# Development
npm run dev        # Next.js with Turbopack

# Production
npm run build
npm start

# Linting
npm run lint
```

### Experiments (React projects)

```bash
cd public/exp/XXX

# Development
npm start         # Create React App dev server

# Production
npm run build
```

## Key Technical Patterns

### State Management in FolioEngine

The portfolio uses **inline styles with transition animations** rather than CSS classes:

```javascript
// Initial styles defined as object
const initialStyles = {
  card: {
    borderRadius: '24px',
    height: '300px',
    width: '300px',
    transition: 'all 0.35s ease'
  }
}

// Applied with Object.assign
Object.assign(element.style, initialStyles.card);
```

### Card Stack Expansion Flow

1. User clicks `CardStackLabelContainer`
2. `expandCardStackLabelContainer()` toggles 'expanded' class
3. Sequential animations:
   - Hide non-expanded stacks (width/height → 0)
   - Expand clicked stack to fullscreen
   - Fan out cards in grid layout
   - Show inner containers with metadata
4. StackBar appears with section name and close button

### AI Chat Integration

OpenAI controller (`controllers/openaiController.js`) contains:
- **Detailed portfolio knowledge**: Case studies with metadata (cardImage, cardHeader, cardDescription, cardURL)
- **Structured JSON responses**: AI returns formatted recommendations
- Two endpoints:
  - `/api/openai/meta`: General portfolio recommendations
  - `/api/openai/folio`: Extended portfolio knowledge queries

### Video Handling

Cards support both images and videos via data attributes:

```html
<div class="Card"
     data-src="path/to/image.gif"
     data-video-src="path/to/video.webm">
```

- Safari automatically falls back to .mp4 version
- Videos are muted, autoplay, loop, playsInline
- Zoom functionality for both images (Intense.js) and videos (modal)

## Styling Philosophy

- **Glassmorphism aesthetic**: `backdrop-filter: blur()` with semi-transparent backgrounds
- **Gradient animations**: Animated background gradients with `.gradeBG` and `.gradeFront` layers
- **Smooth transitions**: Everything uses 0.15s-0.5s ease transitions
- **Z-index layering**: Cards stack with calculated z-index based on position
- **Custom fonts**: 'Homemade Apple' for handwritten labels, 'Archivo' for UI text

## Important Implementation Notes

### When Editing FolioEngine.js

- The `initialStyles` object at the top defines ALL default states
- `setDefaultCardStackStyles()` resets elements to initial state
- Card positions use randomized rotations stored in `stackRandomFactors` Map
- Always use `setCardPosition()` to update card transforms
- Hover effects check for 'expanded' class to prevent conflicts

### When Adding New Card Stacks

1. Add HTML structure to `index.html` following existing pattern
2. Cards auto-load via `loadCards()` on DOMContentLoaded
3. Use `data-src` for images, `data-video-src` for videos
4. Add `id="cardZoom"` for zoom functionality
5. Add `id="cardLinkOut"` with `data-href` for external links

### Environment Variables

Required in Vercel or local `.env`:
- OpenAI API key (for chat functionality)
- Vercel Postgres credentials (for user input storage)

### Vercel Configuration

`vercel.json` routes all `/api/*` requests to `/api/index.js`

## Testing Strategy

- Manual testing in browser (no automated test suite)
- Test card stack interactions: hover, click, expand, collapse
- Verify video playback across Safari/Chrome
- Check AI chat responses and card recommendations
- Test responsive behavior (viewport meta tag set to 0.75 scale)

## Common Gotchas

1. **jQuery dependency**: Main animations use jQuery - loaded from CDN
2. **Deferred loading**: Scripts use `defer` attribute for performance
3. **Card margin**: Cards use negative margin (`-160px`) to create stacked effect
4. **Escape key**: Closes expanded stacks (keyboard shortcut)
5. **Background layers**: `.gradeFront` and `.gradeBG` provide animated gradient background
6. **Intro animation**: Controlled by `initIntroAnimation()`, blocks scroll until complete
7. **Asset paths**: All relative to `/public/` directory
