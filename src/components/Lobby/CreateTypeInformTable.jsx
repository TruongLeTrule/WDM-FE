import { Icon } from "../../assets/icon";
const TypeInformTable = ({
  data
}) => {
  const tableHead = ["ID", "Name", "Type"];
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
                    <td key={cellIndex} onClick={() => { }}>{cell}</td>
                  )
                })
              }
              <td><Icon.more onClick={() => { }}></Icon.more></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default TypeInformTable;