import { test, expect } from '@playwright/test'

// Cambia la URL base si es necesario
test.describe('Flujos de autenticación', () => {
  test('Registro, login y acceso a dashboard', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/register')
    await page.fill('input#fullName', 'Usuario Test')
    const email = `test${Date.now()}@example.com`
    await page.fill('input#email', email)
    await page.fill('input#password', 'Test1234!')
    await page.click('button[type=submit]')
    await expect(page.locator('text=Registro exitoso')).toBeVisible()
    await page.waitForURL('**/auth/login', { timeout: 5000 })

    // Login
    await page.fill('input#email', email)
    await page.fill('input#password', 'Test1234!')
    await page.click('button[type=submit]')
    await page.waitForURL('http://localhost:3000/', { timeout: 5000 })
    // Acceso a dashboard
    await page.goto('http://localhost:3000/dashboard')
    await expect(page.locator('text=Panel Personal')).toBeVisible()
  })
})
