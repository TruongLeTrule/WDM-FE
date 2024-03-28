import { useTable, useSortBy, usePagination } from 'react-table';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/TableWrapper';

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canNextPage,
    canPreviousPage,
    prepareRow,
    nextPage,
    previousPage,
    state: { pageIndex },
    pageCount,
  } = useTable({ columns, data }, useSortBy, usePagination);

  return (
    <Wrapper>
      <table {...getTableBodyProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
