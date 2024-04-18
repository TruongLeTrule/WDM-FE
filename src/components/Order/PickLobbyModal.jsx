import { lobby } from '../../utils/orderTestData';
import { getLobbies } from '../../api/lobby.api';
import { useOrderContext } from '../../pages/Order';
import Modal from '../Modal';
import Wrapper from '../../assets/wrappers/Order/LobWrapper';
import LobCard from './LobCard';
import { useEffect, useState } from 'react';
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

  const fetchLobby = async () => {
    try {
      const lobbies = await getLobbies(newOrder.lob_type_id);
      setLobbyList(lobbies.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLobby();
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
