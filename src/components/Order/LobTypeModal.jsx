import Modal from '../Modal';

const customStyle = {
  content: {
    width: '25vw',
    height: '43vh',
    left: '50%',
    top: '50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
};

const LobTypeModal = ({
  isOpen,
  setModalClose,
  setValue,
  setNextModalOpen,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      setModalClose={setModalClose}
      customStyle={customStyle}
    >
      <h1>Lob type</h1>
    </Modal>
  );
};
export default LobTypeModal;
