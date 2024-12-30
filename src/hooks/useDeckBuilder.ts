import { useState } from 'react';
import { Card } from '../types/card';
import { validateDeck } from '../utils/deck';

export function useDeckBuilder(initialCards: Record<string, number> = {}) {
  const [selectedCards, setSelectedCards] = useState<Record<string, number>>(initialCards);

  const updateCardCount = (cardId: string, increment: boolean) => {
    setSelectedCards(prev => {
      const currentCount = prev[cardId] || 0;
      const newCount = increment ? currentCount + 1 : currentCount - 1;

      if (newCount < 1) {
        const { [cardId]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [cardId]: newCount };
    });
  };

  const getSelectedCardsList = (cards: Card[]): Card[] => {
    const selectedCardsList: Card[] = [];
    Object.entries(selectedCards).forEach(([cardId, count]) => {
      const card = cards.find(c => c.id === cardId);
      if (card) {
        for (let i = 0; i < count; i++) {
          selectedCardsList.push({ ...card });
        }
      }
    });
    return selectedCardsList;
  };

  const validateSelectedCards = (cards: Card[]) => {
    return validateDeck(getSelectedCardsList(cards));
  };

  return {
    selectedCards,
    updateCardCount,
    getSelectedCardsList,
    validateSelectedCards,
  };
}