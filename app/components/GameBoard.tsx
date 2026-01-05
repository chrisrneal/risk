'use client';

import { useState, useEffect, useRef } from 'react';
import { GameState, Territory as TerritoryType } from '../types';
import { initializeGame } from '../gameData';
import Territory from './Territory';

export default function GameBoard() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const { territories, players } = initializeGame();
    return {
      territories,
      players,
      currentPlayer: 0,
      phase: 'deploy',
      selectedTerritory: null,
      availableTroops: players[0].troops,
    };
  });

  const [message, setMessage] = useState<string>('Deploy your troops!');
  const pendingMessageRef = useRef<string | null>(null);

  // Effect to handle pending messages from attack outcomes
  useEffect(() => {
    if (pendingMessageRef.current) {
      setMessage(pendingMessageRef.current);
      pendingMessageRef.current = null;
    }
  }, [gameState]);

  const currentPlayer = gameState.players[gameState.currentPlayer];

  const handleTerritoryClick = (territoryId: string) => {
    const territory = gameState.territories.find(t => t.id === territoryId);
    if (!territory) return;

    if (gameState.phase === 'deploy') {
      // Deploy troops to owned territories
      if (territory.owner === gameState.currentPlayer && gameState.availableTroops > 0) {
        setGameState(prev => ({
          ...prev,
          territories: prev.territories.map(t =>
            t.id === territoryId ? { ...t, troops: t.troops + 1 } : t
          ),
          availableTroops: prev.availableTroops - 1,
        }));
        setMessage(`Deployed 1 troop to ${territory.name}. ${gameState.availableTroops - 1} troops remaining.`);
      }
    } else if (gameState.phase === 'attack') {
      if (!gameState.selectedTerritory) {
        // Select attacking territory
        if (territory.owner === gameState.currentPlayer && territory.troops > 1) {
          setGameState(prev => ({ ...prev, selectedTerritory: territoryId }));
          setMessage(`Selected ${territory.name}. Now select an adjacent enemy territory to attack.`);
        } else {
          setMessage('Select a territory you own with more than 1 troop.');
        }
      } else {
        // Select defending territory and attack
        const attackingTerritory = gameState.territories.find(t => t.id === gameState.selectedTerritory);
        if (
          attackingTerritory &&
          territory.owner !== gameState.currentPlayer &&
          attackingTerritory.neighbors.includes(territoryId)
        ) {
          performAttack(attackingTerritory, territory);
        } else {
          setGameState(prev => ({ ...prev, selectedTerritory: null }));
          setMessage('Invalid target. Select one of your territories to attack from.');
        }
      }
    }
  };

  const performAttack = (attacker: TerritoryType, defender: TerritoryType) => {
    setGameState(prev => {
      // Simplified attack: random outcome based on troop counts
      const attackRoll = Math.floor(Math.random() * 6) + 1;
      const defenseRoll = Math.floor(Math.random() * 6) + 1;
      
      const attackerWins = attackRoll > defenseRoll;
      
      let conquered = false;
      let messageToSet = '';
      
      const newTerritories = prev.territories.map(t => {
        if (t.id === defender.id) {
          const newTroops = t.troops - 1;
          if (newTroops === 0) {
            // Attacker conquers
            conquered = true;
            const conqueredTroops = attacker.troops - 1;
            messageToSet = `${attacker.name} conquered ${defender.name}!`;
            return { ...t, owner: attacker.owner, troops: conqueredTroops };
          }
          if (attackerWins) {
            messageToSet = `Attack successful! Defender lost 1 troop.`;
          }
          return attackerWins ? { ...t, troops: newTroops } : t;
        }
        if (t.id === attacker.id) {
          if (conquered) {
            // Attacker used troops to conquer
            return { ...t, troops: 1 };
          }
          if (!attackerWins) {
            // Attacker lost the attack
            messageToSet = `Attack failed! Attacker lost 1 troop.`;
            return { ...t, troops: t.troops - 1 };
          }
        }
        return t;
      });

      // Check for win condition
      const owners = new Set(newTerritories.map(t => t.owner));
      if (owners.size === 1 && newTerritories.length > 0) {
        const winnerId = newTerritories[0].owner;
        if (winnerId != null) {
          const winner = prev.players[winnerId];
          messageToSet = `🎉 ${winner.name} wins! They control all territories!`;
        }
      }

      // Store message in ref to be picked up by useEffect
      if (messageToSet) {
        pendingMessageRef.current = messageToSet;
      }

      return {
        ...prev,
        territories: newTerritories,
        selectedTerritory: null,
      };
    });
  };

  const endPhase = () => {
    if (gameState.phase === 'deploy') {
      if (gameState.availableTroops === 0) {
        setGameState(prev => ({ ...prev, phase: 'attack' }));
        setMessage('Attack phase: Select a territory to attack from.');
      } else {
        setMessage(`Deploy all troops before continuing. ${gameState.availableTroops} remaining.`);
      }
    } else if (gameState.phase === 'attack') {
      // End turn
      const nextPlayer = (gameState.currentPlayer + 1) % gameState.players.length;
      const reinforcements = Math.max(3, Math.floor(
        gameState.territories.filter(t => t.owner === nextPlayer).length / 3
      ));
      
      setGameState(prev => ({
        ...prev,
        currentPlayer: nextPlayer,
        phase: 'deploy',
        selectedTerritory: null,
        availableTroops: reinforcements,
        players: prev.players.map(p =>
          p.id === nextPlayer ? { ...p, troops: reinforcements } : p
        ),
      }));
      setMessage(`${gameState.players[nextPlayer].name}'s turn! Deploy ${reinforcements} troops.`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 p-4">
      {/* Header */}
      <div className="bg-gray-800 rounded-lg p-4 mb-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Risk Game</h1>
            <div 
              className="text-xl font-semibold px-4 py-2 rounded inline-block"
              style={{ backgroundColor: currentPlayer.color }}
            >
              {currentPlayer.name}&apos;s Turn
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg text-gray-300 mb-2">
              Phase: <span className="font-bold text-white capitalize">{gameState.phase}</span>
            </div>
            {gameState.phase === 'deploy' && (
              <div className="text-lg text-gray-300">
                Troops to deploy: <span className="font-bold text-white">{gameState.availableTroops}</span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 text-yellow-300 text-lg">{message}</div>
      </div>

      {/* Game Board */}
      <div className="flex-1 bg-gray-800 rounded-lg relative overflow-hidden shadow-lg">
        {gameState.territories.map(territory => {
          const owner = territory.owner !== null ? gameState.players[territory.owner] : null;
          return (
            <Territory
              key={territory.id}
              territory={territory}
              playerColor={owner?.color || null}
              isSelected={territory.id === gameState.selectedTerritory}
              onClick={() => handleTerritoryClick(territory.id)}
            />
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={endPhase}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          {gameState.phase === 'deploy' ? 'End Deploy Phase' : 'End Turn'}
        </button>
        <button
          onClick={() => {
            const { territories, players } = initializeGame();
            setGameState({
              territories,
              players,
              currentPlayer: 0,
              phase: 'deploy',
              selectedTerritory: null,
              availableTroops: players[0].troops,
            });
            setMessage('New game started! Deploy your troops.');
          }}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          New Game
        </button>
      </div>

      {/* Player Info */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {gameState.players.map(player => {
          const territoriesOwned = gameState.territories.filter(t => t.owner === player.id).length;
          const totalTroops = gameState.territories
            .filter(t => t.owner === player.id)
            .reduce((sum, t) => sum + t.troops, 0);
          
          return (
            <div
              key={player.id}
              className="bg-gray-800 rounded-lg p-3"
              style={{ borderLeft: `4px solid ${player.color}` }}
            >
              <div className="text-white font-bold">{player.name}</div>
              <div className="text-gray-300 text-sm">
                Territories: {territoriesOwned} | Troops: {totalTroops}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
