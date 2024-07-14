import { ElementError } from '../../errors/index.mjs'
import { GOVUKFrontendComponent } from '../../govuk-frontend-component.mjs'

/**
 * Textarea component
 *
 * @preserve
 */
export class Textarea extends GOVUKFrontendComponent {
  /** @private */
  $module

  /** @private */
  counter

  /** @private */
  textarea

  /**
   * @param {Element | null} $module - HTML element to use for textarea
   */
  constructor($module) {
    super()

    if (!($module instanceof HTMLElement)) {
      throw new ElementError({
        componentName: 'Textarea',
        element: $module,
        identifier: 'Root element (`$module`)'
      })
    }

    this.$module = $module

    const textarea = this.$module.querySelector('textarea')
    const counterElement = this.$module.querySelector(
      '.idsk-textarea--counter span'
    )
    this.textarea = textarea
    this.counter = counterElement

    if (!textarea) {
      throw new ElementError({
        componentName: 'Textarea input',
        element: textarea,
        identifier: 'Textarea input element'
      })
    }

    if (!counterElement) {
      throw new ElementError({
        componentName: 'Textarea counter',
        element: counterElement,
        identifier: 'Textarea length counter'
      })
    }

    this.counter.textContent = this.textarea?.value.length.toString()
    this.textarea.addEventListener('input', (event) => this.handleChange(event))
  }

  /**
   * Input event handler
   *
   * @private
   * @param {Event} event - Input event
   */
  handleChange(event) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.counter.textContent = event.target?.value?.length.toString()
  }

  /**
   * Name for the component used when initialising using data-module attributes.
   */
  static moduleName = 'govuk-textarea'
}
