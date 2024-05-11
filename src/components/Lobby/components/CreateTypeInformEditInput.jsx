import { useEffect, useState } from "react";
import { EditTypeInformInput } from "../Styled";
import { getLobbyTypes } from "../../../api/lobby.api";

const EditLobTypeInformInput = ({ inputValue, setInputValue }) => {
  const [type, setType] = useState([])
  const handleInput = (value) => {
    setInputValue({ ...inputValue, name: value });
  }
  const handleSelect = (value) => {
    setInputValue({ ...inputValue, type: value })
  }

  const fetchLobType = async () => {
    const res = await getLobbyTypes();
    const data = res.data;
    const subData = [];
    data.map(value => {
      subData.push(value.type_name)
    })
    const tempData = [... new Set(subData)];
    setType(tempData);
  }

  useEffect(() => {
    fetchLobType();
  }, [])

  return (
    <EditTypeInformInput>
      <div className="inputBlock lobbyName">
        <h5>Lobby Name</h5>
        <input value={inputValue.name} onChange={(e) => handleInput(e.target.value)} type="text" />
      </div>
    </EditTypeInformInput>
  )
};

export default EditLobTypeInformInput;
