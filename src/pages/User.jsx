import { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import Information from "../components/Users/Information";
import { UserBlock, StyledAccountInformationTable, StyledPermissionAccountTable, CreateSaveCombination } from "../components/Users/Styled";
import { getUsers } from "../api/user.api";

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
  ]);
  const [accountInformationTableFilter, setAccountInformationTableFilter] = useState(accountInformation);
  const [accountInformationInput, setAccountInformationInput] = useState({
    ID: "",
    DisplayName: "",
    UserName: "",
    Password: "",
    Permission: "",
  });
  const [boardType, setBoardType] = useState("");
  const [row, setRow] = useState();
  const [searchValue, setSearchValue] = useState();

  const updatePermission = (rowIndex, cellIndex) => {
    const newPermissionAccount = [...permissionAccount];
    newPermissionAccount[rowIndex + 1][cellIndex] = !permissionAccount[rowIndex + 1][cellIndex];
    setPermissionAccount(newPermissionAccount);
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

  const handleSave = () => {
    console.log(1)
  }

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

  const handleSearchBox = (value) => {
    if (typeof value === 'string') {
      const trimmedValue = value.trim();
      setSearchValue(trimmedValue);
    }
  };

  useEffect(() => {
    if (!searchValue) {
      setAccountInformationTableFilter(accountInformation);
    } else {
      const filteredData = accountInformation.slice(1).filter(row => checkRow(row, searchValue));
      filteredData.unshift(accountInformation[0]);
      setAccountInformationTableFilter(filteredData);
    }
  }, [searchValue, accountInformation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUsers();
        if (res && res.data) {
          const data = res.data;
          const tempAccountInformation = [];
          tempAccountInformation.push(["ID", "Display Name", "Username", "Password", "Permission", ""])
          data.forEach((value) => {
            let subArray = [];
            subArray.push(value["id"]);
            subArray.push(value["display_name"]);
            subArray.push(value["username"]);
            subArray.push(value["password"]);
            subArray.push(value["role"]);
            tempAccountInformation.push(subArray);
          });
          setAccountInformation(tempAccountInformation);
        } else {
          console.log('nodata');
        }
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };
    fetchData();
    return;
  }, []);

  const checkRow = (row, searchValue) => {
    return row.some(cell => {
      if (typeof cell === 'string' && typeof searchValue === 'string') {
        return cell.toLowerCase().includes(searchValue.toLowerCase());
      }
    });
  };

  return (
    <UserBlock>
      <h4 className="blockTitle" onClick={() => console.log(permissionAccount)}>
        Permissions of account groups
      </h4>
      <StyledPermissionAccountTable data={permissionAccount} action={updatePermission} />
      <div className="TitleSearchCombination">
        <h4 className="blockTitle" onClick={() => console.log(accountInformation)}>
          Account Information
        </h4>
        <SearchBox onChange={handleSearchBox} />
      </div>
      <StyledAccountInformationTable
        data={accountInformationTableFilter}
        preData={accountInformation}
        deleteRow={deleteInformation}
        editRow={editInformation}
      />
      <CreateSaveCombination>
        <button className="createButton" onClick={handleCreate}>Create</button>
        <button className="saveButton" onClick={handleSave}>Save</button>
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
