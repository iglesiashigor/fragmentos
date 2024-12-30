import React from 'react';
import type { Card } from '../types/card';

interface CardSelectionProps {
  card: Card;
  count: number;
  totalCards: number;
  onUpdateCount: (cardId: string, increment: boolean) => void;
}

export function CardSelection({ card, count, totalCards, onUpdateCount }: CardSelectionProps) {
  const maxCopies = card.type === 'hero' ? 1 : 3;

  return (
    <div
      className={`p-4 border rounded-lg transition-colors ${
        count > 0 ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'
      }`}
    >
      <h3 className="font-medium">{card.name}</h3>
      <p className="text-sm text-gray-600 capitalize">
        {card.type === 'hero' && 'Herói'}
        {card.type === 'unit' && 'Unidade'}
        {card.type === 'terrain' && 'Terreno'}
        {card.type === 'equipment' && 'Equipamento'}
        {card.type === 'spell' && 'Feitiço'}
      </p>
      {card.manaCost !== undefined && (
        <p className="text-sm text-blue-600">Mana: {card.manaCost}</p>
      )}
      {card.attack !== undefined && card.defense !== undefined && (
        <p className="text-sm text-green-600">
          ATQ: {card.attack} / DEF: {card.defense}
        </p>
      )}
      {card.health !== undefined && (
        <p className="text-sm text-red-600">Vida: {card.health}</p>
      )}
      <div className="flex items-center gap-2 mt-2">
        <button
          type="button"
          className="btn btn-secondary px-2 py-1"
          onClick={() => onUpdateCount(card.id, false)}
          disabled={count === 0}
        >
          -
        </button>
        <span className="text-sm font-medium">{count}</span>
        <button
          type="button"
          className="btn btn-secondary px-2 py-1"
          onClick={() => onUpdateCount(card.id, true)}
          disabled={totalCards >= 20 || count >= maxCopies}
        >
          +
        </button>
      </div>
    </div>
  );
}