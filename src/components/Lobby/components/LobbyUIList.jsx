import { useContext } from "react";

import Wrapper from '../../../assets/wrappers/Order/LobWrapper.js';
import LobbyCard from '../LobbyCard.jsx';
import Loading from '../../Loading.jsx';
import { LobbyContext } from "../../../pages/Lobby.jsx";

const LobbyUIList = () => {

  const { isLoading, lobbyList } = useContext(LobbyContext);

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="container">
            {lobbyList.map((lobby) => (
              <LobbyCard
                onClick={() => {console.log(lobby)}}
                lobby={lobby}
                key={lobby.id}
              />
            ))}
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default LobbyUIList;



