import { createRNG } from './core/rng'
import { GameFSM, GameState } from './core/fsm'
import { loadDeck } from './data/decks/load'

const BOARD_SRC = '/assets/gameboard_highres_cleaned.png'
const CARDS_SRC = '/assets/CRPS cards.png'

const canvas = document.getElementById('board') as HTMLCanvasElement
const ctx = canvas.getContext('2d')!
const dpr = Math.max(1, window.devicePixelRatio || 1)
function resize() {
  const { innerWidth:w, innerHeight:h } = window
  canvas.width = Math.floor(w * dpr)
  canvas.height = Math.floor(h * dpr) - Math.floor(56 * dpr)
  canvas.style.width = w + 'px'
  canvas.style.height = (h - 56) + 'px'
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  render()
}
window.addEventListener('resize', resize)

const boardImg = new Image(); boardImg.src = BOARD_SRC
const cardsImg = new Image(); cardsImg.src = CARDS_SRC

const seed = 'seed-demo'
const rng = createRNG(seed)
const state: GameState = { seed, energy:0, mood:0, flare:{ stuckTurns:0, free:true }, turn:1 }

const energyVal = document.getElementById('energyVal')!
const moodVal = document.getElementById('moodVal')!
const flareVal = document.getElementById('flareVal')!
const reduceMotionToggle = document.getElementById('reduceMotion') as HTMLInputElement

reduceMotionToggle.checked = localStorage.getItem('reduceMotion') === '1'
reduceMotionToggle.addEventListener('change', () => {
  localStorage.setItem('reduceMotion', reduceMotionToggle.checked ? '1' : '0')
})

function reduceMotion(): boolean {
  return reduceMotionToggle.checked || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function updateHeader() {
  energyVal.textContent = String(state.energy)
  moodVal.textContent = String(state.mood)
  flareVal.textContent = state.flare.free ? 'free' : `stuck ${state.flare.stuckTurns}/3`
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (boardImg.complete && boardImg.naturalWidth) {
    const scale = Math.min(canvas.width / boardImg.naturalWidth, canvas.height / boardImg.naturalHeight)
    const w = boardImg.naturalWidth * scale
    const h = boardImg.naturalHeight * scale
    const x = (canvas.width - w) / 2
    const y = (canvas.height - h) / 2
    ctx.drawImage(boardImg, x, y, w, h)
    if (!reduceMotion() && !state.flare.free) {
      const t = (Date.now() % 1000) / 1000
      ctx.save(); ctx.globalAlpha = 0.25 + 0.25 * Math.sin(t * Math.PI * 2)
      ctx.fillStyle = '#ff8800'; ctx.fillRect(x, y, w, h); ctx.restore()
    }
  } else {
    ctx.fillStyle = '#1b1f2a'; ctx.fillRect(0,0,canvas.width, canvas.height)
  }
}

const cards = loadDeck().cards

const fsm = new GameFSM(state, rng, { onState: () => { updateHeader(); render() } }, cards)
document.getElementById('drawBtn')!.addEventListener('click', () => fsm.drawCard())
boardImg.onload = () => { resize(); updateHeader(); }