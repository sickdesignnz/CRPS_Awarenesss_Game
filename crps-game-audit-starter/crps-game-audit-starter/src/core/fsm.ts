import type { RNG } from './rng'
import { flareRoll, applyCardOutcome, clamp0to5 } from './rules'

export interface GameState {
  seed: string
  energy: number
  mood: number
  flare: { free: boolean; stuckTurns: number }
  turn: number
}

type Hooks = {
  onState?: () => void
}

export class GameFSM {
  private s: GameState
  private rng: RNG
  private hooks: Hooks
  constructor(s: GameState, rng: RNG, hooks: Hooks = {}) {
    this.s = s
    this.rng = rng
    this.hooks = hooks
  }

  private emit() { this.hooks.onState?.() }

  drawCard() {
    // Flare check first
    const flare = flareRoll(this.rng, this.s.flare)
    this.s.flare = flare

    // If stuck, end turn after updating state
    if (!flare.free) {
      this.s.turn += 1
      this.emit()
      return
    }

    // Example demo outcome (replace with deck logic)
    const outcome = this.rng.pick([
      { energy: +1, mood: 0 },
      { energy: 0, mood: +1 },
      { energy: -1, mood: 0 },
      { energy: 0, mood: -1 },
      { energy: +1, mood: +1 }
    ])
    const next = applyCardOutcome(this.s, outcome)
    this.s.energy = next.energy
    this.s.mood = next.mood

    this.s.turn += 1
    this.emit()
  }
}