import { test, expect } from '@playwright/test'

test.describe('Authenticated pages', () => {
  test('navigates to account choice after login', async ({ page }) => {
    await page.goto('/choose_account')
    await expect(page.locator('div#app')).toBeVisible()
  })
})
