import { Checkbox } from "./Styled";

export const PermissonAccountTable = ({ className, data, action }) => {
  const renderTableRows = () => {
    return data.slice(1).map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((cell, cellIndex) => {
          if (cellIndex === 0) return <td key={cellIndex}>{cell}</td>;
          return (
            <td key={cellIndex}>
              <Checkbox
                onChange={() => action(rowIndex, cellIndex)}
                type="checkbox"
                id="myCheckbox"
                checked={cell}
              />
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <table className={className}>
      <thead>
        <tr>
          {data[0].map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{renderTableRows()}</tbody>
    </table>
  );
};
