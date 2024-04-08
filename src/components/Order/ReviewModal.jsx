import Modal from '../Modal';
import Wrapper from '../../assets/wrappers/Order/ReviewWrapper';

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

const ReviewModal = ({ isOpen, setModalClose, setValue, setNextModalOpen }) => {
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
        <h1>review</h1>
        <button className="btn" onClick={handleNextBtnClick}>
          complete
        </button>
      </Wrapper>
    </Modal>
  );
};
export default ReviewModal;
