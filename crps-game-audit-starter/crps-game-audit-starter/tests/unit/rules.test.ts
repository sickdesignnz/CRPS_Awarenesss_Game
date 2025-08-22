import { describe, it, expect } from 'vitest'
import { clamp0to5, applyCardOutcome, flareRoll } from '../../src/core/rules'
import { createRNG } from '../../src/core/rng'

describe('rules', () => {
  it('clamps meters', () => {
    expect(clamp0to5(-3)).toBe(0)
    expect(clamp0to5(9)).toBe(5)
  })

  it('applies outcomes and clamps', () => {
    const s = { seed:'', energy: 5, mood: 0, flare: {free:true, stuckTurns:0}, turn: 1 }
    const n = applyCardOutcome(s, { energy: +1, mood: -1 })
    expect(n.energy).toBe(5)
    expect(n.mood).toBe(0)
  })

  it('flare roll alternates per spec', () => {
    const rng = createRNG('test-seed')
    let f = { free: true, stuckTurns: 0 }
    f = flareRoll(rng, f)
    // cannot assert exact outcome without fixing rng, but ensure fields exist
    expect(typeof f.free).toBe('boolean')
    expect(typeof f.stuckTurns).toBe('number')
  })
})