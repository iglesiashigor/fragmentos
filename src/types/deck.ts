import { Card } from './card';

export interface Deck {
  id: string;
  code: string;  // Código único para compartilhamento
  name: string;
  cards: Card[];
  mainDeck: Card[];
  neutralDeck: Card[];
  createdBy: string;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
}