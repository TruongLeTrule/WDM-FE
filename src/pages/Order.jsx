import { createContext, useContext, useMemo, useState } from 'react';
import Wrapper from '../assets/wrappers/OrderWrapper';
import { Header, Table } from '../components';
import {
  EditOrderInfoModal,
  OrderInfoModal,
  PayRemainderModal,
  BillModal,
} from '../components/Order';

const orderDate = new Date();
const occurDate = new Date('2024-04-01');
const orderList = [
  {
    id: '#1',
    customerName: 'truong',
    groom: 'Le Quang Truong',
    bride: 'Truong Quang Le',
    phone: '0389662855',
    lobby: 'lobby 1',
    shift: 'morning',
    status: 'deposit',
    payMethod: 'cash',
    orderDate: orderDate.toLocaleDateString(),
    occurDate: occurDate.toLocaleDateString(),
    totalTable: 100,
    pricePerTable: 200,
    serviceFee: 2000,
    total: 100000,
    deposit: 100,
    extraFee: 0,
    remainder: 990000,
    isPenaltyMode: false,
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

const OrderContext = createContext();

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
        accessor: 'occurDate',
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

  const [orderInfo, setOrderInfo] = useState();
  const [orderModalState, setOrderModalState] = useState({
    info: false,
    edit: false,
    payRemainder: false,
    bill: false,
  });

  const handleRowClick = (rowData) => {
    setOrderInfo(rowData);
    setOrderModalState((prev) => ({
      ...prev,
      info: true,
    }));
  };

  return (
    <OrderContext.Provider
      value={{
        orderModalState,
        setOrderModalState,
        orderInfo,
        setOrderInfo,
      }}
    >
      <Wrapper>
        <Header />
        <main>
          <div className="container">
            <Table
              data={data}
              columns={columns}
              handleRowClick={handleRowClick}
            />
          </div>
          {/* Modal */}
          {orderModalState.info && <OrderInfoModal />}
          {orderModalState.edit && <EditOrderInfoModal />}
          {orderModalState.payRemainder && <PayRemainderModal />}
          {orderModalState.bill && <BillModal />}
        </main>
      </Wrapper>
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
export default Order;
