const { render } = require('@govuk-frontend/helpers/puppeteer')
const { getExamples } = require('@govuk-frontend/lib/components')

describe('/components/dropdown', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('dropdown')
  })

  describe('/components/dropdown', () => {
    beforeAll(async () => {
      await render(page, 'dropdown', examples)
    })

    it('throws when $module is not set', async () => {
      await expect(
        render(page, 'dropdown', examples.default, {
          beforeInitialisation($module) {
            // Remove the root of the components as a way
            // for the constructor to receive the wrong type for `$module`
            $module.remove()
          }
        })
      ).rejects.toMatchObject({
        cause: {
          name: 'ElementError',
          message: 'Dropdown: Root element (`$module`) not found'
        }
      })
    })
  })
})
