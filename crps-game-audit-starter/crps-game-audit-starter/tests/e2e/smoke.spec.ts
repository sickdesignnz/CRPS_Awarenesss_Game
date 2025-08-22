import { test, expect } from '@playwright/test'

test('loads and shows meters', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await expect(page.getByText('CRPS Awareness Game')).toBeVisible()
  await expect(page.getByText('Energy')).toBeVisible()
  await expect(page.getByText('Mood')).toBeVisible()
  await page.getByText('Draw').click()
})