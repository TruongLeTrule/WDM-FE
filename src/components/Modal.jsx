import { useState } from 'react';
import Modal from 'react-modal';

const Modal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    ></Modal>
  );
};
export default Modal;
