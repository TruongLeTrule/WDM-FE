import { useState } from 'react';
import { useOrderContext } from '../../pages/Order';
import { paymentOverall, paymentOption } from '../../utils/orderRenderArr';
import Modal from '../Modal';
import { TextRow, TextInput, Radio } from '../';
import Wrapper from '../../assets/wrappers/Order/PaymentWrapper';

const customStyle = {
  content: {
    width: '30vw',
    height: '70vh',
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

const PaymentModal = ({
  isOpen,
  setModalClose,
  setValue,
  setNextModalOpen,
}) => {
  const { newOrder } = useOrderContext();
  const [payValue, setPayValue] = useState(0);
  const [payOption, setPayOption] = useState('deposit');

  const handleNextBtnClick = () => {
    setNextModalOpen();
  };

  const total =
    newOrder?.totalTable * newOrder?.pricePerTable + newOrder?.serviceFee;

  return (
    <Modal
      isOpen={isOpen}
      setModalClose={setModalClose}
      customStyle={customStyle}
    >
      <Wrapper>
        <h4>payment</h4>
        <div className="container">
          {/* Overall block */}
          <div className="overall">
            <h5>overall</h5>
            {paymentOverall.map(({ title, key }) => (
              <TextRow
                title={title}
                keyValue={key}
                key={key}
                value={newOrder?.[key]}
              />
            ))}
            <TextRow title="total" value={total} keyValue={'remainder'} />
          </div>
          {/* Payment block */}
          <div className="payment">
            <h5>payment option</h5>
            {paymentOption.map(({ key, value, title }) => (
              <Radio
                title={title}
                keyValue={key}
                value={value}
                handleChange={() => setPayOption(value)}
                currValue={payOption}
              />
            ))}
            <h5>pay remainder</h5>
            <TextInput
              keyValue="payRemainder"
              value={Number(payValue).toString()}
              handleChange={(e) => setPayValue(e.target.value)}
              type="number"
            />
          </div>
        </div>
        <button className="btn" onClick={handleNextBtnClick}>
          next: review
        </button>
      </Wrapper>
    </Modal>
  );
};
export default PaymentModal;
