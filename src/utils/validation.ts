import { z } from 'zod';

const baseCardSchema = {
  name: z
    .string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(50, 'O nome deve ter no máximo 50 caracteres'),
  description: z
    .string()
    .min(10, 'A descrição deve ter pelo menos 10 caracteres')
    .max(200, 'A descrição deve ter no máximo 200 caracteres'),
};

const heroSchema = z.object({
  ...baseCardSchema,
  type: z.literal('hero'),
  attack: z
    .number()
    .min(0, 'O ataque não pode ser negativo')
    .max(7, 'O ataque máximo é 7'),
  defense: z
    .number()
    .min(0, 'A defesa não pode ser negativa')
    .max(7, 'A defesa máxima é 7'),
  health: z
    .number()
    .min(20, 'A vida mínima é 20')
    .max(20, 'A vida máxima é 20')
    .default(20),
});

const unitSchema = z.object({
  ...baseCardSchema,
  type: z.literal('unit'),
  attack: z
    .number()
    .min(0, 'O ataque não pode ser negativo')
    .max(10, 'O ataque máximo é 10'),
  defense: z
    .number()
    .min(0, 'A defesa não pode ser negativa')
    .max(10, 'A defesa máxima é 10'),
  health: z.number().min(1, 'A vida mínima é 1').max(20, 'A vida máxima é 20'),
  manaCost: z
    .number()
    .min(0, 'O custo de mana não pode ser negativo')
    .max(10, 'O custo máximo de mana é 10'),
});

const terrainSchema = z.object({
  ...baseCardSchema,
  type: z.literal('terrain'),
});

const equipmentSchema = z.object({
  ...baseCardSchema,
  type: z.literal('equipment'),
  attack: z
    .number()
    .min(0, 'O bônus de ataque não pode ser negativo')
    .max(10, 'O bônus máximo de ataque é 10')
    .optional(),
  defense: z
    .number()
    .min(0, 'O bônus de defesa não pode ser negativo')
    .max(10, 'O bônus máximo de defesa é 10')
    .optional(),
  manaCost: z
    .number()
    .min(0, 'O custo de mana não pode ser negativo')
    .max(10, 'O custo máximo de mana é 10'),
});

const spellSchema = z.object({
  ...baseCardSchema,
  type: z.literal('spell'),
  manaCost: z
    .number()
    .min(0, 'O custo de mana não pode ser negativo')
    .max(10, 'O custo máximo de mana é 10'),
});

export const cardSchema = z.discriminatedUnion('type', [
  heroSchema,
  unitSchema,
  terrainSchema,
  equipmentSchema,
  spellSchema,
]);

export const deckSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome do baralho deve ter pelo menos 3 caracteres')
    .max(50, 'O nome do baralho deve ter no máximo 50 caracteres'),
});
