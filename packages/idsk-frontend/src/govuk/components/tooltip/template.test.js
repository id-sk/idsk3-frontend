const { render } = require('@govuk-frontend/helpers/nunjucks')
const { getExamples } = require('@govuk-frontend/lib/components')

describe('Tooltip', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('tooltip')
  })

  describe('default example', () => {
    it('renders the default example with correct structure', () => {
      const $ = render('tooltip', examples.default)

      const $component = $('.govuk-tooltip')
      const $trigger = $component.find('.govuk-tooltip__trigger')
      const $content = $component.find('.govuk-tooltip__content')

      expect($component.get(0).tagName).toBe('div')
      expect($trigger.get(0).tagName).toBe('button')
      expect($content.attr('role')).toBe('tooltip')
      expect($content.text()).toContain(
        'Toto je príklad použitia tooltipu v základnom stave. Text by mal mať dĺžku max. 290 znakov.'
      )
    })
  })

  describe('custom options', () => {
    it('renders with custom ID and accessibility controls', () => {
      const $ = render('tooltip', examples.default)
      const $trigger = $('.govuk-tooltip__trigger')
      const $content = $('.govuk-tooltip__content')

      const id = $content.attr('id')
      // Zmenené z aria-describedby na aria-controls
      expect($trigger.attr('aria-controls')).toBe(id)
    })

    it('renders with custom position attribute', () => {
      const $ = render('tooltip', examples['top-position'])
      const $component = $('.govuk-tooltip')

      expect($component.attr('data-position')).toBe('top')
    })

    it('renders label if provided', () => {
      const $ = render('tooltip', examples.default)
      const $label = $('.govuk-tooltip__label')

      expect($label.text()).toContain('Základné nastavenie tooltipu')
    })

    it('does not render label if not provided', () => {
      const $ = render('tooltip', examples['icon-only'])
      const $label = $('.govuk-tooltip__label')

      // FIX: Použitie toHaveLength namiesto .length.toBe
      expect($label).toHaveLength(0)
    })

    it('renders with custom classes', () => {
      // Pridal som /** @type {any} */ pred zátvorku objektu
      const $ = render(
        'tooltip',
        /** @type {any} */ ({
          id: 'test-id',
          content: 'test',
          classes: 'my-custom-class'
        })
      )

      const $component = $('.govuk-tooltip')
      expect($component.hasClass('my-custom-class')).toBeTruthy()
    })
  })
})
