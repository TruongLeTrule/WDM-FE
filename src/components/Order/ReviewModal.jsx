import { TextRow } from '../';
import { orderInfoLeft, orderInfoRight } from '../../utils/orderRenderArr';
import { orderList } from '../../utils/orderTestData';
import Modal from '../Modal';
import Wrapper from '../../assets/wrappers/Order/ReviewWrapper';

const newOrder = orderList[0];

const ReviewModal = ({ isOpen, setModalClose, setNextModalOpen }) => {
  const handleNextBtnClick = () => {
    setNextModalOpen();
  };

  return (
    <Modal isOpen={isOpen} setModalClose={setModalClose}>
      <Wrapper>
        <h4>review</h4>
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
                  value={newOrder?.[key]}
                />
              ))}
            </div>
          </div>
          {/* Right col */}
          <div>
            <h5>{newOrder?.lobby}</h5>
            <p className="shift">{newOrder?.shift}</p>
            <div className="rows">
              {orderInfoRight.map(({ title, key, openModal }) => (
                <TextRow
                  value={newOrder?.[key]}
                  title={title}
                  keyValue={key}
                  key={key}
                  openModal={openModal}
                />
              ))}
            </div>
          </div>
        </div>
        <button className="btn" onClick={handleNextBtnClick}>
          complete
        </button>
      </Wrapper>
    </Modal>
  );
};
export default ReviewModal;
