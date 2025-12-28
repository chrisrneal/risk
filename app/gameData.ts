import { Territory, Player } from './types';

export const initialTerritories: Territory[] = [
  { id: 't1', name: 'North America', owner: null, troops: 0, neighbors: ['t2', 't4'], x: 20, y: 25 },
  { id: 't2', name: 'South America', owner: null, troops: 0, neighbors: ['t1', 't3'], x: 25, y: 55 },
  { id: 't3', name: 'Africa', owner: null, troops: 0, neighbors: ['t2', 't4', 't5'], x: 50, y: 55 },
  { id: 't4', name: 'Europe', owner: null, troops: 0, neighbors: ['t1', 't3', 't5'], x: 50, y: 25 },
  { id: 't5', name: 'Asia', owner: null, troops: 0, neighbors: ['t3', 't4', 't6'], x: 70, y: 25 },
  { id: 't6', name: 'Australia', owner: null, troops: 0, neighbors: ['t5'], x: 80, y: 65 },
];

export const initialPlayers: Player[] = [
  { id: 0, name: 'Player 1', color: '#3b82f6', troops: 15 },
  { id: 1, name: 'Player 2', color: '#ef4444', troops: 15 },
];

export function initializeGame(): { territories: Territory[], players: Player[] } {
  const territories = [...initialTerritories];
  const players = [...initialPlayers];
  
  // Randomly assign territories to players using Fisher-Yates shuffle
  for (let i = territories.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [territories[i], territories[j]] = [territories[j], territories[i]];
  }
  
  territories.forEach((territory, index) => {
    territory.owner = index % players.length;
    territory.troops = 1;
    players[territory.owner].troops -= 1;
  });
  
  return { territories, players };
}
