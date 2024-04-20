import { useEffect, useState } from "react";
import { createRole } from "../../api/privilege.api";
import { PermissionBlock, PermissionForm, PermissionCancelandSave, PermissionInput } from "./Styled";
const Permission = ({ display, setIsDisplayPermissionBlock }) => {
  const [inputValue, setInputValue] = useState();
  const handleCancelButton = () => {
    setIsDisplayPermissionBlock("none");
  }
  const handleSaveButton = async () => {
    await createRole(inputValue, []);
    window.location.reload();
  }
  const handleInput = (e) => {
    setInputValue(e.target.value);
  }
  useEffect(() => {
    setInputValue("")
  }, [])
  return (
    <PermissionBlock display={display}>
      <PermissionForm>
        <h4 className="formTitle">Permissions Of Account Groups</h4>
        <PermissionInput>
          <p className="inputTitle">Role : </p>
          <div className="input">
            <input
              value={inputValue}
              onChange={(e) => { handleInput(e) }}
            ></input>
          </div>
        </PermissionInput>
        <PermissionCancelandSave>
          <button
            className="buttonCancel"
            onClick={handleCancelButton}
          >
            Cancel
          </button>
          <button
            className="buttonSave"
            onClick={handleSaveButton}
          >
            Save
          </button>
        </PermissionCancelandSave>
      </PermissionForm>
    </PermissionBlock>
  )
}

export default Permission;