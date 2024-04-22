import { useEffect, useState } from "react";
import { updateLobType } from "../../api/lobby.api";
import { getLobbyTypes } from "../../api/lobby.api";
import {
  TypeTableEditBlock,
  TypeTableInput,
  TypeTableCancelAndSave,
  EditLobbyInput,
  EditLobbyShift
} from "./Styled";
const TypeTableEdit = ({
  setIsLobTypeEditDisplay,
  editData,
  fetchLobType,
}) => {
  const [inputValue, setInputValue] = useState({
    type_name: editData[1],
    max_table_count: parseInt(editData[2].replace(" tables", "")),
    min_table_price: parseInt(editData[3].replace("/table", "")),
    deposit_percent: parseInt(editData[4].replace("%", "")),
  });
  const [lobUpdateTypeData, setLobUpdateTypeData] = useState();
  const handleCancelButton = () => {
    setIsLobTypeEditDisplay(false);
  }
  const handleInput = (value, name) => {
    if (name === "max_table_count" || name === "min_table_price" || name === "deposit_percent")
      setInputValue({ ...inputValue, [name]: parseInt(value) });
    else
      setInputValue({ ...inputValue, [name]: value });
  }

  const handleSaveButton = async () => {
    console.log(inputValue);
    await updateLobType(editData[0] < 10 ? editData[0].replace("0", "").replace(".", "") : editData[0], inputValue);
    await fetchLobType();
    setIsLobTypeEditDisplay(false);
  }
  useEffect(() => {
    setInputValue({
      type_name: editData[1],
      max_table_count: parseInt(editData[2].replace(" tables", "")),
      min_table_price: parseInt(editData[3].replace("/table", "")),
      deposit_percent: parseInt(editData[4].replace("%", "")),
    })
  }, [editData])
  return (
    <TypeTableEditBlock>
      <TypeTableInput>
        <h4>Edit Lobby Type</h4>
        <EditLobbyInput>
          <div className="typeNameAndPrice">

            <div className="inputElement typeName">
              <h5>Lobby type name</h5>
              <input
                onChange={(e) => handleInput(e.target.value, "type_name")}
                value={inputValue.type_name}
                type="text"
              />
            </div>

            <div className="inputElement minPrice">
              <h5>Min price</h5>
              <input
                onChange={(e) => handleInput(e.target.value, "min_table_price")}
                value={inputValue.min_table_price}
                type="text"
              />
            </div>

          </div>

          <div className="maxTableandDeposit">

            <div className="inputElement maxTable">
              <h5>Max table</h5>
              <input
                onChange={(e) => handleInput(e.target.value, "max_table_count")}
                value={inputValue.max_table_count}
                type="text"
              />
            </div>

            <div className="inputElement requiredDeposit">
              <h5>Required deposit</h5>
              <input
                onChange={(e) => handleInput(e.target.value, "deposit_percent")}
                value={inputValue.deposit_percent}
                type="text"
              />
            </div>

          </div>
        </EditLobbyInput>
        <EditLobbyShift>
          <h5>Shift</h5>
          <div className="checkboxCombination">
            <div className="checkbox">
              <input type="checkbox" />
              <p>Morning</p>
            </div>
            <div className="checkbox">
              <input type="checkbox" />
              <p>Afternoon</p>
            </div>
            <div className="checkbox">
              <input type="checkbox" />
              <p>Evening</p>
            </div>
          </div>
        </EditLobbyShift>
        <TypeTableCancelAndSave>
          <button
            className="button buttonCancel"
            onClick={handleCancelButton}
          >
            Cancel
          </button>
          <button
            className="button buttonSave"
            onClick={handleSaveButton}
          >
            Save
          </button>
        </TypeTableCancelAndSave>
      </TypeTableInput>
    </TypeTableEditBlock>
  )
}

export default TypeTableEdit;