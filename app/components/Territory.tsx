'use client';

import { Territory as TerritoryType } from '../types';

interface TerritoryProps {
  territory: TerritoryType;
  playerColor: string | null;
  isSelected: boolean;
  onClick: () => void;
}

export default function Territory({ territory, playerColor, isSelected, onClick }: TerritoryProps) {
  const backgroundColor = playerColor || '#6b7280';
  const borderColor = isSelected ? '#fbbf24' : '#1f2937';
  
  return (
    <div
      className="absolute cursor-pointer transition-all hover:scale-110"
      style={{
        left: `${territory.x}%`,
        top: `${territory.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={onClick}
    >
      <div
        className="relative flex flex-col items-center justify-center rounded-full w-20 h-20 border-4 shadow-lg"
        style={{
          backgroundColor,
          borderColor,
        }}
      >
        <div className="text-white text-xs font-bold text-center px-1 leading-tight">
          {territory.name}
        </div>
        <div className="text-white text-xl font-bold mt-1">
          {territory.troops}
        </div>
      </div>
    </div>
  );
}
