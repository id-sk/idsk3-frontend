import { ElementError } from '../../errors/index.mjs'
import { GOVUKFrontendComponent } from '../../govuk-frontend-component.mjs'

/**
 * JavaScript enhancements for the Dropdown component
 *
 * @preserve
 */
export class Dropdown extends GOVUKFrontendComponent {
  /** @private */
  $module

  /** @private */
  button

  /** @private */
  options

  /**
   * Name for the component used when initialising using data-module attributes.
   */
  static moduleName = 'govuk-dropdown'

  /**
   * @param {Element | null} $module - HTML element to use for dropdown
   */
  constructor($module) {
    super()

    if (!($module instanceof HTMLElement)) {
      throw new ElementError({
        componentName: 'Dropdown',
        element: $module,
        identifier: 'Root element (`$module`)'
      })
    }

    this.$module = $module
    const buttonElement = this.$module.querySelector('.idsk-dropdown')
    const optionsElement = this.$module.querySelector('.idsk-dropdown__options')
    this.button = buttonElement
    this.options = optionsElement

    if (!buttonElement) {
      throw new ElementError({
        componentName: 'Dropdown button',
        element: buttonElement,
        identifier: 'Button dropdown trigger'
      })
    }

    if (!optionsElement) {
      throw new ElementError({
        componentName: 'Dropdown options',
        element: optionsElement,
        identifier: 'Dropdown options block'
      })
    }

    this.button.addEventListener('click', (event) => this.handleClick(event))
  }

  /**
   * Trigger a click event
   *
   * @private
   * @param {Event} event - Mouse event
   */
  handleClick(event) {
    const $target = event.target

    if ($target instanceof HTMLElement) {
      event.preventDefault() // prevent the page from scrolling
      this.button
        ?.querySelector('svg')
        ?.classList.toggle('idsk-dropdown__icon--opened')
      this.options?.classList.toggle('idsk-dropdown--opened')
    }
  }
}
