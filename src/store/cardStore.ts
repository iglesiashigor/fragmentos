import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Card } from '../types/card';

interface CardState {
  cards: Card[];
  addCard: (card: Card) => void;
  removeCard: (id: string) => void;
  updateCard: (id: string, card: Partial<Card>) => void;
}

export const useCardStore = create<CardState>()(
  persist(
    (set) => ({
      cards: [],
      addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
      removeCard: (id) => set((state) => ({ 
        cards: state.cards.filter((card) => card.id !== id) 
      })),
      updateCard: (id, updatedCard) => set((state) => ({
        cards: state.cards.map((card) => 
          card.id === id ? { ...card, ...updatedCard } : card
        ),
      })),
    }),
    {
      name: 'card-storage',
    }
  )
);