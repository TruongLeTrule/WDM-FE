import { useEffect, useState, createContext } from "react";
import { Header } from "../components";
import { getLobbyTypes, getLobbies } from "../api/lobby.api";
import { LobbyBlock, LobbyTableStyled } from "../components/Lobby/Styled";
import LobbyTypeContent from "../components/Lobby/LobbyTypeContent";
import { ToastContainer } from "react-toastify";

export const LobbyTypeContext = createContext();

const LobType = () => {
  const [lobTypeData, setLobTypeData] = useState();
  const [lobTypeInformationData, setLobTypeInformationData] = useState();

  const [isModalAddLT, setModalAddLT] = useState(false)
  const [currentLT, setCurrentLT] = useState({})

  // const handleBackBtn = () => {
  //   // setPageDisplay({
  //   //   previousPage: "",
  //   //   currentPage: previous
  //   // });
  // };

  const fetchLobType = async () => {
    const res = await getLobbyTypes();
    const data = res.data;
    setLobTypeData(data);
  };

  const fetchLobby = async (value) => {
    const lobTypeId = value[0];
    const type = value[1];
    try {
      const res = await getLobbies("", lobTypeId);
      const lobbies = res.data;
      const tempData = lobbies.map((value) => [
        value.lob_type_id,
        value.name,
        type,
        value.id
      ]);
      setLobTypeInformationData(tempData);
    } catch (error) {
      console.error("Error fetching lob type information:", error);
    }
  }

  useEffect(() => {
    fetchLobType();
  }, []);

  const shareValue = {
    lobTypeData,
    setLobTypeData,
    fetchLobType,
    fetchLobby,
    // setPageDisplay,
    lobTypeInformationData, setLobTypeInformationData,
    currentLT, setCurrentLT
  };

  const handleAddBtnClick = () => {
    // pageDisplay.currentPage == "LobType" 
    LTmodalOption.open()
    // : modalOption.open()
  }

  const LTmodalOption = { // lobby type modal 
    open: () => {
      setModalAddLT(true)
    },
    close: () => {
      setModalAddLT(false)
    }
  }

  return (
    <LobbyTypeContext.Provider value={shareValue}>
      <LobbyBlock>
        <Header
          headerTitle={"Lobby"}
          // handleBackBtn={() => handleBackBtn()}
          // isBack={pageDisplay.previousPage}
          handleAddBtnClick={handleAddBtnClick}
        />
        <LobbyTableStyled>
          <ToastContainer />
          <LobbyTypeContent data={lobTypeData} isModalAddLT={isModalAddLT} LTmodalOption={LTmodalOption}/>

        </LobbyTableStyled>
      </LobbyBlock>
    </LobbyTypeContext.Provider>
  );
};



export default LobType;
