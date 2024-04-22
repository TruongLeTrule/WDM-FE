import { Link } from 'react-router-dom';
import { FaFilePdf } from 'react-icons/fa6';
import { useOrderContext } from '../../pages/Order';
import { customerInfo, weddingInfo } from '../../utils/billTable';
import Wrapper from '../../assets/wrappers/Order/BillWrapper';
import Modal from '../Modal';
import SpecificOrderTable from './SpecificOrderTable';
import resolveDate from '../../utils/resolveDate';

const customStyle = {
  content: {
    width: '40vw',
    height: '86vh',
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

const BillModal = () => {
  const { orderModalState, setOrderModalState, orderInfo, setOrderInfo } =
    useOrderContext();

  return (
    <Modal
      isOpen={orderModalState.bill}
      setModalClose={() => {
        setOrderModalState({ ...orderModalState, bill: false });
        setOrderInfo(null);
      }}
      customStyle={customStyle}
    >
      <Wrapper>
        <h4>order {orderInfo?.id}</h4>
        <div className="container">
          <h5>customer information</h5>
          <SpecificOrderTable data={customerInfo} />
          <h5>wedding information</h5>
          <SpecificOrderTable data={weddingInfo} />
          <div className="more-info">
            <div className={`paid-date ${orderInfo?.extra_fee > 0 && 'red'}`}>
              <span className="title">paid date:</span>
              <span>{resolveDate(orderInfo?.payment_date)}</span>
            </div>
            <Link className="pdf-export">
              export to pdf <FaFilePdf />
            </Link>
          </div>
          <button
            className="btn"
            onClick={() =>
              setOrderModalState({ ...orderModalState, bill: false })
            }
          >
            done
          </button>
        </div>
      </Wrapper>
    </Modal>
  );
};
export default BillModal;
