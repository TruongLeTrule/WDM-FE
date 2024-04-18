import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  Suspense,
} from 'react';
import { Header, Table } from '../components';
const Wrapper = React.lazy(() => import('../assets/wrappers/OrderWrapper'));
const EditOrderInfoModal = React.lazy(() =>
  import('../components/Order/EditOrderInfoModal')
);
const OrderInfoModal = React.lazy(() =>
  import('../components/Order/OrderInfoModal')
);
const PayRemainderModal = React.lazy(() =>
  import('../components/Order/PayRemainderModal')
);
const BillModal = React.lazy(() => import('../components/Order/BillModal'));
const ServiceModal = React.lazy(() =>
  import('../components/Order/ServiceModal')
);
const CreateOrderModalContainer = React.lazy(() =>
  import('../components/Order/CreateOrderModalContainer')
);
import { getWeddings } from '../api/wedding.api';
import { orderList, food, service } from '../utils/orderTestData';
import Loading from '../components/Loading';

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
  const [newOrder, setNewOrder] = useState();
  const [orderModalState, setOrderModalState] = useState({
    info: false,
    edit: false,
    payRemainder: false,
    bill: false,
    food: false,
    service: false,
  });
  const [createOrderModalState, setCreateOrderModalState] = useState({
    pickDate: false,
    lobType: false,
    lobby: false,
    userInfo: false,
    food: false,
    service: false,
    payment: false,
    review: false,
    success: false,
  });

  const handleRowClick = (rowData) => {
    setOrderInfo(rowData);
    setOrderModalState({
      ...orderModalState,
      info: rowData?.status === 'deposit',
      bill: rowData?.status === 'paid',
    });
  };

  const handleAddBtnClick = () => {
    setCreateOrderModalState({
      ...createOrderModalState,
      pickDate: true,
    });
  };

  // useEffect(async () => {
  //   const list = await getWeddings();
  //   console.log(list.data);
  // }, []);

  return (
    <OrderContext.Provider
      value={{
        orderModalState,
        setOrderModalState,
        createOrderModalState,
        setCreateOrderModalState,
        orderInfo,
        setOrderInfo,
        newOrder,
        setNewOrder,
      }}
    >
      <Wrapper>
        <Header handleAddBtnClick={handleAddBtnClick} />
        <main>
          <div className="container">
            <Table
              data={data}
              columns={columns}
              handleRowClick={handleRowClick}
              pagination
            />
          </div>
          {/* Suspense wrapping all conditional modals */}
          <Suspense fallback={<Loading minsize="35px" />}>
            {orderModalState?.info && <OrderInfoModal />}
            {orderModalState?.edit && <EditOrderInfoModal />}
            {orderModalState?.payRemainder && <PayRemainderModal />}
            {orderModalState?.bill && <BillModal />}
            {orderModalState?.food && (
              <ServiceModal type="food" title="food" data={food} />
            )}
            {orderModalState?.service && (
              <ServiceModal type="service" title="service" data={service} />
            )}
            {/* Create new order modal container always present, also wrapped in Suspense */}
            <CreateOrderModalContainer />
          </Suspense>
        </main>
      </Wrapper>
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
export default Order;
