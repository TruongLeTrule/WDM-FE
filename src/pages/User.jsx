import { useState } from "react";
import styled from "styled-components";

const TableFromArray2D = ({ className, data, action }) => {
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
            }
            )}
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


  const updatePermission = (rowIndex, cellIndex) => {
    const newUpdatePermission = [...permissionAccount];
    newUpdatePermission[rowIndex + 1][cellIndex] = !permissionAccount[rowIndex + 1][cellIndex];
    setPermissionAccount(newUpdatePermission);
  }

  return (
    <UserBlock>
      <h4 className="blockTitle" onClick={() => console.log(permissionAccount)}>
        Permissions of account groups
      </h4>
      <StyledTableFromArray2D data={permissionAccount} action={updatePermission} />
    </UserBlock>
  );
};

export default User;

const UserBlock = styled.div`
  background-color: white;
  padding-left: 2%;
  padding-top: 1%;
  height: 100vh;
  .blockTitle {
    width: 100%;
    height: 8vh;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
`;

const StyledTableFromArray2D = styled(TableFromArray2D)`
  table-layout: fixed;
  width: 100%;
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

const Checkbox = styled.input`
  outline: none;
  width: 25px;
  height: 25px;
  color: red;
  &:hover{
    cursor: pointer;
  }
`


