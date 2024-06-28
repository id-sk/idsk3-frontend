const { render } = require('@govuk-frontend/helpers/nunjucks')
const { getExamples } = require('@govuk-frontend/lib/components')

describe('dropdown', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('dropdown')
  })

  it('renders attributes correctly', () => {
    const $ = render('dropdown', examples.attributes)

    const $component = $('.govuk-dropdown')
    expect($component.attr('data-test-attribute')).toBe('value')
    expect($component.attr('data-test-attribute-2')).toBe('value-2')
  })

  it('renders classes', () => {
    const $ = render('dropdown', examples.classes)

    const $component = $('.govuk-dropdown')
    expect($component.hasClass('app-dropdown--custom-modifier')).toBeTruthy()
  })

  describe('content', () => {
    it('renders selected', () => {
      const $ = render('dropdown', examples.default)

      const $component = $('.govuk-dropdown')
      const $heading = $component.find('.idsk-dropdown span')
      expect($heading.text()).toBe('slovenčina')
    })

    it('renders items', () => {
      const $ = render('dropdown', examples.default)

      const $component = $('.govuk-dropdown')
      const $item = $component.find('.idsk-dropdown__option')
      expect($item.text()).toBe('slovenčina')
    })
  })
})
