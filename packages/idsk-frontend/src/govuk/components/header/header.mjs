import { getBreakpoint } from '../../common/index.mjs'
import { ElementError } from '../../errors/index.mjs'
import { GOVUKFrontendComponent } from '../../govuk-frontend-component.mjs'

/**
 * Header component
 *
 * @preserve
 */
export class Header extends GOVUKFrontendComponent {
  /** @private */
  $module

  /** @private */
  /** @type {HTMLElement | undefined} */
  $menuButton

  /** @private */
  /** @type {HTMLElement | undefined} */
  $menu

  // /** @private */
  // /** @type {HTMLElement | undefined} */
  // $dropdownToggle

  /** @private */
  /** @type {HTMLElement | undefined} */
  $header

  /** @private */
  /** @type {HTMLDialogElement | undefined} */
  $profileDialog

  /**
   * Save the opened/closed state for the nav in memory so that we can
   * accurately maintain state when the screen is changed from small to big and
   * back to small
   *
   * @private
   */
  menuIsOpen = false

  /**
   * A global const for storing a matchMedia instance which we'll use to detect
   * when a screen size change happens. We rely on it being null if the feature
   * isn't available to initially apply hidden attributes
   *
   * @private
   * @type {MediaQueryList | null}
   */
  mql = null

  /**
   * Apply a matchMedia for desktop which will trigger a state sync if the
   * browser viewport moves between states.
   *
   * @param {Element | null} $module - HTML element to use for header
   */
  constructor($module) {
    super()

    if (!$module) {
      throw new ElementError({
        componentName: 'Header',
        element: $module,
        identifier: 'Root element (`$module`)'
      })
    }

    const dropdownItems = $module.querySelectorAll('.idsk-dropdown__wrapper')
    dropdownItems.forEach((dropdownItem) => new Dropdown(dropdownItem))

    /*
    const langDropdown = $module.querySelector('.idsk-dropdown__wrapper')
    if (langDropdown) {
      new Dropdown(langDropdown) // eslint-disable-line no-new
    }

    const myDropdown = $module.querySelector('.jano')
    if (myDropdown) {
      new Dropdown(myDropdown) // eslint-disable-line no-new
    }

    const myDropdown2 = $module.querySelector('.jano2')
    if (myDropdown2) {
      new Dropdown(myDropdown2) // eslint-disable-line no-new
    }
      */

    this.$module = $module
    const $menuButton = $module.querySelector('.govuk-js-header-toggle')

    const header = document.querySelector('.govuk-header')
    if (header instanceof HTMLElement) {
      this.$header = header
    }

    // Headers don't necessarily have a navigation. When they don't, the menu
    // toggle won't be rendered by our macro (or may be omitted when writing
    // plain HTML)
    if (!$menuButton) {
      return this
    }

    const menuId = $menuButton.getAttribute('aria-controls')
    if (!menuId) {
      throw new ElementError({
        componentName: 'Header',
        identifier:
          'Navigation button (`<button class="govuk-js-header-toggle">`) attribute (`aria-controls`)'
      })
    }

    const websitesNavBody = $module.querySelector(
      '.idsk-secondary-navigation__body'
    )
    const websitesNavBtn = $module.querySelector(
      '.idsk-secondary-navigation__heading-button'
    )

    if (
      websitesNavBody instanceof HTMLElement &&
      websitesNavBtn instanceof HTMLElement
    ) {
      websitesNavBtn.addEventListener('click', (event) => {
        event.preventDefault()
        const menuIsOpen = !(websitesNavBtn.ariaExpanded === 'true')
        const iconClassList =
          websitesNavBtn.querySelector('.material-icons')?.classList
        if (menuIsOpen) {
          websitesNavBody.classList.remove('hidden')
          iconClassList?.add('rotate180')
          websitesNavBtn.ariaExpanded = 'true'
        } else {
          websitesNavBody.classList.add('hidden')
          iconClassList?.remove('rotate180')
          websitesNavBtn.ariaExpanded = 'false'
        }
      })
    }

    const menu = document.querySelector(`#${menuId}`)
    if (menu instanceof HTMLElement) {
      this.$menu = menu
    }
    if ($menuButton instanceof HTMLElement) {
      this.$menuButton = $menuButton
      this.$menuButton.addEventListener('click', () => {
        this.handleMenuButtonClick()
      })
    }

    this.setupResponsiveChecks()

    // // Get dropdown menu and toggle. Then function for show or hide dropdown
    // // TODO: vyhodit a nahradit ComboBoxom
    // const dropdownToggle = $module.querySelector('.dropdown-toggle')
    // if (dropdownToggle instanceof HTMLElement) {
    //   this.$dropdownToggle = dropdownToggle
    //   this.openCloseDropdownMenu()
    // }

    const profileDialog = document.getElementById('navigationProfileDialog')
    if (profileDialog instanceof HTMLDialogElement) {
      this.$profileDialog = profileDialog
    }
    const profileButtons = $module.querySelectorAll(
      '.govuk-header__profile_button'
    )
    const profileCloseButton = $module.querySelector(
      '.govuk-header__profile_close_button'
    )
    profileButtons.forEach((profileButton) => {
      if (profileDialog instanceof HTMLDialogElement && this.$profileDialog) {
        profileButton.addEventListener('click', () => {
          if (profileDialog.open) {
            this.$profileDialog?.close()
          } else {
            this.$profileDialog?.showModal()
          }
        })
      }
    })

    if (profileDialog instanceof HTMLDialogElement && this.$profileDialog) {
      // profileButton?.addEventListener('click', () => {
      //   if (profileDialog.open) {
      //     this.$profileDialog?.close()
      //   } else {
      //     this.$profileDialog?.showModal()
      //   }
      // })
      profileCloseButton?.addEventListener('click', () => profileDialog.close())
      profileDialog.addEventListener('click', (event) => {
        if (event.target === this.$profileDialog) {
          this.$profileDialog.close()
        }
      })
    }

    // document.getElementById("govuk-header__profile")
    /*
    const headerProfileCard = $module.querySelector('.govuk-header__profile')
    if (headerProfileCard instanceof HTMLElement) {
      this.$headerProfileCard = headerProfileCard
    }
    const profileButton = $module.querySelector('.govuk-header__profile_button')
    if (this.$headerProfileCard && profileButton) {
      profileButton.addEventListener(
        'click',
        () => {
          const el = document.getElementById("navigationProfileDialog");
          if (el instanceof HTMLDialogElement) {
            if (el.open) {
              el.close()
            } else {
              el.show()
            }
          }
        },
        true
      )
      // document.addEventListener('click', (event) => {
      //   if (this.mql == null || !this.mql.matches) {
      //     return
      //   }
      //   if (
      //     this.$headerProfileCard &&
      //     event.target instanceof Node &&
      //     !this.$headerProfileCard.contains(event.target) &&
      //     !profileButton.contains(event.target)
      //   ) {
      //     this.$headerProfileCard.classList.add('hidden')
      //   }
      // })
    }
      */
  }

  /**
   * Setup viewport resize check
   *
   * @private
   */
  setupResponsiveChecks() {
    const breakpoint = getBreakpoint('desktop')

    if (!breakpoint.value) {
      throw new ElementError({
        componentName: 'Header',
        identifier: `CSS custom property (\`${breakpoint.property}\`) on pseudo-class \`:root\``
      })
    }

    // Media query list for GOV.UK Frontend desktop breakpoint
    this.mql = window.matchMedia(`(min-width: ${breakpoint.value})`)

    // MediaQueryList.addEventListener isn't supported by Safari < 14 so we need
    // to be able to fall back to the deprecated MediaQueryList.addListener
    if ('addEventListener' in this.mql) {
      this.mql.addEventListener('change', () => this.checkMode())
    } else {
      // @ts-expect-error Property 'addListener' does not exist
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.mql.addListener(() => this.checkMode())
    }

    this.checkMode()
  }

  /**
   * Sync menu state
   *
   * Uses the global variable menuIsOpen to correctly set the accessible and
   * visual states of the menu and the menu button.
   * Additionally will force the menu to be visible and the menu button to be
   * hidden if the matchMedia is triggered to desktop.
   *
   * @private
   */
  checkMode() {
    if (this.mql == null || !this.$header) {
      return
    }

    if (this.mql.matches) {
      // desktop mode
      this.$menu?.removeAttribute('hidden')
      this.$menuButton?.setAttribute('hidden', '')
      this.$header // hide logo
        .querySelector('.govuk-header__link--homepage')
        ?.removeAttribute('hidden')
      this.$header
        .querySelector('.idsk-searchbar__wrapper')
        ?.classList.remove('hide')
    } else {
      // mobile
      // if (this.$profileDialog) {
      //   this.$profileDialog.close()
      // }
      this.$menuButton?.removeAttribute('hidden')
      this.$menuButton?.setAttribute(
        'aria-expanded',
        this.menuIsOpen.toString()
      )

      this.$menu?.removeAttribute('hidden')
      if (this.$menuButton) {
        this.$menuButton.textContent = this.menuIsOpen ? 'Zavrieť' : 'Menu'
        this.createMaterialIcon(
          this.menuIsOpen ? 'close' : 'menu',
          this.$menuButton
        )
      }

      if (this.menuIsOpen) {
        this.$menu?.removeAttribute('hidden')
        // this.$header.style.background = '#fafafa'
        this.$header // show actionPanel
          .querySelector('.govuk-header__actionPanel.mobile')
          ?.classList.remove('mobile-hidden')
        this.$header // hide hide logo
          .querySelector('.govuk-header__link--homepage')
          ?.setAttribute('hidden', '')
        console.log(this.$header.querySelector('.idsk-searchbar__wrapper'))
        this.$header
          .querySelector('.idsk-searchbar__wrapper')
          ?.classList.remove('hide')
      } else {
        this.$menu?.setAttribute('hidden', '')
        // this.$header.style.background = '#fff'
        this.$header // hide action panel
          .querySelector('.govuk-header__actionPanel.mobile')
          ?.classList.add('mobile-hidden')
        this.$header // show logo
          .querySelector('.govuk-header__link--homepage')
          ?.removeAttribute('hidden')
        this.$header
          .querySelector('.idsk-searchbar__wrapper')
          ?.classList.add('hide')
      }
    }
  }

  /**
   * Handle menu button click
   *
   * When the menu button is clicked, change the visibility of the menu and then
   * sync the accessibility state and menu button state
   *
   * @private
   */
  handleMenuButtonClick() {
    this.menuIsOpen = !this.menuIsOpen
    this.checkMode()
  }

  // /**
  //  * Toggle dropdown menu
  //  */
  // openCloseDropdownMenu() {
  //   if (!this.$dropdownToggle) {
  //     return
  //   }

  //   this.$dropdownToggle.addEventListener('click', (event) => {
  //     if (this.$dropdownToggle) {
  //       event.preventDefault()
  //       this.$dropdownToggle.classList.toggle('open')
  //     }
  //   })

  //   this.clickOutsideClose(this.$dropdownToggle, 'open')
  // }

  /**
   * Create and add material icon to parent element
   *
   * @param {string} iconName - icon name for create
   * @param {HTMLElement} parentElem - element to which the icon will be added
   */
  createMaterialIcon(iconName, parentElem) {
    const spanIcon = document.createElement('span')
    spanIcon.className = 'material-icons'
    spanIcon.ariaHidden = 'true'
    spanIcon.textContent = iconName.toString()
    spanIcon.ariaHidden = 'true'
    parentElem.appendChild(spanIcon)
  }

  /**
   * Function for click outside and close some elem
   *
   * @param {HTMLElement} openedElem - element which need to remove open className
   * @param {string} className - name of className to remove and close some opened element
   */
  clickOutsideClose(openedElem, className) {
    document.addEventListener('click', (event) => {
      if (event.target instanceof Node && !openedElem.contains(event.target)) {
        openedElem.classList.remove(className.toString())
      }
    })
  }

  /**
   * Name for the component used when initialising using data-module attributes.
   */
  static moduleName = 'govuk-header'
}

/**
 * JavaScript enhancements for the Dropdown component
 *
 * @preserve
 */
class Dropdown {
  /** @private */
  $module

  /** @private */
  button

  /** @private */
  options

  /** @private */
  isOpen = false

  /**
   * @param {Element | null} $module - HTML element to use for dropdown
   */
  constructor($module) {
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

    this.button?.addEventListener('click', (event) => this.handleClick(event))
    document.addEventListener('click', (event) => {
      if (
        event.target instanceof Node &&
        !this.$module.contains(event.target) &&
        this.isOpen
      ) {
        this.handleClick(event)
      }
    })
  }

  /**
   * Trigger a click event
   *
   * @param {Event} event - click event
   * @private
   */
  handleClick(event) {
    if (!this.button) {
      return
    }

    event.preventDefault()

    this.isOpen = !this.isOpen
    const label = this.$module.dataset.pseudolabel ?? ''

    if (this.isOpen) {
      this.$module.classList.add('open')
      this.button
        .querySelector('svg')
        ?.classList.add('idsk-dropdown__icon--opened')
      this.button.ariaLabel = `Zavrieť ${label}`
      this.options?.classList.add('idsk-dropdown--opened')
      // this.$module.querySelector('.material-icons')?.classList.add('rotate180')
    } else {
      this.$module.classList.remove('open')
      this.button
        .querySelector('svg')
        ?.classList.remove('idsk-dropdown__icon--opened')
      this.button.ariaLabel = `Rozbaliť ${label}`
      this.options?.classList.remove('idsk-dropdown--opened')
    }

    this.button.ariaExpanded = this.isOpen.toString()
  }
}
