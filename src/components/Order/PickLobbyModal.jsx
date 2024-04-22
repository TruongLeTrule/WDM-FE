import { useEffect, useState } from 'react';
import { getLobbies } from '../../api/lobby.api';
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

const PickLobbyModal = ({
  isOpen,
  setModalClose,
  setNextModalOpen,
  setLobbyInfo,
  editLobby,
  wedding_date,
  lob_type_id,
}) => {
  const [lobbyList, setLobbyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLobbies = async () => {
    try {
      const lobbies = await getLobbies(wedding_date, lob_type_id);
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
                  lobby={lobby}
                  key={lobby.id}
                  setLobbyInfo={setLobbyInfo}
                  setNextModalOpen={setNextModalOpen}
                  setPickLobbyModalClose={setModalClose}
                  editLobby={editLobby}
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
