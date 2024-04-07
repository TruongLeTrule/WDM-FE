import Modal from '../Modal';
import Wrapper from '../../assets/wrappers/Order/GetUserInfoWrapper';

const customStyle = {
  content: {
    width: '70vw',
    height: '87vh',
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

const PickLobby = ({ isOpen, setModalClose, setValue, setNextModalOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      setModalClose={setModalClose}
      customStyle={customStyle}
    >
      <Wrapper>
        <h1>user information</h1>
      </Wrapper>
    </Modal>
  );
};
export default PickLobby;
