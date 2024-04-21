import { useEffect, useState } from "react";
import { updateLobType } from "../../api/lobby.api";
import {
  TypeTableEditBlock,
  TypeTableInput,
  TypeTableCancelAndSave,
  EditLobbyInput,
  EditLobbyShift
} from "./Styled";
const TypeTableEdit = ({
  setIsLobTypeEditDisplay,
  editData
}) => {
  const [inputValue, setInputValue] = useState({
    type_name: editData[1],
    max_table_count: editData[2].replace(" tables", ""),
    min_table_price: editData[3].replace("/table", ""),
    deposit_percent: editData[4].replace("%", ""),
  });
  const handleCancelButton = () => {
    setIsLobTypeEditDisplay(false);
  }
  const handleInput = (value, name) => {
    setInputValue({ ...inputValue, [name]: value });
  }

  const handleSaveButton = async () => {
    setInputValue({
      ...inputValue,
      max_table_count: parseInt(inputValue.max_table_count),
      min_table_price: parseInt(inputValue.min_table_price),
      deposit_percent: parseInt(inputValue.deposit_percent)
    })
    await updateLobType(editData[0], inputValue);
    setIsLobTypeEditDisplay(false);
    /* window.location.reload(); */
  }
  useEffect(() => {
    setInputValue({
      type_name: editData[1],
      max_table_count: editData[2].replace(" tables", ""),
      min_table_price: editData[3].replace("/table", ""),
      deposit_percent: editData[4].replace("%", ""),
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