import { useEffect, useState } from "react";
import { InformationBlock, InformationBoard, SaveButton } from "./Styled";
import { updateUserDisplayName } from "../../api/user.api";
import { register } from "../../api/auth.api";
import { updateRoleforUser } from "../../api/privilege.api";
import { findUserByUserName } from "../../api/user.api";

const Information = ({
  display,
  setIsDisplayInformationBlock,
  type,
  editrow,
  accountInformation,
  accountInformationInput,
  getRoleIdByName
}) => {
  const [inputValue, setInputValue] = useState(accountInformationInput);
  const [tempData, setTempData] = useState({
    ID: "",
    DisplayName: "",
    UserName: "",
    Password: "",
    Permission: accountInformationInput.Permission,
  });

  const [selectValue, setSelectValue] = useState(inputValue.Permission);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isModified, setIsModified] = useState(false);

  const updateTempData = (name, data) => {
    setTempData(prevData => ({ ...prevData, [name]: data }));
  };

  const updateInput = (value) => {
    setInputValue(value);
    setIsModified(true)
  };

  const handleSaveButton = () => {
    type === "Edit" ? handleEditSave() : handleCreateSave();
  };

  const handleEditSave = async () => {
    setIsDisplayInformationBlock(false);
    const newData = [...accountInformation];
    newData[editrow] = Object.values(tempData).map((value, index) => value === '' ? newData[editrow][index] : value);
    await updateRoleforUser(getRoleIdByName(newData[editrow][4]), newData[editrow][0])
    await updateUserDisplayName(newData[editrow][0], newData[editrow][1]);
    window.location.reload();
  };

  const handleCreateSave = async () => {
    setIsDisplayInformationBlock(false);
    await register(Object.values(tempData)[2], Object.values(tempData)[3], Object.values(tempData)[1]);
    const res = await findUserByUserName(Object.values(tempData)[2]);
    await updateRoleforUser(getRoleIdByName(Object.values(tempData)[4]), res.data.id)
    window.location.reload();
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    updateTempData("Permission", value);
    setSelectValue(value);
    setIsModified(true);
  };

  useEffect(() => {
    setTempData({
      ID: "",
      DisplayName: accountInformationInput.DisplayName,
      UserName: "",
      Password: "",
      Permission: accountInformationInput.Permission,
    })
    setIsModified(false);
    setInputValue(accountInformationInput);
    setSelectValue(accountInformationInput.Permission);
  }, [display, accountInformationInput]);

  useEffect(() => {
    if (type === "Edit") {
      if (tempData.Permission === accountInformationInput.Permission && tempData.DisplayName === accountInformationInput.DisplayName) {
        setIsSaveDisabled(true);
      }
      else if (tempData.DisplayName === "") setIsSaveDisabled(true)
      else setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(!(tempData.DisplayName && tempData.Password && tempData.Permission && tempData.UserName));
    }
  }, [type, tempData, inputValue]);

  const renderInputs = () => {
    return (
      <tbody>
        <tr>
          <td className="informationTitle"><p>Name :</p> </td>
          <td>
            <input
              value={inputValue["DisplayName"]}
              onChange={(e) => {
                updateInput(e.target.value, "DisplayName");
                updateTempData("DisplayName", e.target.value);
              }}
            ></input>
          </td>
        </tr>
        <tr>
          <td className="informationTitle"><p>Username :</p> </td>
          <td>
            <input
              value={inputValue["UserName"]}
              onChange={(e) => {
                updateInput(e.target.value, "UserName");
                updateTempData("UserName", e.target.value);
              }}
              disabled={type === "Edit"}
            ></input>
          </td>
        </tr>
        <tr>
          <td className="informationTitle"><p>Password :</p> </td>
          <td>
            <input
              value={inputValue["Password"]}
              onChange={(e) => {
                updateInput(e.target.value, "Password");
                updateTempData("Password", e.target.value);
              }}
              disabled={type === "Edit"}
            ></input>
          </td>
        </tr>
        <tr>
          <td className="informationTitle"><p>Permission :</p></td>
          <td>
            <select value={selectValue} onChange={(e) => handleSelectChange(e)}>
              <option value="" disabled>Select an option</option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
            </select>
          </td>
        </tr>
      </tbody>
    );
  };

  return (
    <InformationBlock display={display.toString()}>
      <InformationBoard>
        <h4>Account Information</h4>
        <table className="boardInput">
          {renderInputs()}
        </table>
        <div className="cancelSaveCombination">
          <button className="cancelButton"
            onClick={async () => {
              setIsDisplayInformationBlock(false);
            }}>Cancel</button>
          <SaveButton
            onClick={handleSaveButton}
            disabled={isSaveDisabled}
          >
            Save
          </SaveButton>
        </div>
      </InformationBoard>
    </InformationBlock >
  );
};

export default Information;