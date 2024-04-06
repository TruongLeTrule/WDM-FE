import { FaPenToSquare } from 'react-icons/fa6';
import { useOrderContext } from '../../pages/Order';
import Modal from '../Modal';
import Wrapper from '../../assets/wrappers/Order/OrderInfoWrapper';
import { orderInfoLeft, orderInfoRight } from '../../utils/orderRows';
import Rows from './Rows';

const OrderInfoModal = () => {
  const { orderInfo, orderModalState, setOrderModalState } = useOrderContext();

  const handlePayBtnClick = () => {
    setOrderModalState({
      ...orderModalState,
      info: false,
      payRemainder: true,
    });
  };

  return (
    <Modal
      isOpen={orderModalState?.info}
      setModalClose={() =>
        setOrderModalState({ ...orderModalState, info: false })
      }
    >
      <Wrapper>
        <div className="header">
          <h4>order {orderInfo?.id}</h4>
          <FaPenToSquare
            className="icon"
            onClick={() =>
              setOrderModalState({ ...orderModalState, edit: true })
            }
          />
        </div>
        <div className="container">
          {/* Left col */}
          <div>
            <h5>Customer information</h5>
            <Rows render={orderInfoLeft} />
          </div>
          {/* Right col */}
          <div>
            <h5>{orderInfo?.lobby}</h5>
            <p className="shift">{orderInfo?.shift}</p>
            <Rows render={orderInfoRight} />
          </div>
        </div>
        <button className="btn" onClick={handlePayBtnClick}>
          pay
        </button>
      </Wrapper>
    </Modal>
  );
};
export default OrderInfoModal;
