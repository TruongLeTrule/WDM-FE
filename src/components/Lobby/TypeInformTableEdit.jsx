import { EditBlock, TableInput, TypeTableCancelAndSave } from "./Styled";
import EditLobTypeInformInput from "./components/CreateTypeInformEditInput";
import { TypeInformContext } from "./LobTypeInformation";
import { useContext, useState } from "react";
import { updateLobby, softDeleteLobby } from "../../api/lobby.api";
import { ToastContainer, toast } from 'react-toastify';

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
    try {
      const updateData = {
        name: inputValue.name.trim()
      }
      await updateLobby(editData[3], updateData)
      fetchLobby(value);
      setIsLobTypeInformEditDisplay(false);

    } catch (error) {
      toast.success(error.message)
    }
  }

  const handleDeleteButton = async (value) => {
    try {
      await softDeleteLobby(editData[3])
      fetchLobby(value);
      setIsLobTypeInformEditDisplay(false);
    } catch (error) {
      toast.success(error.message)
    }
  }
  return (
    <EditBlock onClick={(e) => { e.stopPropagation(); console.log(123) }}>
      <TableInput className="TypeInform">
        <h4 className="TypeInform">Edit Lobby Type</h4>
        <EditLobTypeInformInput
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <TypeTableCancelAndSave className="TypeInform">
          <button className="button buttonDelete" onClick={() => handleDeleteButton(([editData[0], editData[2]]))}> Delete </button>
          <button className="button buttonCancel" onClick={handleCancelButton}> Cancel </button>
          <button className="button buttonSave" onClick={() => handleSaveButton([editData[0], editData[2]])}>Save </button>
        </TypeTableCancelAndSave>
      </TableInput>
    </EditBlock>
  )
}

export default TypeInformTableEdit;