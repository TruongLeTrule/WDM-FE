import { LobbyBlock, LobbyTableStyled } from "../components/Lobby/Styled";
import { Header } from "../components";
import { getLobbyTypes } from "../api/lobby.api";
import { getLobbies } from "../api/lobby.api";
import { useEffect, useState, createContext } from "react";
import LobbyType from "../components/Lobby/LobbyTypeTable";
import LobTypeInformation from "../components/Lobby/LobTypeInformTable";
export const LobbyContext = createContext();
const Lobby = () => {
  const [lobTypeData, setLobTypeData] = useState();
  const [lobTypeInformationData, setLobTypeInformationData] = useState();
  const [pageDisplay, setPageDisplay] = useState({
    previousPage: "",
    currentPage: "",
  });
  const handleBackBtn = (previos) => {
    setPageDisplay({
      previousPage: "",
      currentPage: previos
    })
  }
  const fetchLobType = async () => {
    const res = await getLobbyTypes();
    const data = res.data;
    const tempData = []
    data.map((value) => {
      const subData = []
      subData.push(
        value.id < 10 ? "0" + value.id + "." : value.id + ".",
        value.type_name,
        value.max_table_count + " tables",
        value.min_table_price + "/table",
        value.deposit_percent + "%",
      )
      tempData.push(subData);
    })
    setLobTypeData(tempData);
  }

  useEffect(() => {
    setPageDisplay({
      previousPage: "",
      currentPage: "LobType",
    });
    fetchLobType();
  }, [])
  const shareValue = {
    setLobTypeData,
    fetchLobType,
    setPageDisplay,
    setLobTypeInformationData
  }
  return (
    <LobbyContext.Provider value={shareValue}>
      <LobbyBlock>
        <Header
          headerTitle={"Lobby"}
          handleBackBtn={() => handleBackBtn(pageDisplay.previousPage)}
          isBack={pageDisplay.previousPage}
        />
        <LobbyTableStyled>
          {pageDisplay.currentPage === "LobType" && <LobbyType data={lobTypeData} />}
          {pageDisplay.currentPage === "LobTypeInformation" && <LobTypeInformation data={lobTypeInformationData} />}
        </LobbyTableStyled>
      </LobbyBlock>
    </LobbyContext.Provider>
  )
};
export default Lobby;
