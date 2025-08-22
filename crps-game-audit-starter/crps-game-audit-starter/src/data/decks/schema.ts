import { z } from 'zod'

export const CardSchema = z.object({
  id: z.string(),
  quadrant: z.enum(['Q1','Q2','Q3','Q4']),
  type: z.enum(['mcq','roleplay']),
  text: z.string(),
  outcomes: z.object({
    energy: z.number().int().min(-2).max(2),
    mood: z.number().int().min(-2).max(2)
  }),
  tags: z.array(z.string()).default([])
})
export type Card = z.infer<typeof CardSchema>

export const DeckSchema = z.object({
  contentVersion: z.string(),
  cards: z.array(CardSchema)
})
export type Deck = z.infer<typeof DeckSchema>