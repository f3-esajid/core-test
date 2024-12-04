import { test as setup, expect } from '@playwright/test'
import 'dotenv/config'

const authFile = './e2e/test-results/user.json'
const username = process.env.PLAYWRIGHT_USERNAME as string
const password = process.env.PLAYWRIGHT_PASSWORD as string

setup('authenticate', async ({ page }) => {
  await page.goto('/')
  await page.locator('input[name="username"]').fill(username)
  await page.locator('input[name="password"]').fill(password)
  await page.click('input[name="login"][type="submit"]')
  await page.waitForURL('/') // Wait for the final URL to ensure that the cookies are actually set.
  await page.context().storageState({ path: authFile }) // Save storage state
})
