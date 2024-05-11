import { useEffect, useState, createContext } from "react";
import { Header } from "../components";
import { getLobbyTypes, getLobbies } from "../api/lobby.api";
import { LobbyBlock, LobbyTableStyled } from "../components/Lobby/Styled";
import LobbyType from "../components/Lobby/LobbyType";
import LobTypeInformation from "../components/Lobby/LobTypeInformation";
import styled from "styled-components";

import { Modal, Button, Input, Upload, Select } from "antd";
import { ToastContainer } from "react-toastify";

export const LobbyContext = createContext();

const Lobby = () => {
  const [lobTypeData, setLobTypeData] = useState();
  const [lobTypeInformationData, setLobTypeInformationData] = useState();
  const [pageDisplay, setPageDisplay] = useState({
    previousPage: "",
    currentPage: "",
  });
  const [isModalAddLT, setModalAddLT] = useState(false)
  const [isModalAdd, setModalAdd] = useState(false)

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
        value.id,
        value.type_name,
        value.max_table_count,
        value.min_table_price,
        value.deposit_percent 
      );
      tempData.push(subData);
    });
    setLobTypeData(tempData);
  };

  const fetchLobby = async (value) => {
    const id = value[0];
    const type = value[1];
    try {
      const res = await getLobbies("", id);
      const data = res.data;
      const tempData = data.map((value) => [
        value.lob_type_id,
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
    lobTypeData,
    setLobTypeData,
    fetchLobType,
    fetchLobby,
    setPageDisplay,
    setLobTypeInformationData
  };

  const handleAddBtnClick = () => {
    pageDisplay.currentPage == "LobType" 
    ? LTmodalOption.open()
    : modalOption.open()
  }

  const LTmodalOption = { // lobby type modal 
    open: () => {
      setModalAddLT(true)
    },
    close: () => {
      setModalAddLT(false)
    }
  }
  const modalOption = { // lobby type modal 
    open: () => {
      setModalAdd(true)
    },
    close: () => {
      setModalAdd(false)
    }
  }

  return (
    <LobbyContext.Provider value={shareValue}>
      <LobbyBlock>
        <Header
          headerTitle={"Lobby"}
          handleBackBtn={() => handleBackBtn(pageDisplay.previousPage)}
          isBack={pageDisplay.previousPage}
          handleAddBtnClick={handleAddBtnClick}
        />
        <LobbyTableStyled>
          <ToastContainer />
          {pageDisplay.currentPage === "LobType" && <LobbyType data={lobTypeData} isModalAddLT={isModalAddLT} LTmodalOption={LTmodalOption}/>}
          {pageDisplay.currentPage === "LobTypeInformation" && <LobTypeInformation data={lobTypeInformationData} isModalAdd={isModalAdd} modalOption={modalOption} />}
        </LobbyTableStyled>
      </LobbyBlock>
    </LobbyContext.Provider>
  );
};



export default Lobby;
