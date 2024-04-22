import { Icon } from "../../../assets/icon";

const TypeInformTable = ({ data }) => {
  const tableHead = ["ID", "Name", "Type"];

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
        {data.map((value, index) => (
          <tr key={index}>
            {value.map((cell, cellIndex) => (
              <td key={cellIndex} onClick={() => { }}>{cell}</td>
            ))}
            <td><Icon.more onClick={() => { }}></Icon.more></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TypeInformTable;
