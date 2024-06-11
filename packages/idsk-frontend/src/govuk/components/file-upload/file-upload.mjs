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
   * Creates an instance of FileUploader.
   *
   * @param {Element | null} $module - HTML element to be used for error summary.
   */
  constructor($module) {
    super()

    /**
     * Container for file upload.
     *
     * @type {HTMLElement}
     */
    this.uploadContainer = $module.querySelector('.upload-box')

    /**
     * Hidden input for file selection.
     *
     * @type {HTMLInputElement}
     */
    this.fileInput = $module.querySelector('#fileInput')

    /**
     * Button to open the file selection dialog.
     *
     * @type {HTMLButtonElement}
     */
    this.uploadButton = $module.querySelector('.upload-button')

    // Initialize event listeners
    if ($module) {
      this.initEventListeners()
    }
  }

  /**
   * Initializes event listeners for handling drag-and-drop and button file selection.
   */
  initEventListeners() {
    // Clicking the button opens the file selection dialog
    this.uploadButton.addEventListener('click', () => this.fileInput.click())

    // Input change handles selected files
    this.fileInput.addEventListener('change', () =>
      this.handleFiles(this.fileInput.files)
    )

    // Drag-and-drop events
    this.uploadContainer.addEventListener('dragenter', (e) =>
      this.onDragEnter(e)
    )
    this.uploadContainer.addEventListener('dragover', (e) => this.onDragOver(e))
    this.uploadContainer.addEventListener('dragleave', (e) =>
      this.onDragLeave(e)
    )
    this.uploadContainer.addEventListener('drop', (e) => this.onDrop(e))
  }

  /**
   * Handles the dragenter event.
   *
   * @param {DragEvent} event - The dragenter event.
   */
  onDragEnter(event) {
    event.preventDefault()
    event.stopPropagation()
    this.uploadContainer.classList.add('dragover')
  }

  /**
   * Handles the dragover event.
   *
   * @param {DragEvent} event - The dragover event.
   */
  onDragOver(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  /**
   * Handles the dragleave event.
   *
   * @param {DragEvent} event - The dragleave event.
   */
  onDragLeave(event) {
    event.preventDefault()
    event.stopPropagation()
    this.uploadContainer.classList.remove('dragover')
  }

  /**
   * Handles the drop event.
   *
   * @param {DragEvent} event - The drop event.
   */
  onDrop(event) {
    event.preventDefault()
    event.stopPropagation()
    this.uploadContainer.classList.remove('dragover')
    const files = event.dataTransfer.files
    this.handleFiles(files)
  }

  /**
   * Handles the selected or dropped files.
   *
   * @param {FileList} files - The list of files to handle.
   */
  handleFiles(files) {
    if (files.length > 0) {
      alert(`Selected file: ${files[0].name}`)
      // Add your file handling logic here
    }
  }

  /**
   * Name for the component used when initialising using data-module attributes.
   */
  static moduleName = 'govuk-fileUpload'
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
