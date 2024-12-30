import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { Card } from '../types/card';

interface CardListProps {
  title?: string;
  cards: (Card & { uniqueKey?: string })[];
  onEdit?: (card: Card) => void;
  onDelete?: (cardId: string) => void;
  showActions?: boolean;
}

export function CardList({
  title,
  cards,
  onEdit,
  onDelete,
  showActions = true
}: CardListProps) {
  const renderCardDetails = (card: Card) => {
    let details = `${card.type}`;
    if ('attack' in card) details += ` | ATQ: ${card.attack}`;
    if ('defense' in card) details += ` | DEF: ${card.defense}`;
    if ('health' in card) details += ` | HP: ${card.health}`;
    if ('manaCost' in card) details += ` | Mana: ${card.manaCost}`;
    return details;
  };

  if (cards.length === 0) {
    return <p className="text-gray-600">Nenhuma carta criada ainda</p>;
  }

  return (
    <div className="mb-6">
      {title && <h3 className="text-lg font-medium mb-3">{title}</h3>}
      <ul className="space-y-3">
        {cards.map(card => (
          <li key={card.uniqueKey || card.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{card.name}</h3>
                <p className="text-sm text-gray-600">{renderCardDetails(card)}</p>
                <p className="text-sm text-gray-500 mt-1">{card.description}</p>
              </div>
              {showActions && onEdit && onDelete && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(card)}
                    className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                    title="Editar carta"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(card.id)}
                    className="p-1 text-red-600 hover:text-red-800 transition-colors"
                    title="Excluir carta"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}