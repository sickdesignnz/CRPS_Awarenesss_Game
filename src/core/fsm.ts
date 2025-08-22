import type { RNG } from './rng'
import { flareRoll, applyCardOutcome } from './rules'
import { announce } from '../a11y/aria'
import type { Card } from '../data/decks/schema'

export interface GameState { seed:string; energy:number; mood:number; flare:{ free:boolean; stuckTurns:number }; turn:number }
type Hooks = { onState?: () => void }

export class GameFSM {
  private s: GameState; private rng: RNG; private hooks: Hooks; private cards: Card[]
  constructor(s: GameState, rng: RNG, hooks: Hooks = {}, cards: Card[]) { this.s=s; this.rng=rng; this.hooks=hooks; this.cards=cards }
  private emit(){ this.hooks.onState?.() }
  drawCard() {
    const nextFlare = flareRoll(this.rng, this.s.flare); this.s.flare = nextFlare
    if (!nextFlare.free) { announce(`Flare turn ${this.s.flare.stuckTurns} of 3 — still stuck`); this.s.turn += 1; this.emit(); return }
    else { announce('Flare cleared — you are free this turn') }
    const card = this.rng.pick(this.cards); const outcome = card.outcomes
    const next = applyCardOutcome(this.s, outcome); this.s.energy = next.energy; this.s.mood = next.mood
    announce(`Card ${card.id} resolved. Energy ${this.s.energy}, Mood ${this.s.mood}`)
    this.s.turn += 1; this.emit()
  }
}