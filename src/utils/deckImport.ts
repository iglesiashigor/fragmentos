import { Card } from '../types/card';
import { Deck } from '../types/deck';
import { decodeDeckCode } from './deckCode';
import { generateHash } from './hash';
import { useCardStore } from '../store/cardStore';
import { useDeckStore } from '../store/deckStore';

interface ImportResult {
  success: boolean;
  error?: string;
}

export async function handleDeckImport(
  importCode: string,
  userId: string
): Promise<ImportResult> {
  const { addCard } = useCardStore.getState();
  const { addDeck } = useDeckStore.getState();

  try {
    const decodedDeck = decodeDeckCode(importCode);
    if (!decodedDeck) {
      return {
        success: false,
        error: 'Código de baralho inválido',
      };
    }

    // Create new cards for the user
    const newCards = decodedDeck.cards.map(cardData => {
      const card = {
        id: crypto.randomUUID(),
        name: cardData.name,
        type: cardData.type as Card['type'],
        description: cardData.description,
        createdBy: userId,
        hash: generateHash(cardData),
        ...(cardData.attack !== undefined && { attack: cardData.attack }),
        ...(cardData.defense !== undefined && { defense: cardData.defense }),
        ...(cardData.health !== undefined && { health: cardData.health }),
        ...(cardData.manaCost !== undefined && { manaCost: cardData.manaCost }),
      } as Card;

      addCard(card);
      return card;
    });

    const mainDeck = newCards.filter(card => card.type !== 'hero');
    const neutralDeck = newCards.filter(card => card.type === 'hero');

    const newDeck: Deck = {
      id: crypto.randomUUID(),
      code: importCode,
      name: `${decodedDeck.name} (Importado)`,
      cards: newCards,
      mainDeck,
      neutralDeck,
      createdBy: userId,
      hash: generateHash({ name: decodedDeck.name, cards: newCards }),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addDeck(newDeck);
    return { success: true };
  } catch (error) {
    console.error('Erro ao importar baralho:', error);
    return {
      success: false,
      error: 'Erro ao importar baralho. Código inválido ou corrompido.',
    };
  }
}