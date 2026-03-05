import { GOVUKFrontendComponent } from '../../govuk-frontend-component.mjs'

/**
 * Tooltip component
 *
 * @class
 * @augments {GOVUKFrontendComponent}
 */
export class Tooltip extends GOVUKFrontendComponent {
  /**
   * @param {Element} $module - HTML element to use for tooltip
   */
  constructor($module) {
    super()
    /** @type {HTMLElement} */
    this.$module = /** @type {HTMLElement} */ ($module)

    /** @type {HTMLElement | null} */
    this.$trigger = /** @type {HTMLElement | null} */ (
      this.$module.querySelector('.govuk-tooltip__trigger')
    )

    /** @type {HTMLElement | null} */
    this.$content = /** @type {HTMLElement | null} */ (
      this.$module.querySelector('.govuk-tooltip__content')
    )

    this.timer = null
    this.delay = 200

    const position = this.$module.getAttribute('data-position')
    // Linter fix: Use nullish coalescing
    this.preferredPosition = position ?? 'right'

    if (!this.$trigger || !this.$content) return

    this.init()
  }

  /**
   * Initialise the component
   */
  init() {
    if (this.$trigger) {
      this.$trigger.addEventListener('mouseenter', () => this.onMouseEnter())
      this.$trigger.addEventListener('mouseleave', () => this.onMouseLeave())
      this.$trigger.addEventListener('focus', () => this.show())
      this.$trigger.addEventListener('blur', () => this.hide())
      this.$trigger.addEventListener('keydown', (e) =>
        this.onKeyDown(/** @type {KeyboardEvent} */ (e))
      )
      this.$trigger.addEventListener('click', (e) =>
        this.onClick(/** @type {MouseEvent} */ (e))
      )
    }

    document.addEventListener('click', (e) =>
      this.onDocumentClick(/** @type {MouseEvent} */ (e))
    )

    window.addEventListener('resize', () => {
      if (this.isVisible()) this.updatePosition()
    })
    if (this.isVisible()) {
      this.updatePosition()
    }
  }

  /**
   * Handle mouse enter
   *
   * @private
   */
  onMouseEnter() {
    this.timer = setTimeout(() => {
      this.show()
    }, this.delay)
  }

  /**
   * Handle mouse leave
   *
   * @private
   */
  onMouseLeave() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.hide()
  }

  /**
   * Handle click
   *
   * @param {MouseEvent} e - Event
   * @private
   */
  onClick(e) {
    e.preventDefault()
    if (this.isVisible()) {
      this.hide()
    } else {
      this.show()
    }
  }

  /**
   * Handle document click
   *
   * @param {MouseEvent} e - Event
   * @private
   */
  onDocumentClick(e) {
    const target = /** @type {Node} */ (e.target)
    if (!this.$module.contains(target) && this.isVisible()) {
      this.hide()
    }
  }

  /**
   * Handle key down
   *
   * @param {KeyboardEvent} e - Event
   * @private
   */
  onKeyDown(e) {
    if (e.key === 'Escape') {
      this.hide()
      if (this.$trigger) this.$trigger.focus()
    }
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      // @ts-expect-error - click simulation
      this.onClick(e)
    }
  }

  /**
   * Show tooltip
   */
  show() {
    if (!this.$content || !this.$trigger) return

    this.$content.classList.add('govuk-tooltip__content--visible')
    this.$content.setAttribute('aria-hidden', 'false')

    this.updatePosition()
  }

  /**
   * Hide tooltip
   */
  hide() {
    if (!this.$content || !this.$trigger) return

    this.$content.classList.remove('govuk-tooltip__content--visible')
    this.$content.setAttribute('aria-hidden', 'true')
  }

  /**
   * Is visible check
   *
   * @returns {boolean} visibility
   */
  isVisible() {
    if (!this.$content) return false
    return this.$content.classList.contains('govuk-tooltip__content--visible')
  }

  /**
   * Update tooltip position and arrow alignment
   *
   * @private
   */
  updatePosition() {
    if (!this.$content || !this.$trigger) return

    // Zmazané staré stavy, aby sa merali čisté hodnoty
    this.$module.classList.remove(
      'govuk-tooltip--top',
      'govuk-tooltip--bottom',
      'govuk-tooltip--left',
      'govuk-tooltip--right'
    )
    this.$content.style.transform = ''
    this.$content.style.removeProperty('--arrow-left')
    // reset vertikálnej šípky
    this.$content.style.removeProperty('--arrow-top')

    const triggerRect = this.$trigger.getBoundingClientRect()
    const contentRect = this.$content.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    // Výška okna
    const viewportHeight = window.innerHeight

    // Rozhodnutie, či hore, dole alebo vpravo
    let pos = this.preferredPosition
    if (
      pos === 'right' &&
      triggerRect.right + contentRect.width + 15 > viewportWidth
    ) {
      pos = 'top'
    }
    if (pos === 'top' && triggerRect.top - contentRect.height - 15 < 0) {
      pos = 'bottom'
    }

    // Aplikuj triedu
    this.$module.classList.add(`govuk-tooltip--${pos}`)

    // Detekcia kolízií do strán (IBA pre TOP a BOTTOM)
    if (pos === 'top' || pos === 'bottom') {
      const safeZone = 10
      const triggerCenter = triggerRect.left + triggerRect.width / 2
      const idealLeft = triggerCenter - contentRect.width / 2
      const idealRight = triggerCenter + contentRect.width / 2

      let shiftX = 0
      if (idealLeft < safeZone) {
        shiftX = safeZone - idealLeft
      } else if (idealRight > viewportWidth - safeZone) {
        shiftX = viewportWidth - safeZone - idealRight
      }

      if (shiftX !== 0) {
        this.$content.style.transform = `translateX(calc(-50% + ${shiftX}px))`
        this.$content.style.setProperty(
          '--arrow-left',
          `calc(50% - ${shiftX}px)`
        )
      }
    }

    // Detekcia kolízií vertikálne (IBA pre LEFT a RIGHT)
    if (pos === 'left' || pos === 'right') {
      const safeZone = 10
      // Kde by bol stred tooltipu na osi Y
      const triggerCenterY = triggerRect.top + triggerRect.height / 2
      const idealTop = triggerCenterY - contentRect.height / 2
      const idealBottom = triggerCenterY + contentRect.height / 2

      let shiftY = 0
      if (idealTop < safeZone) {
        shiftY = safeZone - idealTop
      } else if (idealBottom > viewportHeight - safeZone) {
        shiftY = viewportHeight - safeZone - idealBottom
      }

      if (shiftY !== 0) {
        this.$content.style.transform = `translateY(calc(-50% + ${shiftY}px))`
        this.$content.style.setProperty(
          '--arrow-top',
          `calc(50% - ${shiftY}px)`
        )
      }
    }
  }
}

/**
 * Name for the component used when initialising using data-module attributes.
 */
Tooltip.moduleName = 'govuk-tooltip'
