import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ ImageURL, tags, onClose }) => {
  useEffect(() => {
    const KeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    // const preventScroll = event => {
    //   event.preventDefault();
    // };

    document.addEventListener('keydown', KeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', KeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const PagesClose = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div className={css.modal} onClick={PagesClose}>
      <div className={css.modalItem}>
        <img src={ImageURL} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  ImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
