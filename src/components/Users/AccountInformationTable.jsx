import { Icon } from "../../assets/icon";
export const AccountInformationTable = ({ className, data, deleteRow, editRow }) => {
  return (
    <table className={className}>
      <thead>
        <tr>
          {data[0].map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.slice(1).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
            <td className="pencilIcon" onClick={() => editRow(rowIndex + 1)}><Icon.pencil /></td>
            <td className="deleteIcon" onClick={() => deleteRow(rowIndex + 1)}><Icon.delete /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};