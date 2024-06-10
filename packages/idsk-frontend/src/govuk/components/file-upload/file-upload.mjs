import { GOVUKFrontendComponent } from '../../govuk-frontend-component.mjs'

/**
 * File upload component
 *
 * Allow user to drag and drop file to upload
 */
export class FileUpload extends GOVUKFrontendComponent {
  /** @private */
  $module

  /**
   * @private
   * @type {FileUploadConfig}
   */

  /**
   * @param {Element | null} $module - HTML element to use for error summary
   */
  constructor($module) {
    super();
    this.$module = $module
  }
}

/**
 * File upload config
 *
 * @typedef {object} FileUploadConfig
 * @property {boolean} [disableAutoFocus=false] - If set to `true` the error
 *   summary will not be focussed when the page loads.
 */

/**
 * @typedef {import('../../common/index.mjs').Schema} Schema
 */

