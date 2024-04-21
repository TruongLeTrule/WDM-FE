import { LobbyBlock, LobbyContent } from "../components/Lobby/Styled";
import { Header } from "../components";
import { getLobbyTypes } from "../api/lobby.api";
import { useEffect, useState } from "react";
import LobbyTypeTable from "../components/Lobby/LobbyTypeTable";

const Lobby = () => {
  const [lobTypeData, setLobTypeData] = useState();
  const fetchLobType = async () => {
    const res = await getLobbyTypes();
    const data = res.data;
    const tempData = []
    data.map((value, index) => {
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
    fetchLobType();
  }, [])
  return (
    <LobbyBlock>
      <Header headerTitle={"Lobby"}></Header>
      <LobbyTypeTable data={lobTypeData}></LobbyTypeTable>
    </LobbyBlock>
  )
};
export default Lobby;
