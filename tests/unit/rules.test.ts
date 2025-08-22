import { describe, it, expect } from 'vitest'
import { clamp0to5, applyCardOutcome, flareRoll } from '../../src/core/rules'
import { createRNG } from '../../src/core/rng'
import { GameFSM } from '../../src/core/fsm'
import { loadDeck } from '../../src/data/decks/load'

describe('rules', () => {
  it('clamps meters', () => {
    expect(clamp0to5(-3)).toBe(0)
    expect(clamp0to5(9)).toBe(5)
  })

  it('applies outcomes and clamps', () => {
    const s = { seed:'', energy: 5, mood: 0, flare: {free:true, stuckTurns:0}, turn: 1 } as any
    const n = applyCardOutcome(s, { energy: +1, mood: -1 })
    expect(n.energy).toBe(5)
    expect(n.mood).toBe(0)
  })

  it('flare stuck lasts three turns, then frees on 4th', () => {
    const rng = createRNG('t-seed')
    let f = { free: true, stuckTurns: 0 }
    f = flareRoll(rng, f)
    if (!f.free) {
      expect(f.stuckTurns).toBe(3)
      f = flareRoll(rng, f); expect(f.free).toBe(false); expect(f.stuckTurns).toBe(2)
      f = flareRoll(rng, f); expect(f.free).toBe(false); expect(f.stuckTurns).toBe(1)
      f = flareRoll(rng, f); expect(f.free).toBe(true);  expect(f.stuckTurns).toBe(0)
    }
  })

  it('seeded runs are reproducible for first N draws', () => {
    const N = 5
    const deck = loadDeck().cards
    const seed = 'same-seed'
    const s1 = { seed, energy: 0, mood: 0, flare: {free:true, stuckTurns:0}, turn: 1 } as any
    const s2 = { seed, energy: 0, mood: 0, flare: {free:true, stuckTurns:0}, turn: 1 } as any
    const a = new GameFSM({ ...s1 }, createRNG(seed), {}, deck)
    const b = new GameFSM({ ...s2 }, createRNG(seed), {}, deck)
    const seqA: Array<[number,number]> = []
    const seqB: Array<[number,number]> = []
    for (let i=0;i<N;i++){ a.drawCard(); seqA.push([a['s'].energy, a['s'].mood]) }
    for (let i=0;i<N;i++){ b.drawCard(); seqB.push([b['s'].energy, b['s'].mood]) }
    expect(seqA).toEqual(seqB)
  })
})