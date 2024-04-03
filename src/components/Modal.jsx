import ReactModal from 'react-modal';

const style = {
  content: {
    width: '50vw',
    height: '50vh',
    left: '50%',
    top: '50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
};

ReactModal.setAppElement('#root');

const Modal = ({ isOpen, setIsOpen, customStyle, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyle ? customStyle : style}
    >
      {children}
    </ReactModal>
  );
};
export default Modal;
