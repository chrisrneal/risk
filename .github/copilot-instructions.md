# Copilot Instructions for Risk Game

## Project Overview

This is a turn-based Risk-like strategy board game built with Next.js and TypeScript. The game features 2-player gameplay with 6 territories on a simplified world map, including deploy and attack phases with dice-based combat.

## Technology Stack

- **Next.js 16**: React framework with App Router
- **React 19**: UI library  
- **TypeScript 5**: Type safety and static analysis
- **Tailwind CSS 4**: Utility-first styling
- **ESLint**: Code quality and style checking
- **Vercel**: Deployment platform

## Development Setup

### Prerequisites
- Node.js (v20 or higher recommended)
- npm

### Getting Started
```bash
npm install           # Install dependencies
npm run dev          # Start development server at http://localhost:3000
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## Project Structure

```
/app                  # Next.js App Router directory
  /components        # React components (Territory, GameBoard)
  gameData.ts        # Game configuration and territory definitions
  types.ts           # TypeScript type definitions
  page.tsx           # Main game page
  layout.tsx         # Root layout
  globals.css        # Global styles
/public              # Static assets
```

## Coding Standards and Conventions

### TypeScript
- Use strict TypeScript mode (enabled in tsconfig.json)
- Define types in `app/types.ts` for shared types
- Use explicit type annotations for function parameters and return types
- Avoid using `any` type

### React Components
- Use functional components with TypeScript
- Follow React 19 conventions
- Use React hooks for state management
- Keep components in `/app/components` directory

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design principles
- Keep consistent spacing and color schemes

### Code Quality
- Follow Next.js ESLint configuration (eslint-config-next)
- Use TypeScript's core-web-vitals rules
- Run `npm run lint` before committing changes

### Naming Conventions
- Components: PascalCase (e.g., `Territory.tsx`, `GameBoard.tsx`)
- Files: camelCase for utilities (e.g., `gameData.ts`)
- Types/Interfaces: PascalCase
- Variables/Functions: camelCase

## Game Logic

### Key Concepts
- **Territory**: Individual map regions with owner and troop count
- **Deploy Phase**: Players place troops on their territories
- **Attack Phase**: Players can attack adjacent enemy territories
- **Combat**: Dice-based resolution system
- **Turn System**: Players alternate turns, receiving reinforcements based on controlled territories

### State Management
- Game state is managed in the main page component
- Territory data structure defined in `types.ts`
- Game configuration in `gameData.ts`

## Testing

Currently, there is no formal test suite in place. When adding tests:
- Use Jest or Vitest for unit tests
- Use React Testing Library for component tests
- Follow Next.js testing conventions
- Test game logic separately from UI components

## Deployment

The application is deployed on Vercel:
- Automatic deployments from main branch
- Preview deployments for pull requests
- Configuration in `vercel.json`

## Making Changes

### For New Features
1. Consider the game's turn-based nature and state management
2. Update types in `types.ts` if needed
3. Add components to `/app/components` for UI elements
4. Update `gameData.ts` for configuration changes
5. Test locally with `npm run dev`
6. Run linting with `npm run lint`

### For Bug Fixes
1. Identify the affected component or logic
2. Make minimal changes to fix the issue
3. Ensure the fix doesn't break existing gameplay
4. Test the complete game flow

### For Documentation
1. Update README.md for user-facing documentation
2. Update this file for developer guidance
3. Add inline comments for complex game logic only

## Common Tasks

### Adding a New Territory
1. Update territory definitions in `gameData.ts`
2. Update adjacency map
3. Update territory rendering in `GameBoard.tsx`

### Modifying Combat Logic
1. Locate combat resolution in main game page
2. Update dice roll mechanics
3. Ensure fair and balanced gameplay

### Styling Changes
1. Use existing Tailwind classes when possible
2. Add custom styles in `globals.css` only if necessary
3. Maintain consistent design system

## Important Notes

- Keep changes minimal and focused
- Preserve existing game functionality unless specifically updating it
- Consider edge cases in turn-based gameplay
- Ensure UI updates reflect game state accurately
- Mobile responsiveness is important for accessibility
