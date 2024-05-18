import { Icon } from "../../../assets/icon";
import { formatVND, truncateUUID } from "../../../utils";

const LobTypeTable = (p) => {
  const { data, handleEditButton, handleLobTypeClick } = p

  const formatTableHead = (array) =>{
    let { created_at, updated_at, deleted_at, ...rest } = array[0]
    rest = { 
      id: rest.id,
      type_name: rest.type_name,
       ...rest
    }
    const result = Object.keys(rest).map(key => {
      return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    });
    

    return result
  }

  const formatTableRow = (object) => {
    let { created_at, updated_at, deleted_at, ...rest} = object
    rest = { 
      id: rest.id,
      type_name: rest.type_name,
       ...rest
    }
    return rest
  }

  return (
    <table className='lobbyTypeTable'>
      <thead>
        <tr>
          {data && data.length > 0 && formatTableHead(data).map((value, index) => (
            <th key={index}>{value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data && data.map((value, index) => (
          <tr key={index}>
            {
            Object.keys(formatTableRow(value)).map((cell, cellIndex) => {
              let renderData = value[cell]
              if(cell === 'id') // max table
                renderData = truncateUUID(renderData);
              if(cell === 'max_table_count') // max table
                renderData = renderData + " tables"
              if(cell === 'min_table_price') // min table price
                renderData = formatVND(renderData) + "/table"
              if(cell === 'deposit_percent') // deposit percent
                renderData = renderData + "%"
              return (<td key={cellIndex} onClick={() => handleLobTypeClick(value)}>{renderData}</td>)
            })
            }
            <td><Icon.more onClick={() => handleEditButton(value)}></Icon.more></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LobTypeTable;
