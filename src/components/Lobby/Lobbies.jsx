import { Fragment, createContext, useContext, useEffect, useState } from "react";
import { WrapTable } from "./Styled";
import TypeInformTable from "./components/CreateTypeInformTable";
import usePagination from "./Hooks/usePagination";
import { LobbyContext } from "../../pages/Lobby";
import PagePagination from "./PagePagination";
import { getLobbies } from '../../api/lobby.api';
import LobbiesAdd from "./LobbiesAdd";

export const TypeInformContext = createContext();

const Lobbies = (p) => {
  const { data, isModalAdd, modalOption, currentLT } = p
  const { fetchLobby } = useContext(LobbyContext);
  const [editData, setEditData] = useState([]);
  const [testData, setTestData] = useState(data)

  const [isLoading, setIsLoading] = useState(true)

  const [lobbyList, setLobbyList] = useState([]);

  const fetchLobbies = async () => {
    try {
      const lobbies = await getLobbies("", currentLT.id);
      setLobbyList(lobbies.data);
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };


  useEffect(() => {
    fetchLobbies();
  }, []);

  useEffect(() => {
    setTestData(data)
  }, [data])
  const pagination = usePagination(testData, 9);
  const shareValue = {
    editData,
    setEditData,
    pagination, 
    fetchLobby,
    lobbyList, setLobbyList
  }
  return (
    <TypeInformContext.Provider value={shareValue}>
      <Fragment>
        <WrapTable>
          <TypeInformTable currentLT={currentLT} lobbyList={lobbyList} isLoading={isLoading} />
          <PagePagination pagination={pagination} />
        </WrapTable>

        {isModalAdd &&
          <LobbiesAdd
            lobTypeID={currentLT.id} 
            lobTypeName={currentLT.name} 
            modalOption={modalOption}
            setLobbyList={setLobbyList}
          />}
          
      </Fragment>
    </TypeInformContext.Provider>
  );
};

export default Lobbies;
