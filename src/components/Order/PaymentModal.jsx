import Modal from '../Modal';
import Wrapper from '../../assets/wrappers/Order/PaymentWrapper';

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

const PaymentModal = ({
  isOpen,
  setModalClose,
  setValue,
  setNextModalOpen,
}) => {
  const handleNextBtnClick = () => {
    setNextModalOpen();
  };

  return (
    <Modal
      isOpen={isOpen}
      setModalClose={setModalClose}
      customStyle={customStyle}
    >
      <Wrapper>
        <h1>payment</h1>
        <button className="btn" onClick={handleNextBtnClick}>
          next: review
        </button>
      </Wrapper>
    </Modal>
  );
};
export default PaymentModal;
