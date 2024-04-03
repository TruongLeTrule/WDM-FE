import { useEffect, useState } from 'react';
import Modal from '../Modal';
import Wrapper from '../../assets/wrappers/Order/PayRemainderWrapper';
import { useOrderContext } from '../../pages/Order';
import qrCode from '../../assets/images/qr-code.png';

const customStyle = {
  content: {
    width: '35vw',
    height: '83vh',
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

const PayRemainderModal = () => {
  const { payRemainderModalOpen, setPayRemainderModalOpen, orderInfo } =
    useOrderContext();

  const [payMethod, setPayMethod] = useState('cash');
  const [isPenaltyMode, setIsPenaltyMode] = useState(false);
  const [extraFee, setExtraFee] = useState(0);
  const [remainder, setRemainder] = useState(0);

  const onOptionChange = (e) => {
    setPayMethod(e.target.value);
  };

  const onCheckBoxChange = () => {
    setIsPenaltyMode(!isPenaltyMode);
  };

  const calculateExtraFee = () => {
    const occurDate = new Date(orderInfo?.occurDate);
    const today = new Date();
    occurDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if (isPenaltyMode && today.getTime() > occurDate.getTime()) {
      setExtraFee(200);
    } else {
      setExtraFee(0);
    }
  };

  useEffect(() => {
    setExtraFee(orderInfo?.extraFee);
    setRemainder(orderInfo?.total - orderInfo?.deposit + orderInfo?.extraFee);
  }, [orderInfo]);

  useEffect(() => {
    calculateExtraFee();
  }, [isPenaltyMode]);

  useEffect(() => {
    setRemainder(orderInfo?.total - orderInfo?.deposit + extraFee);
  }, [extraFee]);

  return (
    <Modal
      isOpen={payRemainderModalOpen}
      setIsOpen={setPayRemainderModalOpen}
      customStyle={customStyle}
    >
      <Wrapper>
        <h4>payment</h4>
        <p>{orderInfo?.id}</p>
        <div className="container">
          {/* Overall block */}
          <div className="overall">
            <h5>overall</h5>
            <div className="row">
              <span>total table</span>
              <span>{orderInfo?.totalTable}</span>
            </div>
            <div className="row">
              <span>price/table</span>
              <span>{orderInfo?.pricePerTable}$</span>
            </div>
            <div className="row">
              <span>service fee</span>
              <span>{orderInfo?.serviceFee}$</span>
            </div>
            <div className="row">
              <span>total</span>
              <span>{orderInfo?.total}$</span>
            </div>
            <div className="row">
              <span>deposit</span>
              <span>{orderInfo?.deposit}$</span>
            </div>
            <div className="row">
              <span className={extraFee > 0 ? 'red' : ''}>extra fee</span>
              <span className={extraFee > 0 ? 'red' : ''}>{extraFee}$</span>
            </div>
            <div className="row">
              <strong>remainder</strong>
              <strong>{remainder}$</strong>
            </div>
          </div>
          {/* Payment block */}
          <div className="payment">
            <h5>payment method</h5>
            <form>
              <div className="row">
                <input
                  type="radio"
                  name="method"
                  id="cash"
                  value="cash"
                  checked={payMethod === 'cash'}
                  onChange={onOptionChange}
                />
                <label htmlFor="cash">cash</label>
              </div>
              <div className="row">
                <input
                  type="radio"
                  name="method"
                  id="bank"
                  value="bank"
                  checked={payMethod === 'bank'}
                  onChange={onOptionChange}
                />
                <label htmlFor="bank">internet banking</label>
              </div>
              {payMethod === 'bank' && (
                <img src={qrCode} alt="qr code" className="qr-code" />
              )}
            </form>
          </div>
        </div>
        <div className="btn-wrap">
          <button className="btn">complete</button>
          <form className="row">
            <input
              type="checkbox"
              id="penalty-mode"
              name="isPenaltyMode"
              checked={isPenaltyMode}
              onChange={onCheckBoxChange}
            />
            <label
              htmlFor="penalty-mode"
              className={isPenaltyMode ? 'checked' : ''}
            >
              penalty mode
            </label>
          </form>
        </div>
      </Wrapper>
    </Modal>
  );
};
export default PayRemainderModal;
