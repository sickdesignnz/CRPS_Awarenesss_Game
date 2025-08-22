import type { GameState } from './fsm'
import type { RNG } from './rng'

export function clamp0to5(n: number): number {
  return Math.max(0, Math.min(5, n))
}

export function applyCardOutcome(s: GameState, delta: { energy: number; mood: number }) {
  return {
    energy: clamp0to5(s.energy + delta.energy),
    mood: clamp0to5(s.mood + delta.mood)
  }
}

// Interpret stuckTurns as "turns remaining" when stuck
export function flareRoll(rng: RNG, flare: { free: boolean; stuckTurns: number }) {
  if (!flare.free) {
    const left = flare.stuckTurns - 1
    return left <= 0 ? { free: true, stuckTurns: 0 } : { free: false, stuckTurns: left }
  }
  const d6 = rng.int(1, 6)
  // 1/3/5 stuck for up to three full turns; 2/4/6 free
  if (d6 % 2 === 1) return { free: false, stuckTurns: 3 }
  return { free: true, stuckTurns: 0 }
}