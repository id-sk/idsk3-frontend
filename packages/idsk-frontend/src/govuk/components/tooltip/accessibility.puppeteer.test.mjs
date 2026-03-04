import { axe, render } from '@govuk-frontend/helpers/puppeteer'
import { getExamples } from '@govuk-frontend/lib/components'

describe('/components/tooltip', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('tooltip')
  })

  describe('accessibility tests', () => {
    it('passes accessibility tests in default (closed) state', async () => {
      await render(page, 'tooltip', examples.default)
      await expect(axe(page)).resolves.toHaveNoViolations()
    })

    it('passes accessibility tests when open (focused)', async () => {
      await render(page, 'tooltip', examples.default)

      // Simulujeme focus na trigger, aby sa tooltip otvoril
      await page.focus('.govuk-tooltip__trigger')

      // Počkáme chvíľu na animáciu/zobrazenie (JS delay)
      await page.waitForSelector('.govuk-tooltip__content--visible', {
        timeout: 1000
      })

      await expect(axe(page)).resolves.toHaveNoViolations()
    })
  })
})
