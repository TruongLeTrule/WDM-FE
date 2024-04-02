import styled from "styled-components";

const TableFromArray2D = ({ className, data }) => {
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
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const User = () => {
  const PermissionAccount = [
    ["Account Groups", "Lobby", "Order", "Food&Service", "Report", "User"],
    ["Super Admin", 1, 1, 1, 1, 1],
    ["Manager", 0, 0, 0, 0, 1],
    ["Staff", 1, 1, 1, 0, 0]
  ];

  return (
    <UserBlock>
      <h4 className="blockTitle" onClick={() => console.log(PermissionAccount)}>
        Permissions of account groups
      </h4>
      <StyledTableFromArray2D data={PermissionAccount} />

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


