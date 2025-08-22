import deck from './example.json'
import { DeckSchema } from './schema'
export function loadDeck(){ return DeckSchema.parse(deck) }