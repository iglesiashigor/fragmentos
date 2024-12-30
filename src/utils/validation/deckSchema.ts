import { z } from 'zod';

export const deckSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome do baralho deve ter pelo menos 3 caracteres')
    .max(50, 'O nome do baralho deve ter no máximo 50 caracteres'),
});