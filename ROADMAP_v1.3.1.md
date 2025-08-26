# v1.3.1 Sprint Backlog (Target: 1 minor release)

## Scope
Polish early-game UX, complete FLARE cycle, and wire 4 sample cards end-to-end.

## Tasks
1. Player Select (1–4 players) pregame screen
   - Owner: Ravi / Kai
   - Accept: Keyboard+mouse selection, default 1 player, persists to session.
2. FLARE cycle & glow
   - Owner: Amelia
   - Accept: Enter FLARE → stuck; each turn roll `free` die (odd=free, even=stay) max 3 attempts; tile glow active while stuck; turns counter badge.
3. Dice land position
   - Owner: Ravi
   - Accept: On move complete, dice rests to the right of active player token.
4. Wire 4 sample **Support/Event** cards (one per quadrant)
   - Owner: Siena (import) + Amelia (effects) + Kai (card UI)
   - Accept: Draw → flip → apply meter change (+1 to specific meter) → animate to discard pile for that quadrant.
5. Accessibility pass
   - Owner: Leah / Noor
   - Accept: Focus ring visible, screen-reader labels for tiles, ARIA live region for meter changes.
6. Telemetry (minimal)
   - Owner: Dr. Zhi
   - Accept: Events: roll, move, draw, apply_effect; anonymous session id; local dev console logging only.

## Out of Scope
- Pain meter
- Full card set import
- Networked play

## Definition of Done
- All tasks pass acceptance on desktop Chrome.
- CHANGELOG updated to v1.3.1.
