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
  const { orderModalState, setOrderModalState, orderInfo, setOrderInfo } =
    useOrderContext();

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      return setOrderInfo({
        ...orderInfo,
        isPenaltyMode: !orderInfo.isPenaltyMode,
      });
    }
    setOrderInfo({
      ...orderInfo,
      [e.target.name]: e.target.value,
    });
  };

  const calculateExtraFee = () => {
    const occurDate = new Date(orderInfo?.occurDate);
    const today = new Date();
    occurDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if (orderInfo?.isPenaltyMode && today.getTime() > occurDate.getTime()) {
      return setOrderInfo({ ...orderInfo, extraFee: 200 });
    }
    setOrderInfo({ ...orderInfo, extraFee: 0 });
  };

  useEffect(() => {
    calculateExtraFee();
  }, [orderInfo?.isPenaltyMode]);

  return (
    <Modal
      isOpen={orderModalState?.payRemainder}
      setModalClose={() =>
        setOrderModalState({
          ...orderModalState,
          payRemainder: false,
        })
      }
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
              <span className={orderInfo?.extraFee > 0 ? 'red' : ''}>
                extra fee
              </span>
              <span className={orderInfo?.extraFee > 0 ? 'red' : ''}>
                {orderInfo?.extraFee}$
              </span>
            </div>
            <div className="row">
              <strong>remainder</strong>
              <strong>{orderInfo?.remainder}$</strong>
            </div>
          </div>
          {/* Payment block */}
          <div className="payment">
            <h5>payment method</h5>
            <form>
              <div className="row">
                <input
                  type="radio"
                  name="payMethod"
                  id="cash"
                  value="cash"
                  checked={orderInfo?.payMethod === 'cash'}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="cash">cash</label>
              </div>
              <div className="row">
                <input
                  type="radio"
                  name="payMethod"
                  id="bank"
                  value="bank"
                  checked={orderInfo?.payMethod === 'bank'}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="bank">internet banking</label>
              </div>
              {orderInfo?.payMethod === 'bank' && (
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
              checked={orderInfo?.isPenaltyMode}
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="penalty-mode"
              className={orderInfo?.isPenaltyMode ? 'checked' : ''}
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
