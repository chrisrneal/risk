# Risk Game

A simple Risk-like strategy board game built with Next.js and TypeScript.

## Features

- 2-player turn-based strategy game
- 6 territories on a simplified world map
- Deploy phase: Place your troops on your territories
- Attack phase: Attack adjacent enemy territories
- Simple dice-based combat system
- Real-time game state updates

## Getting Started

### Development

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the game.

### Building for Production

```bash
npm run build
npm start
```

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com).

### Deployment Steps:

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy"

That's it! Vercel will build and deploy your application automatically.

### Alternative: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```

## How to Play

1. **Deploy Phase**: Click on your territories (shown in your color) to deploy troops. You must deploy all available troops before proceeding.

2. **Attack Phase**: 
   - Click on one of your territories with more than 1 troop to select it as the attacker
   - Click on an adjacent enemy territory to attack
   - Combat is resolved with dice rolls
   - Repeat until you're ready to end your turn

3. **End Turn**: Click "End Turn" to pass to the next player. You'll receive reinforcements based on the number of territories you control.

4. **Win Condition**: Control all territories to win!

## Technology Stack

- **Next.js 16**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Vercel**: Deployment platform

