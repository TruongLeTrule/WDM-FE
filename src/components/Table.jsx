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

const Table = ({ columns, data, handleRowClick, pagination }) => {
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
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className={resolveCellClass(cell.value)}
                    title={cell.column.id === 'customerName' ? cell.value : ''}
                  >
                    {cell.column.id.includes('date')
                      ? resolveDate(cell.value)
                      : cell.value}
                    {resolveCurrency(cell.column.id)}
                  </td>
                ))}
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
