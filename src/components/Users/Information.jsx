import styled from "styled-components"
import { useState } from "react"
const Information = ({ display, setIsDisplayInformationBlock, type, editrow, accountInformation, setAccountInformation }) => {
  const [tempData, setTempData] = useState({
    ID: "",
    DisplayName: "",
    UserName: "",
    Password: "",
    Permission: "",
  })
  const updateTempData = (name, data) => {
    const newData = { ...tempData };
    newData[name] = data;
    setTempData(newData);
  }
  return (
    <InformationBlock display={display.toString()}>
      <InformationBoard>
        <h4 onClick={() => { console.log(type) }}>Account Information</h4>
        <table className="boardInput">
          <tbody>
            <tr>
              <td className="informationTitle"><p>ID :</p> </td>
              <td><input onChange={(e) => updateTempData("ID", e.target.value)} ></input></td>
            </tr>
            <tr>
              <td className="informationTitle"><p>Name :</p> </td>
              <td><input onChange={(e) => updateTempData("DisplayName", e.target.value)}></input></td>
            </tr>
            <tr>
              <td className="informationTitle"><p>Username :</p> </td>
              <td><input onChange={(e) => updateTempData("UserName", e.target.value)}></input></td>
            </tr>
            <tr>
              <td className="informationTitle"><p>Password :</p> </td>
              <td><input type="password" onChange={(e) => updateTempData("Password", e.target.value)}></input></td>
            </tr>
            <tr>
              <td className="informationTitle"><p>Permission :</p> </td>
              <td>
                <select value={tempData} onChange={(e) => updateTempData("Permission", e.target.value)}>
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
            onClick={() => {
              setIsDisplayInformationBlock(false);
              const newData = [...accountInformation];
              let newTempData = Object.values(tempData)
              newTempData.splice(3, 1)
              newTempData = newTempData.map((value, index) => {
                if (value === '') value = newData[editrow][index];
                return value;
              });
              newData[editrow] = newTempData;
              setAccountInformation(newData);
            }}
          >
            Save
          </button>

        </div>
      </InformationBoard>
    </InformationBlock>
  )
}

export default Information;

const InformationBlock = styled.div`
  z-index: 2;
  position: fixed;
  top: 0; 
  left: 12%; 
  height: 100vh;
  width: 88%;
  background-color: rgb(0, 0, 0, 50%);
  display: ${props => props.display === "true" ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
`;

const InformationBoard = styled.div`
  width: 40%;
  height: 60%;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  justify-content: space-around;
  background-color: white;

h4{
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: end;
  font-weight: bold;
}

.boardInput{
  flex: 1;
  width: 100%;
  tr{
    .informationTitle{
     width : 35% ;
    }
  }
  td{
    p{
      height: 100%;
      display: flex;
      justify-content: end;
      align-items: center;
      font-size: 1.15em;
      font-weight: bold;
    }
    input{
      width: 65%;
      margin-left: 5% ;
      font-size: 1.15em;
      font-weight: bold;
      border-bottom: 1px black solid;
    }
    select{
      margin-left: 5%;
      width: 65%;
      border-radius: 5px;
      font-size: 1.15em;
    }
  }
}

  .cancelSaveCombination{
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    button{
      width: 15%;
      height: 50%;
      border-radius: 12px;
      color: white;
      &:hover{
        cursor: pointer;
      }
    }
    .cancelButton{
      background-color: #c4c4c4;
      margin-left: 2%;
    }
    .saveButton{
      background-color: #1814f3;
      margin-right: 2%;
    }
  }
`