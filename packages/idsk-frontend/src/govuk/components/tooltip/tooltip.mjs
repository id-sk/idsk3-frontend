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

    /** @type {boolean} */
    this.isMousedown = false

    /** @type {HTMLElement | null} */
    this.$trigger = /** @type {HTMLElement | null} */ (
      this.$module.querySelector('.govuk-tooltip__trigger')
    )

    /** @type {HTMLElement | null} */
    this.$content = /** @type {HTMLElement | null} */ (
      this.$module.querySelector('.govuk-tooltip__content')
    )

    /** @type {string | null} */
    const position = this.$module.getAttribute('data-position')

    /** @type {string} */
    this.preferredPosition = position ?? 'right'

    if (!this.$trigger || !this.$content) return

    this.init()
  }

  /**
   * Initialise the component
   */
  init() {
    if (this.$trigger) {
      // 1. Zaznamenáme myš
      this.$trigger.addEventListener('mousedown', () => {
        this.isMousedown = true
      })

      // 2. Focus otvorí tooltip (klávesnica áno, myš ignorujeme)
      this.$trigger.addEventListener('focus', () => {
        if (!this.isMousedown) this.show()
      })

      // 3. Blur zavrie a zruší stav myši
      this.$trigger.addEventListener('blur', () => {
        this.isMousedown = false
        this.hide()
      })

      // 4. Bezpečný Click (prepínanie pre myš)
      this.$trigger.addEventListener('click', (e) => {
        e.preventDefault()
        if (this.isMousedown) {
          this.isVisible() ? this.hide() : this.show()
        }
      })

      // 5. Escape klávesa
      this.$trigger.addEventListener('keydown', (e) => {
        const keyboardEvent = /** @type {KeyboardEvent} */ (e)
        if (keyboardEvent.key === 'Escape') {
          this.hide()
        }
      })
    }

    // Zatvorenie pri kliknutí von
    document.addEventListener('click', (e) => {
      const target = /** @type {Node} */ (e.target)
      if (!this.$module.contains(target) && this.isVisible()) {
        this.hide()
      }
    })

    window.addEventListener('resize', () => {
      if (this.isVisible()) this.updatePosition()
    })

    if (this.isVisible()) {
      this.updatePosition()
    }
  }

  /**
   * Show tooltip
   */
  show() {
    if (!this.$content || !this.$trigger) return

    const contentId = this.$content.getAttribute('id')
    if (contentId) {
      this.$trigger.setAttribute('aria-describedby', contentId)
    }
    this.$trigger.setAttribute('aria-expanded', 'true')

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

    this.$trigger.removeAttribute('aria-describedby')
    this.$trigger.setAttribute('aria-expanded', 'false')
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
  /**
   * Update tooltip position and arrow alignment
   *
   * @private
   */
  updatePosition() {
    if (!this.$content || !this.$trigger) return

    this.$module.classList.remove(
      'govuk-tooltip--top',
      'govuk-tooltip--bottom',
      'govuk-tooltip--left',
      'govuk-tooltip--right'
    )
    this.$content.style.transform = ''
    this.$content.style.removeProperty('--arrow-left')
    this.$content.style.removeProperty('--arrow-top')

    const triggerRect = this.$trigger.getBoundingClientRect()
    // Je dôležité zmerať viewport width a height, bez scrollbarov
    const viewportWidth = document.documentElement.clientWidth
    const viewportHeight = window.innerHeight

    let pos = this.preferredPosition

    // Predbežný odhad šírky (ak by bol tooltip otvorený)
    const estimatedContentWidth = Math.min(290, viewportWidth - 32)
    const estimatedContentHeight = this.$content.scrollHeight || 100 // fallback pre výšku

    // Logika pretečenia do strán (PRE RÝCHLY PREKLOP)
    if (
      pos === 'right' &&
      triggerRect.right + estimatedContentWidth + 15 > viewportWidth
    ) {
      pos = 'top'
    }
    if (pos === 'left' && triggerRect.left - estimatedContentWidth - 15 < 0) {
      pos = 'top'
    }

    // Logika pretečenia hore/dole
    if (pos === 'top' && triggerRect.top - estimatedContentHeight - 15 < 0) {
      pos = 'bottom'
    }

    // Ak sa nezmestí ani dole a ani hore, skús ho dať napravo, ak tam aspoň nejaké miesto je
    if (
      pos === 'bottom' &&
      triggerRect.bottom + estimatedContentHeight + 15 > viewportHeight &&
      triggerRect.right + 100 < viewportWidth
    ) {
      pos = 'right'
    }

    this.$module.classList.add(`govuk-tooltip--${pos}`)

    // Teraz zmeraj skutočný obsah, keď už vieme pozíciu
    const finalContentRect = this.$content.getBoundingClientRect()

    // JEMNÉ LADIENIE KOLÍZIÍ (Posun tooltipu po osiach)
    if (pos === 'top' || pos === 'bottom') {
      const safeZone = 16 // Väčší bezpečný okraj od hrany displeja
      const triggerCenter = triggerRect.left + triggerRect.width / 2
      const idealLeft = triggerCenter - finalContentRect.width / 2
      const idealRight = triggerCenter + finalContentRect.width / 2

      let shiftX = 0
      if (idealLeft < safeZone) {
        shiftX = safeZone - idealLeft
      } else if (idealRight > viewportWidth - safeZone) {
        shiftX = viewportWidth - safeZone - idealRight
      }

      if (shiftX !== 0) {
        this.$content.style.transform = `translateX(calc(-50% + ${shiftX}px))`
        // Šípka musí kompenzovať posun, aby stále ukazovala na ikonu
        this.$content.style.setProperty(
          '--arrow-left',
          `calc(50% - ${shiftX}px)`
        )
      }
    }

    if (pos === 'left' || pos === 'right') {
      const safeZone = 16
      const triggerCenterY = triggerRect.top + triggerRect.height / 2
      const idealTop = triggerCenterY - finalContentRect.height / 2
      const idealBottom = triggerCenterY + finalContentRect.height / 2

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
 *
 * @type {string}
 */
Tooltip.moduleName = 'govuk-tooltip'
