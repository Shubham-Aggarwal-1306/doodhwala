import React, { useRef } from 'react';
import './ModalContainer.css';
import { toast } from 'react-toastify';

const ModalContainer = (props) => {
  const modalRef = useRef(null);

  const handleClose = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target) && !props.lock) {
      props.setOpen(false);
    } else if (props.lock) {
      toast.error('Please complete the process first');
    }
  };

  return (
    <div className={`modal-container ${props.open ? 'show' : ''}`} onClick={handleClose}>
      <div className='modal__close' onClick={handleClose}>&times;</div>
      <div className='modal' ref={modalRef}>
        {props.children}
      </div>
    </div>
  );
};

export default ModalContainer;
