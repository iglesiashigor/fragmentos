import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Deck } from '../types/deck';

interface DeckState {
  decks: Deck[];
  addDeck: (deck: Deck) => void;
  removeDeck: (id: string) => void;
  updateDeck: (id: string, deck: Partial<Deck>) => void;
}

export const useDeckStore = create<DeckState>()(
  persist(
    (set) => ({
      decks: [],
      addDeck: (deck) => set((state) => {
        const newDecks = [...state.decks, deck];
        return { decks: newDecks };
      }),
      removeDeck: (id) => set((state) => ({ 
        decks: state.decks.filter((deck) => deck.id !== id) 
      })),
      updateDeck: (id, updatedDeck) => set((state) => ({
        decks: state.decks.map((deck) => 
          deck.id === id ? { ...deck, ...updatedDeck } : deck
        ),
      })),
    }),
    {
      name: 'deck-storage',
    }
  )
);