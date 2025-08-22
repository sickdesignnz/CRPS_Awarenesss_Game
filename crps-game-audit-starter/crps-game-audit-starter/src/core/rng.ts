import seedrandom from 'seedrandom'

export interface RNG {
  next(): number              // [0,1)
  int(min: number, max: number): number // inclusive
  pick<T>(arr: T[]): T
}

export function createRNG(seed: string): RNG {
  const prng = seedrandom(seed)
  return {
    next: () => prng.quick(),
    int: (min: number, max: number) => {
      const r = prng.quick()
      return Math.floor(r * (max - min + 1)) + min
    },
    pick: (arr) => {
      if (!arr.length) throw new Error('pick() from empty array')
      const i = Math.floor(prng.quick() * arr.length)
      return arr[i]
    }
  }
}