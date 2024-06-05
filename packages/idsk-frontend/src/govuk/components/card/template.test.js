const { render } = require('@govuk-frontend/helpers/nunjucks')
const { getExamples } = require('@govuk-frontend/lib/components')

describe('card', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('card')
  })

  it('renders attributes correctly', () => {
    const $ = render('card', examples.attributes)

    const $component = $('.govuk-card')
    expect($component.attr('data-test-attribute')).toBe('value')
    expect($component.attr('data-test-attribute-2')).toBe('value-2')
  })

  it('renders classes', () => {
    const $ = render('card', examples.classes)

    const $component = $('.govuk-card')
    expect($component.hasClass('app-card--custom-modifier')).toBeTruthy()
  })

  describe('content', () => {
    it('renders heading', () => {
      const $ = render('card', examples.default)

      const $component = $('.govuk-card')
      const $heading = $component.find('.idsk-card__heading h3')
      expect($heading.text()).toBe('Nadpis kartičky')
    })

    it('renders content', () => {
      const $ = render('card', examples.default)

      const $component = $('.govuk-card')
      const $description = $component.find('.idsk-card__description')
      expect($description.text()).toBe(
        'V tejto časti nájdete všetky podtrebné informácie spojené s používaním a vytvorením občianského preukazu s čipom'
      )
    })

    it('renders date and tags', () => {
      const $ = render('card', examples.default)

      expect($('.idsk-card__date-tags')).toHaveLength(0)
    })
  })
})
