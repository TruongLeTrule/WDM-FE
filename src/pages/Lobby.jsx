import { useEffect, useState, createContext } from "react";
import { Header } from "../components";
import { getLobbyTypes, getLobbies } from "../api/lobby.api";
import { LobbyBlock, LobbyTableStyled } from "../components/Lobby/Styled";
import LobbyType from "../components/Lobby/LobbyType";
import LobTypeInformation from "../components/Lobby/LobTypeInformation";

export const LobbyContext = createContext();

const Lobby = () => {
  const [lobTypeData, setLobTypeData] = useState();
  const [lobTypeInformationData, setLobTypeInformationData] = useState();
  const [pageDisplay, setPageDisplay] = useState({
    previousPage: "",
    currentPage: "",
  });

  const handleBackBtn = (previous) => {
    setPageDisplay({
      previousPage: "",
      currentPage: previous
    });
  };

  const fetchLobType = async () => {
    const res = await getLobbyTypes();
    const data = res.data;
    const tempData = [];
    data.map((value) => {
      const subData = [];
      subData.push(
        value.id < 10 ? "0" + value.id + "." : value.id + ".",
        value.type_name,
        value.max_table_count + " tables",
        value.min_table_price + "/table",
        value.deposit_percent + "%"
      );
      tempData.push(subData);
    });
    setLobTypeData(tempData);
  };

  const fetchLobby = async (value) => {
    const id = value[0].replace(".", "").replace("0", "");
    const type = value[1];
    try {
      const res = await getLobbies("", id);
      const data = res.data;
      const tempData = data.map((value) => [
        value.lob_type_id < 10 ? "0" + value.lob_type_id + "." : value.lob_type_id + ".",
        value.name,
        type,
        value.id
      ]);
      setLobTypeInformationData(tempData);
      setPageDisplay({
        previousPage: "LobType",
        currentPage: "LobTypeInformation",
      });
    } catch (error) {
      console.error("Error fetching lob type information:", error);
    }
  }

  useEffect(() => {
    setPageDisplay({
      previousPage: "",
      currentPage: "LobType",
    });
    fetchLobType();
  }, []);

  const shareValue = {
    setLobTypeData,
    fetchLobType,
    fetchLobby,
    setPageDisplay,
    setLobTypeInformationData
  };

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
  );
};

export default Lobby;
