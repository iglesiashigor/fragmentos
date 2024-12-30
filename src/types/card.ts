export type CardType = 'hero' | 'unit' | 'terrain' | 'equipment' | 'spell';

interface BaseCard {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  hash: string;
}

export interface Hero extends BaseCard {
  type: 'hero';
  attack: number;
  defense: number;
  health: number;
}

export interface Unit extends BaseCard {
  type: 'unit';
  attack: number;
  defense: number;
  health: number;
  manaCost: number;
}

export interface Terrain extends BaseCard {
  type: 'terrain';
}

export interface Equipment extends BaseCard {
  type: 'equipment';
  attack?: number;
  defense?: number;
  manaCost: number;
}

export interface Spell extends BaseCard {
  type: 'spell';
  manaCost: number;
}

export type Card = Hero | Unit | Terrain | Equipment | Spell;