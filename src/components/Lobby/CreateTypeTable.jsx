import { Icon } from "../../assets/icon"
import { WrapTable } from "./Styled"
const TypeTable = ({ data, handleEditButton, handleLobTypeClick }) => {
  const tableHead = ["ID", "Type", "Max table", "Min price", "Required Deposit", ""]
  return (
    <table className='lobbyTypeTable'>
      <thead>
        <tr>
          {tableHead.map((value, index) => {
            return <th key={index}>{value}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((value, index) => {
          return (
            <tr key={index}>
              {
                value.map((cell, cellIndex) => {
                  return (
                    <td key={cellIndex} onClick={() => handleLobTypeClick(value)}>{cell}</td>
                  )
                })
              }
              <td><Icon.more onClick={() => handleEditButton(value)}></Icon.more></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default TypeTable;