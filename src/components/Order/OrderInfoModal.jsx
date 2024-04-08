import { FaPenToSquare } from 'react-icons/fa6';
import { useOrderContext } from '../../pages/Order';
import { orderInfoLeft, orderInfoRight } from '../../utils/orderRenderArr';
import { Modal } from '../';
import TextRow from '../TextRow';
import Wrapper from '../../assets/wrappers/Order/OrderInfoWrapper';

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
            <div className="rows">
              {orderInfoLeft.map(({ title, key }) => (
                <TextRow
                  title={title}
                  keyValue={key}
                  key={key}
                  value={orderInfo?.[key]}
                />
              ))}
            </div>
          </div>
          {/* Right col */}
          <div>
            <h5>{orderInfo?.lobby}</h5>
            <p className="shift">{orderInfo?.shift}</p>
            <div className="rows">
              {orderInfoRight.map(({ title, key, openModal }) => (
                <TextRow
                  value={orderInfo?.[key]}
                  title={title}
                  keyValue={key}
                  key={key}
                  openModal={openModal}
                />
              ))}
            </div>
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
