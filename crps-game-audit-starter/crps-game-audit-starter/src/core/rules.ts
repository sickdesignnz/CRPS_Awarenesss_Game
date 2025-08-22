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

export function flareRoll(rng: RNG, flare: { free: boolean; stuckTurns: number }) {
  // 1/3/5 = stuck, 2/4/6 = free. Max three stuck turns; 4th auto-release.
  if (!flare.free) {
    const stuckTurns = Math.min(3, flare.stuckTurns + 1)
    if (stuckTurns >= 3) {
      return { free: true, stuckTurns: 0 }
    }
    return { free: false, stuckTurns }
  }

  const d6 = rng.int(1, 6)
  const free = (d6 % 2 === 0)
  return { free, stuckTurns: free ? 0 : 1 }
}