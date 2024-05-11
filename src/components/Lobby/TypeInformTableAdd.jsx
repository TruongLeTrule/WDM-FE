import { EditBlock, TableInput, TypeTableCancelAndSave } from "./Styled";
import EditLobTypeInformInput from "./components/CreateTypeInformEditInput";
import { TypeInformContext } from "./LobTypeInformation";
import { useContext, useState } from "react";
import { updateLobby, softDeleteLobby } from "../../api/lobby.api";
import { ToastContainer, toast } from 'react-toastify';

const TypeInformTableAdd = (p) => {

  const { modalOption } = p
  const {
    editData,
    fetchLobby
  } = useContext(TypeInformContext);
  const [inputValue, setInputValue] = useState({
    name: editData[1],
    type: editData[2]
  });
  const handleCancelButton = () => {
    modalOption.close()
  }

  const handleSaveButton = async (value) => {
    try {
      const updateData = {
        name: inputValue.name.trim()
      }
      await updateLobby(editData[3], updateData)
      fetchLobby(value);
      modalOption.close()

    } catch (error) {
      toast.success(error.message)
    }
  }


  return (
    <EditBlock onClick={(e) => { e.stopPropagation(); console.log(123) }}>
      <TableInput className="TypeInform">
        <h4 className="TypeInform">Add Lobby Type</h4>
        <EditLobTypeInformInput
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <TypeTableCancelAndSave className="TypeInform">
          <button className="button buttonCancel" onClick={handleCancelButton}> Cancel </button>
          <button className="button buttonSave" onClick={() => handleSaveButton([editData[0], editData[2]])}>Save </button>
        </TypeTableCancelAndSave>
      </TableInput>
    </EditBlock>
  )
}

export default TypeInformTableAdd;