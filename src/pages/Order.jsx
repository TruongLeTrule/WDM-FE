import { createContext, useContext, useMemo, useState } from 'react';
import Wrapper from '../assets/wrappers/OrderWrapper';
import { Header, Table } from '../components';
import {
  EditOrderInfoModal,
  OrderInfoModal,
  PayRemainderModal,
  BillModal,
  ServiceModal,
} from '../components/Order';
import { orderList, food, service } from '../utils/orderTestData';

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
    food: false,
    service: false,
  });

  const handleRowClick = (rowData) => {
    setOrderInfo(rowData);
    setOrderModalState({
      ...orderModalState,
      info: rowData?.status === 'deposit',
      bill: rowData?.status === 'paid',
    });
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
              paginationBtn
            />
          </div>
          {/* Modal */}
          {orderModalState.info && <OrderInfoModal />}
          {orderModalState.edit && <EditOrderInfoModal />}
          {orderModalState.payRemainder && <PayRemainderModal />}
          {orderModalState.bill && <BillModal />}
          {orderModalState.food && (
            <ServiceModal type="food" title="food" data={food} />
          )}
          {orderModalState.service && (
            <ServiceModal type="service" title="service" data={service} />
          )}
        </main>
      </Wrapper>
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
export default Order;
