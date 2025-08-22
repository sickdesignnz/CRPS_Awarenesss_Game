export function announce(message: string) {
  let region = document.getElementById('sr-live-region')
  if (!region) {
    region = document.createElement('div')
    region.id = 'sr-live-region'
    region.className = 'visually-hidden'
    region.setAttribute('role', 'status')
    region.setAttribute('aria-live', 'polite')
    document.body.appendChild(region)
  }
  region.textContent = message
}