import { Icon } from "../../../assets/icon";
import { formatVND } from "../../../utils";

const TypeTable = (p) => {
  const { data, handleEditButton, handleLobTypeClick } = p
  const tableHead = ["ID", "Type", "Max table", "Min price", "Required Deposit", ""];

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
        {data && data.map((value, index) => (
          <tr key={index}>
            {value.map((cell, cellIndex) => {
              if(cellIndex === 2) // max table
                cell = cell + " tables"
              if(cellIndex === 3) // min table price
                cell = formatVND(cell) + "/table"
              if(cellIndex === 4) // deposit percent
                cell = cell + "%"
              return (<td key={cellIndex} onClick={() => handleLobTypeClick(value)}>{cell}</td>)
            }
            )}
            <td><Icon.more onClick={() => handleEditButton(value)}></Icon.more></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TypeTable;
