import { z } from 'zod';
import {
  heroSchema,
  unitSchema,
  terrainSchema,
  equipmentSchema,
  spellSchema,
} from './cardSchemas';
export { deckSchema } from './deckSchema';

export const cardSchema = z.discriminatedUnion('type', [
  heroSchema,
  unitSchema,
  terrainSchema,
  equipmentSchema,
  spellSchema,
]);