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
const EditOrderModalContainer = React.lazy(() =>
  import('../components/Order/EditOrderModalContainer')
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
import Loading from '../components/Loading';

const OrderContext = createContext();

const Order = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);
  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Customer',
        accessor: 'customer_name',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Shift',
        accessor: 'shift',
      },
      {
        Header: 'Date',
        accessor: 'wedding_date',
      },
      {
        Header: 'Tol.table',
        accessor: 'table_count',
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
  const [editOrderModalState, setEditOrderModalState] = useState({
    pickDate: false,
    lobType: false,
    lobby: false,
    userInfo: false,
    food: false,
    service: false,
    success: false,
  });

  const handleRowClick = (rowData) => {
    setOrderInfo(rowData);
    setOrderModalState({
      ...orderModalState,
      info: ['deposit', 'pending'].includes(rowData?.status),
      bill: rowData?.status === 'paid',
    });
  };

  const handleAddBtnClick = () => {
    setCreateOrderModalState({
      ...createOrderModalState,
      pickDate: true,
    });
  };

  const fetchWeddings = async () => {
    try {
      const includeBill = true
      const list = await getWeddings(includeBill);
      const handledList = list.data.map((wedding) => ({
        ...wedding,
        ...wedding.Bill[0],
        customer_name: wedding.Customer.name,
        phone: wedding.Customer.phone,
        lobby_name: wedding.Lobby.name,
        id: wedding.id,
      }));
      setOrderList(handledList);
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (!newOrder) fetchWeddings();
    if (!orderInfo) fetchWeddings();
  }, [newOrder, orderInfo]);

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
        editOrderModalState,
        setEditOrderModalState,
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <Header handleAddBtnClick={handleAddBtnClick} headerTitle={"Order"} />
          <main>
            <div className="container">
              <Table
                data={orderList}
                columns={columns}
                handleRowClick={handleRowClick}
                pagination
              />
            </div>
            {/* Suspense wrapping all conditional modals */}
            <Suspense fallback={<Loading minsize="35px" />}>
              {orderModalState?.info && <OrderInfoModal />}
              {orderModalState?.payRemainder && <PayRemainderModal />}
              {orderModalState?.bill && <BillModal />}
              {orderModalState?.food && (
                <ServiceModal type="food" title="food" />
              )}
              {orderModalState?.service && (
                <ServiceModal type="service" title="service" />
              )}
              {/* Create new order modal container always present, also wrapped in Suspense */}
              <CreateOrderModalContainer />
              <EditOrderModalContainer />
            </Suspense>
          </main>
        </Wrapper>
      )}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
export default Order;
