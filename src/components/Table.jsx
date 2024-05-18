import { useTable, useSortBy, usePagination } from 'react-table';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDown,
  FaAngleUp,
} from 'react-icons/fa';
import resolveDate from '../utils/resolveDate';
import Wrapper from '../assets/wrappers/TableWrapper';
import resolveCurrency from '../utils/resolveCurrency';
import { truncateUUID } from '../utils';

const Table = (p) => {
  const { columns, data, handleRowClick, pagination } = p
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    nextPage,
    canNextPage,
    previousPage,
    canPreviousPage,
    state: { pageIndex },
    pageCount,
  } = useTable({ columns, data }, useSortBy, usePagination);
  


  const resolveCellClass = (cellValue) => {
    switch (cellValue) {
      case 'paid':
        return 'paid';
      case 'deposit':
        return 'deposit';
      case 'pending':
        return 'pending';
      default:
        return;
    }
  };

  return (
    <Wrapper>
      <table {...getTableBodyProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {column.isSorted && (
                    <span className="sort-icon">
                      {column.isSortedDesc ? <FaAngleDown /> : <FaAngleUp />}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={handleRowClick && 'can-click'}
                onClick={() => handleRowClick(row.original)}
                key={row.id}  // It's better to use a unique identifier for the row if available
              >
                {row.cells.map((cell, idx) => {
                  let renderData = cell.value
                  if(cell.column.id.includes('date')) {
                    renderData = resolveDate(cell.value)
                  } else if(cell.column.id === "id" ) {
                    renderData = truncateUUID(cell.value)
                  }

                return (
                  <td
                    {...cell.getCellProps()}
                    className={resolveCellClass(cell.value)}
                    title={cell.column.id === 'customerName' ? cell.value : ''}
                    key={idx}  // Adding the key here
                  >
                    {renderData}
                    {resolveCurrency(cell.column.id)}
                  </td>
                )})}
              </tr>
            );
          })}

        </tbody>
      </table>
      {pagination && (
        <div className="page-group">
          <button disabled={!canPreviousPage} onClick={previousPage}>
            <FaAngleLeft />
          </button>
          <span>
            {pageIndex + 1} of {pageCount}
          </span>
          <button disabled={!canNextPage} onClick={nextPage}>
            <FaAngleRight />
          </button>
        </div>
      )}
    </Wrapper>
  );
};
export default Table;
