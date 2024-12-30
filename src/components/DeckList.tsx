import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { Deck } from '../types/deck';

interface DeckListProps {
  decks: Deck[];
  onEdit: (deckId: string) => void;
  onDelete: (deckId: string) => void;
}

export function DeckList({ decks, onEdit, onDelete }: DeckListProps) {
  if (decks.length === 0) {
    return <p className="text-gray-600">Nenhum baralho criado ainda</p>;
  }

  return (
    <ul className="space-y-3">
      {decks.map(deck => (
        <li key={deck.id} className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{deck.name}</h3>
              <p className="text-sm text-gray-600">
                {deck.cards.length} cartas
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(deck.id)}
                className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                title="Editar baralho"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(deck.id)}
                className="p-1 text-red-600 hover:text-red-800 transition-colors"
                title="Excluir baralho"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}