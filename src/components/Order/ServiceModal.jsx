import { useMemo } from 'react';
import { useOrderContext } from '../../pages/Order';
import Modal from '../Modal';
import Table from '../Table';
import Wrapper from '../../assets/wrappers/Order/ServiceWrapper';

const customStyle = {
  content: {
    width: '60vw',
    height: '65vh',
    left: '50%',
    top: '50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
};

const ServiceModal = ({ type, title, data }) => {
  const { orderModalState, setOrderModalState } = useOrderContext();

  const tableData = useMemo(() => data, []);
  const foodColumns = useMemo(
    () => [
      {
        Header: 'Order',
        accessor: 'order',
      },
      {
        Header: 'Food',
        accessor: 'foodName',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
      },
      {
        Header: 'Total',
        accessor: 'total',
      },
    ],
    []
  );
  const serviceColumns = useMemo(
    () => [
      {
        Header: 'Order',
        accessor: 'order',
      },
      {
        Header: 'Service',
        accessor: 'serviceName',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
      },
      {
        Header: 'Total',
        accessor: 'total',
      },
    ],
    []
  );

  const total = data
    .map(({ total }) => total)
    .reduce((acc, item) => acc + item);

  return (
    <Modal
      isOpen={orderModalState?.[type]}
      setModalClose={() =>
        setOrderModalState({ ...orderModalState, [type]: false })
      }
      customStyle={customStyle}
    >
      <Wrapper>
        <h3>{title}</h3>
        <div className="container">
          <Table
            data={tableData}
            columns={type === 'food' ? foodColumns : serviceColumns}
          />
          <strong>total: {total}$</strong>
        </div>
      </Wrapper>
    </Modal>
  );
};
export default ServiceModal;
