import { useEffect, useState } from 'react';
import { getLobbies } from '../../api/lobby.api';
import { useOrderContext } from '../../pages/Order';
import Modal from '../Modal';
import Wrapper from '../../assets/wrappers/Order/LobWrapper';
import LobCard from './LobCard';
import Loading from '../Loading';

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

const PickLobbyModal = ({ isOpen, setModalClose, setNextModalOpen }) => {
  const { newOrder } = useOrderContext();
  const [lobbyList, setLobbyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLobbies = async () => {
    try {
      const lobbies = await getLobbies(
        newOrder.wedding_date,
        newOrder.lob_type_id
      );
      setLobbyList(lobbies.data);
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchLobbies();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      setModalClose={setModalClose}
      customStyle={customStyle}
    >
      <Wrapper>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <h4>choose lobby</h4>
            <div className="container">
              {lobbyList.map((lobby) => (
                <LobCard
                  Wedding={lobby.Wedding}
                  lobby={lobby}
                  key={lobby.id}
                  setNextModalOpen={setNextModalOpen}
                />
              ))}
            </div>
          </>
        )}
      </Wrapper>
    </Modal>
  );
};
export default PickLobbyModal;
