import { Icon } from "../../../assets/icon";
import { useContext } from "react";
import { TypeInformContext } from "../LobTypeInformation";

const TypeInformTable = () => {
  const {
    setIsLobTypeInformEditDisplay,
    setEditData,
    pagination
  } = useContext(TypeInformContext);
  const tableHead = ["ID", "Name", "Type"];

  const handleEditIconClick = (value) => {
    setIsLobTypeInformEditDisplay(true);
    setEditData(value);
  }
  return (
    <table className='lobbyTypeTable'>
      <thead>
        <tr>
          {tableHead.map((value, index) => (
            <th key={index}>{value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {pagination.data.map((value, index) => (
          <tr key={index}>
            {value.map((cell, cellIndex) => (
              cellIndex < 3 && <td key={cellIndex}>{cell}</td>
            ))}
            <td><Icon.more onClick={() => handleEditIconClick(value)}></Icon.more></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TypeInformTable;
