import { useState } from "react";
import SearchBox from "../components/SearchBox";
import Information from "../components/Users/Information";
import { UserBlock, StyledAccountInformationTable, StyledPermissionAccountTable, CreateSaveCombination } from "../components/Users/Styled";

const User = () => {
  const [isDisplayInfomationBlock, setIsDisplayInformationBlock] = useState(false);
  const [permissionAccount, setPermissionAccount] = useState([
    ["Account Groups", "Lobby", "Order", "Food & Service", "Report", "User"],
    ["Super Admin", true, true, true, true, true],
    ["Manager", false, false, false, false, true],
    ["Staff", true, true, true, false, false]
  ]);

  const [accountInformation, setAccountInformation] = useState([
    ["ID", "Display Name", "Username", "Password", "Permission", ""],
    ["QT001", "Nguyen Hoang Quy", "frwkHoangQuy", "vG3qk7bF", "Super Admin"],
    ["QT002", "Pham Doan Canh", "canhngu", "1V6r8QWd", "Admin"],
    ["QT003", "Nguyen Tue Minh", "minhtue", "pMfzLYho", "Manager"],
    ["QT004", "Le Quang Truong", "truongle", "2nUfGx5K", "Staff"],
    ["QT005", "Le Tan Hoa", "hoale", "9dCt4PvW", "Staff"],
  ]);

  const [accountInformationInput, setAccountInformationInput] = useState({
    ID: "",
    DisplayName: "",
    UserName: "",
    Password: "",
    Permission: "",
  });

  const [boardType, setBoardType] = useState("");
  const [row, setRow] = useState();

  const updatePermission = (rowIndex, cellIndex) => {
    const newPermissionAccount = [...permissionAccount];
    newPermissionAccount[rowIndex + 1][cellIndex] = !permissionAccount[rowIndex + 1][cellIndex];
    setPermissionAccount(newPermissionAccount);
  };

  const updateInformation = () => {
    alert("Saved!!");
    // Avoid hard reloading, manage state to update UI
  };

  const handleCreate = () => {
    setIsDisplayInformationBlock(true);
    setBoardType("Create");
    setAccountInformationInput({
      ID: "",
      DisplayName: "",
      UserName: "",
      Password: "",
      Permission: "",
    });
  };

  const deleteInformation = (row) => {
    if (window.confirm("Bạn muốn xóa?")) {
      const newAccountInformation = [...accountInformation];
      newAccountInformation.splice(row, 1);
      setAccountInformation(newAccountInformation);
    }
  };

  const editInformation = (row) => {
    setBoardType("Edit");
    setIsDisplayInformationBlock(true);
    const rowData = accountInformation[row];
    setAccountInformationInput({
      ID: rowData[0],
      DisplayName: rowData[1],
      UserName: rowData[2],
      Password: rowData[3],
      Permission: rowData[4],
    });
    setRow(row);
  };

  return (
    <UserBlock>
      <h4 className="blockTitle" onClick={() => console.log()}>
        Permissions of account groups
      </h4>
      <StyledPermissionAccountTable data={permissionAccount} action={updatePermission} />
      <div className="TitleSearchCombination">
        <h4 className="blockTitle" onClick={() => console.log(accountInformation)}>
          Account Information
        </h4>
        <SearchBox />
      </div>
      <StyledAccountInformationTable
        data={accountInformation}
        deleteRow={deleteInformation}
        editRow={editInformation}
      />
      <CreateSaveCombination>
        <button className="createButton" onClick={handleCreate}>Create</button>
        <button className="saveButton" onClick={updateInformation}>Save</button>
      </CreateSaveCombination>
      <Information
        display={isDisplayInfomationBlock}
        setIsDisplayInformationBlock={setIsDisplayInformationBlock}
        type={boardType}
        editrow={row}
        accountInformation={accountInformation}
        setAccountInformation={setAccountInformation}
        accountInformationInput={accountInformationInput}
      />
    </UserBlock>
  );
};

export default User;
