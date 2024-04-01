import { useMemo } from 'react';
import Wrapper from '../assets/wrappers/OrderWrapper';
import { Header } from '../components';
import { Table } from '../components';

const orderList = [
  {
    id: '#1',
    customerName: 'truong',
    phone: '0389662855',
    lobby: 'lobby 1',
    shift: 'morning',
    date: '21-05-2024',
    totalTable: 100,
    status: 'deposit',
  },
  {
    id: '#2',
    customerName: 'canh',
    phone: '0389662855',
    lobby: 'lobby 1',
    shift: 'morning',
    date: '21-05-2024',
    totalTable: 100,
    status: 'deposit',
  },
  {
    id: '#3',
    customerName: 'minh',
    phone: '0389662855',
    lobby: 'lobby 1',
    shift: 'morning',
    date: '21-05-2024',
    totalTable: 100,
    status: 'deposit',
  },
  {
    id: '#4',
    customerName: 'quy',
    phone: '0389662855',
    lobby: 'lobby 1',
    shift: 'morning',
    date: '21-05-2024',
    totalTable: 100,
    status: 'deposit',
  },
  {
    id: '#5',
    customerName: 'hoa',
    phone: '0389662855',
    lobby: 'lobby 1',
    shift: 'morning',
    date: '21-05-2024',
    totalTable: 100,
    status: 'deposit',
  },
  {
    id: '#6',
    customerName: 'trule',
    phone: '0389662855',
    lobby: 'lobby 1',
    shift: 'morning',
    date: '21-05-2024',
    totalTable: 100,
    status: 'paid',
  },
  {
    id: '#1r24id',
    customerName: 'trule',
    phone: '0389662855',
    lobby: 'lobby 1',
    shift: 'morning',
    date: '21-05-2024',
    totalTable: 100,
    status: 'paid',
  },
  {
    id: '#1r24id',
    customerName: 'trule',
    phone: '0389662855',
    lobby: 'lobby 1',
    shift: 'morning',
    date: '21-05-2024',
    totalTable: 100,
    status: 'paid',
  },
  {
    id: '#1r24id',
    customerName: 'trule',
    phone: '0389662855',
    lobby: 'lobby 1',
    shift: 'morning',
    date: '21-05-2024',
    totalTable: 100,
    status: 'paid',
  },
  {
    id: '#1r24id',
    customerName: 'trule',
    phone: '0389662855',
    lobby: 'lobby 1',
    shift: 'morning',
    date: '21-05-2024',
    totalTable: 100,
    status: 'paid',
  },
  {
    id: '#1r24id',
    customerName: 'trule',
    phone: '0389662855',
    lobby: 'lobby 1',
    shift: 'morning',
    date: '21-05-2024',
    totalTable: 100,
    status: 'paid',
  },
  {
    id: '#1r24id',
    customerName: 'trule',
    phone: '0389662855',
    lobby: 'lobby 1',
    shift: 'morning',
    date: '21-05-2024',
    totalTable: 100,
    status: 'paid',
  },
  {
    id: '#1r24id',
    customerName: 'trule',
    phone: '0389662855',
    lobby: 'lobby 1',
    shift: 'morning',
    date: '21-05-2024',
    totalTable: 100,
    status: 'paid',
  },
  {
    id: '#1r24id',
    customerName: 'trule',
    phone: '0389662855',
    lobby: 'lobby 1',
    shift: 'morning',
    date: '21-05-2024',
    totalTable: 100,
    status: 'paid',
  },
  {
    id: '#1r24id',
    customerName: 'trule',
    phone: '0389662855',
    lobby: 'lobby 1',
    shift: 'morning',
    date: '21-05-2024',
    totalTable: 100,
    status: 'paid',
  },
];

const Order = () => {
  const data = useMemo(() => orderList, []);
  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Customer',
        accessor: 'customerName',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Lobby',
        accessor: 'lobby',
      },
      {
        Header: 'Shift',
        accessor: 'shift',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Tol.table',
        accessor: 'totalTable',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    []
  );

  return (
    <Wrapper>
      <Header />
      <main>
        <div className="container">
          <Table data={data} columns={columns} canClick />
        </div>
      </main>
    </Wrapper>
  );
};
export default Order;
