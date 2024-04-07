import { useMemo } from 'react';
import Modal from '../Modal';
import Wrapper from '../../assets/wrappers/Order/LobTypeWrapper';
import { lobType } from '../../utils/orderTestData';
import Table from '../Table';

const customStyle = {
  content: {
    width: '70vw',
    height: '87vh',
    left: '50%',
    top: '50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
};

const PickLobTypeModal = ({
  isOpen,
  setModalClose,
  setValue,
  setNextModalOpen,
}) => {
  const data = useMemo(() => lobType, []);
  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Type',
        accessor: 'typeName',
      },
      {
        Header: 'Max table',
        accessor: 'maxTable',
      },
      {
        Header: 'Min price',
        accessor: 'minPrice',
      },
      {
        Header: 'Required deposit',
        accessor: 'requiredDeposit',
      },
    ],
    []
  );

  const handleRowClick = (value) => {
    setValue(value.id);
    setNextModalOpen();
  };

  return (
    <Modal
      isOpen={isOpen}
      setModalClose={setModalClose}
      customStyle={customStyle}
    >
      <Wrapper>
        <h4>choose lobby type</h4>
        <div className="container">
          <Table
            data={data}
            columns={columns}
            handleRowClick={handleRowClick}
          />
        </div>
      </Wrapper>
    </Modal>
  );
};
export default PickLobTypeModal;
