import { useEffect, useState } from "react";
import { InformationBlock, InformationBoard } from "./Styled";

const Information = ({ display, setIsDisplayInformationBlock, type, editrow, accountInformation, setAccountInformation, accountInformationInput }) => {
  const [tempData, setTempData] = useState({
    ID: "",
    DisplayName: "",
    UserName: "",
    Password: "",
    Permission: "",
  });

  const [inputValue, setInputValue] = useState(accountInformationInput);
  const [selectValue, setSelectValue] = useState(inputValue.Permission);

  const updateTempData = (name, data) => {
    const newData = { ...tempData, [name]: data };
    setTempData(newData);
  };

  const updateInput = (value) => {
    setInputValue(value);
  };

  const handleSaveButton = () => {
    if (type === "Edit") {
      handleEditSave();
    } else {
      handleCreateSave();
    }
  };

  const handleEditSave = () => {
    setIsDisplayInformationBlock(false);
    const newData = [...accountInformation];
    let newTempData = Object.values(tempData);
    newTempData = newTempData.map((value, index) => value === '' ? newData[editrow][index] : value);
    newData[editrow] = newTempData;
    setAccountInformation(newData);
  };

  const handleCreateSave = () => {
    const tempDataWithoutFirstElement = { ...tempData };
    delete tempDataWithoutFirstElement[Object.keys(tempDataWithoutFirstElement)[0]];
    const allInputsFilled = Object.values(tempDataWithoutFirstElement).every(value => value !== '');

    if (allInputsFilled) {
      setIsDisplayInformationBlock(false);
      const newData = [...accountInformation, Object.values(tempData)];
      setAccountInformation(newData);
    } else {
      alert("Hãy điền đủ thông tin !!");
    }
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    updateTempData("Permission", value);
    setSelectValue(value);
  };

  useEffect(() => {
    setTempData({
      ID: "",
      DisplayName: "",
      UserName: "",
      Password: "",
      Permission: "",
    });
    setInputValue(accountInformationInput);
    setSelectValue(accountInformationInput.Permission);
  }, [display, accountInformationInput]);

  return (
    <InformationBlock display={display.toString()}>
      <InformationBoard>
        <h4 onClick={() => console.log(type)}>Account Information</h4>
        <table className="boardInput">
          <tbody>
            <tr>
              <td className="informationTitle"><p>Name :</p> </td>
              <td>
                <input
                  value={inputValue["DisplayName"]}
                  onChange={(e) => {
                    updateInput(e.target.value);
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
                    updateInput(e.target.value);
                    updateTempData("UserName", e.target.value);
                  }}
                ></input>
              </td>
            </tr>
            <tr>
              <td className="informationTitle"><p>Password :</p> </td>
              <td>
                <input
                  value={inputValue["Password"]}
                  onChange={(e) => {
                    updateInput(e.target.value);
                    updateTempData("Password", e.target.value);
                  }}
                ></input>
              </td>
            </tr>
            <tr>
              <td className="informationTitle"><p>Permission :</p></td>
              <td>
                <select value={selectValue} onChange={(e) => handleSelectChange(e)}>
                  <option value="">Select an option</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Staff">Staff</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="cancelSaveCombination">
          <button className="cancelButton" onClick={() => setIsDisplayInformationBlock(false)}>Cancel</button>
          <button
            className="saveButton"
            onClick={handleSaveButton}
          >
            Save
          </button>
        </div>
      </InformationBoard>
    </InformationBlock>
  );
};

export default Information;
