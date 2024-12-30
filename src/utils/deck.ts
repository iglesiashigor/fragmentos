import { Card } from '../types/card';
import { Deck } from '../types/deck';
import { generateHash } from './hash';

export function createDeckFromCards(
  name: string, 
  cards: Card[], 
  userId: string, 
  existingDeck?: Deck
): Deck {
  const mainDeck = cards.filter(card => card.type !== 'hero');
  const neutralDeck = cards.filter(card => card.type === 'hero');

  const deckData = {
    name,
    cards,
    mainDeck,
    neutralDeck,
    createdBy: userId,
    hash: generateHash({ name, cards }),
    updatedAt: new Date(),
  };

  if (existingDeck) {
    return {
      ...existingDeck,
      ...deckData,
    };
  }

  return {
    ...deckData,
    id: crypto.randomUUID(),
    code: '', // Will be generated after deck creation
    createdAt: new Date(),
  };
}

export function validateDeck(cards: Card[]): { 
  isValid: boolean; 
  error?: string;
} {
  const totalCards = cards.length;
  const heroCount = cards.filter(card => card.type === 'hero').length;

  if (totalCards === 0) {
    return { isValid: false, error: 'Você precisa selecionar pelo menos uma carta' };
  }

  if (heroCount === 0) {
    return { isValid: false, error: 'Você precisa incluir um Herói no baralho' };
  }

  if (heroCount > 1) {
    return { isValid: false, error: 'Você só pode ter um Herói no baralho' };
  }

  if (totalCards > 20) {
    return { isValid: false, error: 'Você só pode ter até 20 cartas no seu baralho' };
  }

  return { isValid: true };
}