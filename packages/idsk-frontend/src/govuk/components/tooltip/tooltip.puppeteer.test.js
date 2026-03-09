/* global page */

const { render } = require('@govuk-frontend/helpers/puppeteer')
const { getExamples } = require('@govuk-frontend/lib/components')

describe('/components/tooltip', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('tooltip')
  })

  describe('Mouse interaction', () => {
    beforeEach(async () => {
      await render(page, 'tooltip', examples.default)
    })

    it('does NOT open on hover anymore (accessibility update)', async () => {
      await page.hover('.govuk-tooltip__trigger')

      // Chvíľu počkáme, aby sme si boli istí, že sa nezobrazí
      await new Promise((resolve) => setTimeout(resolve, 300))

      const isVisible = await page.$eval('.govuk-tooltip__content', (el) =>
        el.classList.contains('govuk-tooltip__content--visible')
      )
      expect(isVisible).toBe(false)
    })
  })

  describe('Keyboard interaction', () => {
    beforeEach(async () => {
      await render(page, 'tooltip', examples.default)
    })

    it('opens immediately on focus', async () => {
      await page.keyboard.press('Tab')

      const isVisible = await page.$eval('.govuk-tooltip__content', (el) =>
        el.classList.contains('govuk-tooltip__content--visible')
      )
      expect(isVisible).toBe(true)
    })

    it('closes on Escape key', async () => {
      await page.keyboard.press('Tab')
      await page.keyboard.press('Escape')

      const isVisible = await page.$eval('.govuk-tooltip__content', (el) =>
        el.classList.contains('govuk-tooltip__content--visible')
      )
      expect(isVisible).toBe(false)
    })

    it('returns focus to trigger after Escape', async () => {
      await page.keyboard.press('Tab')
      await page.keyboard.press('Escape')

      const isTriggerFocused = await page.$eval(
        '.govuk-tooltip__trigger',
        (el) => el === document.activeElement
      )
      expect(isTriggerFocused).toBe(true)
    })
  })

  describe('Click interaction', () => {
    beforeEach(async () => {
      await render(page, 'tooltip', examples.default)
    })

    it('toggles on click', async () => {
      await page.click('.govuk-tooltip__trigger')

      let isVisible = await page.$eval('.govuk-tooltip__content', (el) =>
        el.classList.contains('govuk-tooltip__content--visible')
      )
      expect(isVisible).toBe(true)

      await page.click('.govuk-tooltip__trigger')

      isVisible = await page.$eval('.govuk-tooltip__content', (el) =>
        el.classList.contains('govuk-tooltip__content--visible')
      )
      expect(isVisible).toBe(false)
    })

    it('closes when clicking outside', async () => {
      await page.click('.govuk-tooltip__trigger')

      await page.mouse.click(0, 0)

      const isVisible = await page.$eval('.govuk-tooltip__content', (el) =>
        el.classList.contains('govuk-tooltip__content--visible')
      )
      expect(isVisible).toBe(false)
    })
  })
})
