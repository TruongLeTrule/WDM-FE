import { useEffect, useState } from 'react';
import { useOrderContext } from '../../pages/Order';
import { TextRow, TextInput, Radio } from '../';
import { depositOrder, fullPayOrder } from '../../api/wedding.api';
import { paymentOverall, paymentOption } from '../../utils/orderRenderArr';
import Modal from '../Modal';
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

const PaymentModal = ({ isOpen, setModalClose, setNextModalOpen }) => {
  const { newOrder, setNewOrder } = useOrderContext();
  const [payValue, setPayValue] = useState();
  const [payOption, setPayOption] = useState('deposit');

  const handleOptionChange = (value) => {
    setPayOption(value);
    setPayValue(
      value === 'deposit' ? newOrder.requiredDeposit : newOrder.total
    );
  };

  const handleNextBtnClick = async () => {
    const intPayValue = Number(payValue);
    let result;
    try {
      if (payOption === 'deposit')
        result = await depositOrder(newOrder.id, intPayValue);
      if (payOption === 'full')
        result = await fullPayOrder(newOrder.id, intPayValue);
      if (result.data.msg) throw new Error(result.data.msg);
      setNewOrder({
        ...result.data,
        ...result.data.weddingData,
        phone: newOrder.phone,
        lobby_name: newOrder.lobby_name,
      });
      setNextModalOpen();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const requiredDeposit =
      (Number(newOrder.deposit_percent) / 100) * Number(newOrder.total);
    setNewOrder({
      ...newOrder,
      requiredDeposit,
    });
    setPayValue(requiredDeposit);
  }, []);

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
            <TextRow
              title="total"
              value={newOrder.total}
              keyValue={'remainder'}
            />
          </div>
          {/* Payment block */}
          <div className="payment">
            <h5>payment option</h5>
            {paymentOption.map(({ key, value, title }) => (
              <Radio
                key={value}
                title={title}
                keyValue={key}
                value={value}
                handleChange={() => handleOptionChange(value)}
                currValue={payOption}
              />
            ))}
            <h5>pay remainder</h5>
            <TextInput
              keyValue="payRemainder"
              value={Number(payValue).toString()}
              handleChange={(e) => setPayValue(e.target.value)}
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
