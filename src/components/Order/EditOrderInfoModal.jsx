import { FaRegCalendar } from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import Wrapper from '../../assets/wrappers/Order/EditOrderInfoWrapper';
import { useOrderContext } from '../../pages/Order';
import Modal from '../Modal';

const customStyle = {
  content: {
    width: '45vw',
    height: '75vh',
    left: '50%',
    top: '50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,.1)',
  },
};

const EditOrderInfoModal = () => {
  const { editOrderModalOpen, setEditOrderModalOpen, orderInfo } =
    useOrderContext();

  return (
    <Modal
      isOpen={editOrderModalOpen}
      setIsOpen={setEditOrderModalOpen}
      customStyle={customStyle}
    >
      <Wrapper>
        <div className="header">
          <h4>edit order {orderInfo?.id}</h4>
        </div>
        <div className="container">
          {/* Left col */}
          <div>
            <h5>Customer information</h5>
            <form className="rows">
              <div className="row">
                <label className="title" htmlFor="groom">
                  groom
                </label>
                <input
                  type="text"
                  name="groom"
                  id="groom"
                  defaultValue={orderInfo?.groom}
                />
              </div>
              <div className="row">
                <label className="title" htmlFor="bride">
                  bride
                </label>
                <input
                  type="text"
                  name="bride"
                  id="bride"
                  defaultValue={orderInfo?.bride}
                />
              </div>
              <div className="row">
                <label className="title" htmlFor="phone">
                  phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  defaultValue={orderInfo?.phone}
                />
              </div>
              <div className="row">
                <span className="title">order date</span>
                <span className="calendar-wrap">
                  {orderInfo?.orderDate} <FaRegCalendar className="icon" />
                </span>
              </div>
              <div className="row">
                <span className="title">occur date</span>
                <span className="calendar-wrap">
                  {orderInfo?.occurDate} <FaRegCalendar className="icon" />
                </span>
              </div>
            </form>
          </div>
          {/* Right col */}
          <div className="right-col">
            <h5>{orderInfo?.lobby}</h5>
            <p className="shift">{orderInfo?.shift}</p>
            <div className="rows">
              <div className="row">
                <label className="title" htmlFor="totalTable">
                  total table
                </label>
                <input
                  type="text"
                  name="totalTable"
                  id="totalTable"
                  defaultValue={orderInfo?.totalTable}
                />
              </div>
              <div className="row space-between">
                <span className="title">price/table</span>
                <span className="link">
                  {orderInfo?.pricePerTable}$ <FaArrowUpRightFromSquare />
                </span>
              </div>
              <div className="row space-between">
                <span className="title">service fee</span>
                <span className="link">
                  {orderInfo?.serviceFee}$ <FaArrowUpRightFromSquare />
                </span>
              </div>
              <div className="row space-between">
                <span className="title">total</span>
                <strong>{orderInfo?.total}$</strong>
              </div>
              <div className="row space-between">
                <span className="title">deposit</span>
                <strong>{orderInfo?.deposit}$</strong>
              </div>
              <div className="row space-between">
                <span className="title">remainder</span>
                <strong>{orderInfo?.total - orderInfo?.deposit}$</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-wrap">
          <button className="btn delete">delete</button>
          <button className="btn">save</button>
        </div>
      </Wrapper>
    </Modal>
  );
};
export default EditOrderInfoModal;
