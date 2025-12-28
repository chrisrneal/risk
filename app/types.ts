export interface Territory {
  id: string;
  name: string;
  owner: number | null;
  troops: number;
  neighbors: string[];
  x: number;
  y: number;
}

export interface Player {
  id: number;
  name: string;
  color: string;
  troops: number;
}

export interface GameState {
  territories: Territory[];
  players: Player[];
  currentPlayer: number;
  phase: 'deploy' | 'attack' | 'fortify';
  selectedTerritory: string | null;
  availableTroops: number;
}
