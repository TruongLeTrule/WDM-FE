import { Icon } from "../../../assets/icon";
import { useContext, useEffect, useState } from "react";
import { TypeInformContext } from "../Lobbies.jsx";
import { getLobbies } from '../../../api/lobby.api';
import Wrapper from '../../../assets/wrappers/Order/LobWrapper';
import LobbyCard from '../LobbyCard.jsx';
import Loading from '../../../components/Loading';

const TypeInformTable = (p) => {
  const { lobbyList, isLoading } = p


    
  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="container">
            {lobbyList.map((lobby) => (
              <LobbyCard
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

export default TypeInformTable;



