import { createRNG } from './core/rng'
import { GameFSM, GameState } from './core/fsm'
import { applyCardOutcome, clamp0to5 } from './core/rules'
import boardUrl from '/public/assets/gameboard_highres_cleaned.png'
import cardsUrl from '/public/assets/CRPS cards.png'

// Basic canvas bootstrap
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

// Load assets
const boardImg = new Image()
boardImg.src = boardUrl
const cardsImg = new Image()
cardsImg.src = cardsUrl

// Game state
const rng = createRNG('seed-demo')
const state: GameState = {
  seed: 'seed-demo',
  energy: 0,
  mood: 0,
  flare: { stuckTurns: 0, free: true },
  turn: 1
}

const energyVal = document.getElementById('energyVal')!
const moodVal = document.getElementById('moodVal')!
const flareVal = document.getElementById('flareVal')!

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
  } else {
    ctx.fillStyle = '#1b1f2a'
    ctx.fillRect(0,0,canvas.width, canvas.height)
  }
}

const fsm = new GameFSM(state, rng, {
  onState: () => {
    updateHeader()
    render()
  }
})

document.getElementById('drawBtn')!.addEventListener('click', () => {
  fsm.drawCard()
})

boardImg.onload = () => { resize(); updateHeader(); }