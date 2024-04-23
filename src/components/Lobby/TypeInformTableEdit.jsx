import { EditBlock, TableInput, TypeTableCancelAndSave } from "./Styled";
import EditLobTypeInformInput from "./utils/CreateTypeInformEditInput";
import { TypeInformContext } from "./LobTypeInformation";
import { useContext, useState } from "react";
import { updateLobby } from "../../api/lobby.api";

const TypeInformTableEdit = () => {
  const {
    editData,
    setIsLobTypeInformEditDisplay,
    fetchLobby
  } = useContext(TypeInformContext);
  const [inputValue, setInputValue] = useState({
    name: editData[1],
    type: editData[2]
  });
  const handleCancelButton = () => {
    setIsLobTypeInformEditDisplay(false);
  }

  const handleSaveButton = async (value) => {
    const updateData = {
      name: inputValue.name.trim(),
      lob_type_id: editData[0].replace("0", "").replace(".", "")
    }
    await updateLobby(editData[3], updateData)
    fetchLobby(value);
    setIsLobTypeInformEditDisplay(false);
  }
  return (
    <EditBlock>
      <TableInput className="TypeInform">
        <h4 className="TypeInform">Edit Lobby Type</h4>
        <EditLobTypeInformInput
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <TypeTableCancelAndSave className="TypeInform">
          <button className="button buttonCancel" onClick={handleCancelButton}> Cancel </button>
          <button className="button buttonSave" onClick={() => handleSaveButton([editData[0].replace(".", "").replace("0", ""), editData[2]])}>Save </button>
        </TypeTableCancelAndSave>
      </TableInput>
    </EditBlock>
  )
}

export default TypeInformTableEdit;