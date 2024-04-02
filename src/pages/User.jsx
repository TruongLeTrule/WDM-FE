import { useState } from "react";
import styled from "styled-components";
import { Icon } from "../assets/icon";
import SearchBox from "../components/SearchBox";

const Checkbox = styled.input`
  outline: none;
  width: 25px;
  height: 25px;
  color: red;
  &:hover{
    cursor: pointer;
  }
`

const PermissonAccountTable = ({ className, data, action }) => {
  return (
    <table className={className}>
      <thead>
        <tr>
          {data[0].map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(1).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => {
              if (cellIndex === 0) return <td key={cellIndex}>{cell}</td>
              return <td key={cellIndex}>
                <Checkbox
                  onChange={() => action(rowIndex, cellIndex)}
                  type="checkbox"
                  id="myCheckbox"
                  checked={cell} />
              </td>
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const AccountInformationTable = ({ className, data }) => {
  return (
    <table className={className}>
      <thead>
        <tr>
          {data[0].map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.slice(1).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
            <td className="pencilIcon"><Icon.pencil /></td>
            <td className="deleteIcon"><Icon.delete /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const User = () => {
  const [permissionAccount, setPermissionAccount] = useState([
    ["Account Groups", "Lobby", "Order", "Food&Service", "Report", "User"],
    ["Super Admin", true, true, true, true, true],
    ["Manager", false, false, false, false, true],
    ["Staff", true, true, true, false, false]
  ]);

  const [accountInformation, setAccountInformation] = useState([
    ["ID", "Display Name", "Username", "Permission", ""],
    ["QT001", "Nguyen Hoang Quy", "frwkHoangQuy", "Super Admin"],
    ["QT002", "Pham Doan Canh", "canhngu", "Admin"],
    ["QT003", "Nguyen Tue Minh", "minhtue", "Manager"],
    ["QT004", "Le Quang Truong", "truongle", "Staff"],
    ["QT005", "Le Tan Hoa", "hoale", "Staff"],
    ["QT005", "Le Tan Hoa", "hoale", "Staff"],
    ["QT005", "Le Tan Hoa", "hoale", "Staff"],
  ]);

  const updatePermission = (rowIndex, cellIndex) => {
    const newUpdatePermission = [...permissionAccount];
    newUpdatePermission[rowIndex + 1][cellIndex] = !permissionAccount[rowIndex + 1][cellIndex];
    setPermissionAccount(newUpdatePermission);
  }

  const reloadPage = () => {
    alert("Saved !!!");
    location.reload();
  }

  return (
    <UserBlock>
      <h4 className="blockTitle" onClick={() => console.log(permissionAccount)}>
        Permissions of account groups
      </h4>
      <StyledPermissionAccountTable data={permissionAccount} action={updatePermission} />
      <div className="TitleSearchCombination">
        <h4 className="blockTitle" onClick={() => console.log(permissionAccount)}>
          Account Information
        </h4>
        <SearchBox />
      </div>
      <StyledAccountInformationTable data={accountInformation} />
      <CreateSaveCombination>
        <button className="createButton">Create</button>
        <button className="saveButton" onClick={reloadPage}>Save</button>
      </CreateSaveCombination>
    </UserBlock>
  );
};

export default User;

const UserBlock = styled.div`
  background-color: white;
  padding-left: 2%;
  padding-top: 1%;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  .blockTitle {
    width: 100%;
    height: 8vh;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
  .TitleSearchCombination{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 5%;
  }
`;

const StyledPermissionAccountTable = styled(PermissonAccountTable)`
  table-layout: fixed;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  tr{
    height: 7vh;
  }
  th{
    width: auto;
    text-align: center;
    font-size: 1.5em;
    color: #718ebf;
  }
  td{
    width: auto;
    text-align: center;
    font-size: 1.25em;
  }
`;

const StyledAccountInformationTable = styled(AccountInformationTable)`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-right: 5%;
  tr{
    height: 7vh;
  }
  th{
    width: auto;
    text-align: center;
    font-size: 1.5em;
    color: #718ebf;
  }
  td{
    width: auto;
    text-align: center;
    font-size: 1.25em;
  }
  .pencilIcon{
    &:hover{
      cursor: pointer;
    }
  }
  .deleteIcon{
    &:hover{
      cursor: pointer;
    }
  }
`;

const CreateSaveCombination = styled.div`
  height: 9vh;
  display: flex;
  padding-left: 5%;
  padding-right: 5%;
  justify-content: space-between;
  align-items: center;
  button{
    width: 10%;
    height: 50%;
    border-radius: 15px;
    color: white;
    font-size: 15px;
    &:hover{
      cursor: pointer;
    }
  }
  .createButton{
    background-color: gray;
  }
  .saveButton{
    background-color: blue;
  }
`
