import Modal from '../Modal';
import Wrapper from '../../assets/wrappers/Order/LobWrapper';
import { lobby } from '../../utils/orderTestData';
import LobCard from './LobCard';

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

const PickLobby = ({
  isOpen,
  setModalClose,
  setLobValue,
  setShiftValue,
  setNextModalOpen,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      setModalClose={setModalClose}
      customStyle={customStyle}
    >
      <Wrapper>
        <h4>choose lobby</h4>
        <div className="container">
          {lobby.map((lobby) => (
            <LobCard
              lobby={lobby}
              key={lobby.id}
              setLobValue={setLobValue}
              setShiftValue={setShiftValue}
              setNextModalOpen={setNextModalOpen}
            />
          ))}
        </div>
      </Wrapper>
    </Modal>
  );
};
export default PickLobby;
