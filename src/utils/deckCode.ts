import { Card } from '../types/card';
import { Deck } from '../types/deck';

// Função para comprimir string usando base64url
function compressString(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Função para descomprimir string base64url
function decompressString(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return atob(str);
}

export function generateDeckCode(deck: Deck): string {
  // Cria um objeto simplificado com apenas as informações essenciais
  const codeData = {
    n: deck.name,
    c: deck.cards.map(card => ({
      i: card.id,
      t: card.type,
      n: card.name,
      a: 'attack' in card ? card.attack : undefined,
      d: 'defense' in card ? card.defense : undefined,
      h: 'health' in card ? card.health : undefined,
      m: 'manaCost' in card ? card.manaCost : undefined,
      ds: card.description,
    })),
  };

  // Converte para string e codifica
  const jsonString = JSON.stringify(codeData);
  const compressed = compressString(jsonString);
  
  // Adiciona prefixo para identificar que é um código de deck
  return `DC-${compressed}`;
}

export function decodeDeckCode(code: string): {
  name: string;
  cards: Array<{
    id: string;
    type: string;
    name: string;
    attack?: number;
    defense?: number;
    health?: number;
    manaCost?: number;
    description: string;
  }>;
} | null {
  try {
    if (!code.startsWith('DC-')) return null;
    
    const compressed = code.replace('DC-', '');
    const jsonString = decompressString(compressed);
    const data = JSON.parse(jsonString);
    
    if (!data.n || !Array.isArray(data.c)) {
      return null;
    }
    
    return {
      name: data.n,
      cards: data.c.map(card => ({
        id: crypto.randomUUID(), // Generate new ID for imported cards
        type: card.t,
        name: card.n,
        attack: card.a,
        defense: card.d,
        health: card.h,
        manaCost: card.m,
        description: card.ds,
      })),
    };
  } catch {
    return null;
  }
}