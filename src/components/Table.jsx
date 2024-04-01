import { useTable, useSortBy, usePagination } from 'react-table';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDown,
  FaAngleUp,
} from 'react-icons/fa';
import Wrapper from '../assets/wrappers/TableWrapper';

const Table = ({ columns, data, canClick }) => {
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

  const resolveCellClass = (data) => {
    switch (data) {
      case 'paid':
        return 'paid';
      case 'deposit':
        return 'deposit';
      default:
        return;
    }
  };

  const handleRowClick = (data) => {
    console.log(data);
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
                className={canClick && 'can-click'}
                onClick={canClick && (() => handleRowClick(row.values))}
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className={resolveCellClass(cell.value)}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
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
    </Wrapper>
  );
};
export default Table;
