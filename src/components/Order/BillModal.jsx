import { Link } from 'react-router-dom';
import { useOrderContext } from '../../pages/Order';
import Wrapper from '../../assets/wrappers/Order/BillWrapper';
import Modal from '../Modal';
import { customerInfo, weddingInfo } from '../../utils/billTable';
import { FaFilePdf } from 'react-icons/fa6';
import SpecificOrderTable from './SpecificOrderTable';

const customStyle = {
  content: {
    width: '40vw',
    height: '90vh',
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
      setModalClose={() =>
        setOrderModalState({ ...orderModalState, bill: false })
      }
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
            <div className={`paid-date ${orderInfo?.extraFee > 0 && 'red'}`}>
              <span className="title">paid date:</span>
              <span>{orderInfo?.paidDate.toLocaleDateString()}</span>
            </div>
            <Link className="pdf-export">
              export to pdf <FaFilePdf />
            </Link>
          </div>
          <button className="btn">done</button>
        </div>
      </Wrapper>
    </Modal>
  );
};
export default BillModal;
