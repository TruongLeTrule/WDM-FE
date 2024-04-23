import { useEffect, useState } from "react";
import { updateLobType } from "../../api/lobby.api";
import { EditBlock, TableInput, TypeTableCancelAndSave } from "./Styled";
import EditLobTypeInput from "./utils/CreateTypeEditInput";

const TypeTableEdit = ({ setIsLobTypeEditDisplay, editData, fetchLobType }) => {
  const [inputValue, setInputValue] = useState({
    type_name: editData[1],
    max_table_count: parseInt(editData[2].replace(" tables", "")),
    min_table_price: parseInt(editData[3].replace("/table", "")),
    deposit_percent: parseInt(editData[4].replace("%", "")),
  });

  const handleCancelButton = () => {
    setIsLobTypeEditDisplay(false);
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
    await updateLobType(editData[0] < 10 ? editData[0].replace("0", "").replace(".", "") : editData[0], inputValue);
    await fetchLobType();
    setIsLobTypeEditDisplay(false);
  };

  useEffect(() => {
    setInputValue({
      type_name: editData[1],
      max_table_count: parseInt(editData[2].replace(" tables", "")),
      min_table_price: parseInt(editData[3].replace("/table", "")),
      deposit_percent: parseInt(editData[4].replace("%", "")),
    });
  }, [editData]);

  return (
    <EditBlock>
      <TableInput className="Type">
        <h4>Edit Lobby Type</h4>
        <EditLobTypeInput handleInput={handleInput} inputValue={inputValue} />
        <TypeTableCancelAndSave className="Type">
          <button className="button buttonCancel" onClick={handleCancelButton}> Cancel </button>
          <button className="button buttonSave" onClick={handleSaveButton}>Save </button>
        </TypeTableCancelAndSave>
      </TableInput>
    </EditBlock>
  );
};

export default TypeTableEdit;
