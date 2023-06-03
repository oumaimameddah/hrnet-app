import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useRef } from 'react'
import {
  useClickOutside,
  useKeypress,
  useTrapFocus
} from './hooks/use.utilitises'

import './styles.module.css'

function ReactModal(
  {
    id,
    modalContent,
    isModalOpened,
    onClose,
    modalClassName = "react-modal",
    modalBackgroundClassName = "react-modal-background",
    addCloseButton = true,
    closeButtonClassName = "close-react-modal",
    closeButtonText = "Close",
    ...props
  }) {
  const ref = useRef();
  useClickOutside(ref, isModalOpened, () => onClose(false));
  useKeypress("Escape", isModalOpened, () => onClose(false));
  useTrapFocus(ref, isModalOpened);

  const handleOnClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {isModalOpened && (
        <>
          <div id={id + "-modal-background"} className={modalBackgroundClassName}></div>
          <div id={id + "-modal"} ref={ref} className={modalClassName} {...props} role={"dialog"} aria-modal="true">
            {modalContent}
            {addCloseButton && (
              <button id={id + "-modal-button"} className={closeButtonClassName} type="button" onClick={handleOnClose} aria-label="Close Modal">
                {closeButtonText}
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}

ReactModal.propTypes = {
  /** The id of the modal. */
  id: PropTypes.string.isRequired,

  /** The content of the modal. */
  modalContent: PropTypes.node.isRequired,

  /** A boolean that determines whether or not the modal is open. */
  isModalOpened: PropTypes.bool.isRequired,

  /** A function that is called when the modal is closed. */
  onClose: PropTypes.func.isRequired,

  /** The class name of the modal. */
  modalClassName: PropTypes.string,

  /** The class name of the modal background. */
  modalBackgroundClassName: PropTypes.string,

  /** Determines whether or not to add a close button to the modal. */
  addCloseButton: PropTypes.bool,

  /** The class name of the close button. */
  closeButtonClassName: PropTypes.string,

  /** The text of the close button. */
  closeButtonText: PropTypes.node
}

export default ReactModal;
