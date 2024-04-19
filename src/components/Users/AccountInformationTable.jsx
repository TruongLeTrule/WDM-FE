import { Icon } from "../../assets/icon";
import { deleteUser } from "../../api/user.api";

export const AccountInformationTable = ({ className, data, deleteRow, editRow, preData }) => {
  const handleEdit = (row) => {
    editRow(preData.indexOf(row));
  };

  const handleDelete = (row) => {
    deleteRow(preData.indexOf(row));
    deleteUser(row[0]);
  };

  const renderTableHeader = () => (
    <thead>
      <tr>
        {data[0].map((header, index) => (
          <th key={index}>{header}</th>
        ))}
        <th></th>
        <th></th>
      </tr>
    </thead>
  );

  const renderTableBody = () => (
    <tbody>
      {data.slice(1).map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <td key={cellIndex}>{cell}</td>
          ))}
          <td className="pencilIcon" onClick={() => handleEdit(row)}>
            <Icon.pencil />
          </td>
          <td className="deleteIcon" onClick={() => handleDelete(row)}>
            <Icon.delete />
          </td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <table className={className}>
      {renderTableHeader()}
      {renderTableBody()}
    </table>
  );
};
