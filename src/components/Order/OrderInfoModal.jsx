import { FaArrowUpRightFromSquare, FaPenToSquare } from 'react-icons/fa6';
import Wrapper from '../../assets/wrappers/Order/OrderInfoWrapper';
import { useOrderContext } from '../../pages/Order';
import Modal from '../Modal';

const OrderInfoModal = () => {
  const {
    orderInfo,
    infoModalOpen,
    setInfoModalOpen,
    setEditOrderModalOpen,
    setPayRemainderModalOpen,
  } = useOrderContext();

  const handlePayBtnClick = () => {
    setPayRemainderModalOpen(true);
    setInfoModalOpen(false);
  };

  return (
    <Modal isOpen={infoModalOpen} setIsOpen={setInfoModalOpen}>
      <Wrapper>
        <div className="header">
          <h4>order {orderInfo?.id}</h4>
          <FaPenToSquare
            className="icon"
            onClick={() => setEditOrderModalOpen(true)}
          />
        </div>
        <div className="container">
          {/* Left col */}
          <div>
            <h5>Customer information</h5>
            <div className="rows">
              <div className="row">
                <span className="title">groom</span>
                <span>{orderInfo?.groom}</span>
              </div>
              <div className="row">
                <span className="title">bride</span>
                <span>{orderInfo?.bride}</span>
              </div>
              <div className="row">
                <span className="title">phone</span>
                <span>{orderInfo?.phone}</span>
              </div>
              <div className="row">
                <span className="title">order date</span>
                <span>{orderInfo?.orderDate}</span>
              </div>
              <div className="row">
                <span className="title">occur date</span>
                <span>{orderInfo?.occurDate}</span>
              </div>
            </div>
          </div>
          {/* Right col */}
          <div>
            <h5>{orderInfo?.lobby}</h5>
            <p className="shift">{orderInfo?.shift}</p>
            <div className="rows">
              <div className="row">
                <span className="title">total table</span>
                <span>{orderInfo?.totalTable}</span>
              </div>
              <div className="row">
                <span className="title">price/table</span>
                <span className="link">
                  {orderInfo?.pricePerTable}$ <FaArrowUpRightFromSquare />
                </span>
              </div>
              <div className="row">
                <span className="title">service fee</span>
                <span className="link">
                  {orderInfo?.serviceFee}$ <FaArrowUpRightFromSquare />
                </span>
              </div>
              <div className="row">
                <span className="title">total</span>
                <strong>{orderInfo?.total}$</strong>
              </div>
              <div className="row">
                <span className="title">deposit</span>
                <strong>{orderInfo?.deposit}$</strong>
              </div>
              <div className="row">
                <span className="title">remainder</span>
                <strong>{orderInfo?.total - orderInfo?.deposit}$</strong>
              </div>
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
