'use client';

import dynamic from 'next/dynamic';

const GameBoard = dynamic(() => import('./components/GameBoard'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="text-white text-2xl">Loading game...</div>
    </div>
  ),
});

export default function Home() {
  return <GameBoard />;
}
