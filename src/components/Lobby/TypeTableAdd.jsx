import { useContext, useEffect, useState } from "react";
import { createLobType } from "../../api/lobby.api";
import { EditBlock, TableInput, TypeTableCancelAndSave } from "./Styled";
import EditLobTypeInput from "./components/CreateTypeEditInput";
import { ToastContainer, toast } from 'react-toastify';
import { LobbyContext } from "../../pages/Lobby";


const TypeTableAdd = (p) => {
  const { modalOption } = p;

  const {
    setLobTypeData,
    lobTypeData,
  } = useContext(LobbyContext);
  
  const [inputValue, setInputValue] = useState({
    type_name: "",
    max_table_count: "",
    min_table_price: "",
    deposit_percent: "",
  });

  const handleCancelButton = () => {
    modalOption.close();
  };

  const handleInput = (value, name) => {
    if (name === "type_name") {
      setInputValue({ ...inputValue, [name]: value.replace(/[^A-Za-z]/g, '') });
    } else if (typeof value === 'string' && /^\d+$/.test(value)) {
      if (name === "max_table_count" || name === "min_table_price" || name === "deposit_percent") {
        setInputValue({ ...inputValue, [name]: parseInt(value) });
      } else {
        setInputValue({ ...inputValue, [name]: value });
      }
    } else if (value === "") {
      setInputValue({ ...inputValue, [name]: value });
    }
  };

  const handleSaveButton = async () => {
    try {
      // console.log(lobTypeData)
      const res = await createLobType(inputValue);

      const newLTID = res.data.id
      const newLTName = res.data.type_name
      const newData = [newLTID, ...Object.values(inputValue)]
      setLobTypeData(prev => [newData, ...prev])
      modalOption.close();
      
      toast.success(`${newLTName} created!`)
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <EditBlock>
      <TableInput className="Type">
        <h4>Add Lobby Type</h4>
        <EditLobTypeInput handleInput={handleInput} inputValue={inputValue} />
        <TypeTableCancelAndSave className="Type">
          <button className="button buttonCancel" onClick={handleCancelButton}> Cancel </button>
          <button className="button buttonSave" onClick={handleSaveButton}>Save </button>
        </TypeTableCancelAndSave>
      </TableInput>
    </EditBlock>
  );
};

export default TypeTableAdd;
