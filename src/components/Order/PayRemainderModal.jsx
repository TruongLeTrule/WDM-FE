import { useEffect } from 'react';
import Modal from '../Modal';
import Wrapper from '../../assets/wrappers/Order/PayRemainderWrapper';
import { useOrderContext } from '../../pages/Order';
import qrCode from '../../assets/images/qr-code.png';
import {
  payRemainderOverall,
  payRemainderPayment,
} from '../../utils/orderRows';
import Rows from './Rows';
import Row from './Row';

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
    if (e.target.type === 'checkbox')
      return setOrderInfo({
        ...orderInfo,
        isPenaltyMode: !orderInfo.isPenaltyMode,
      });
    setOrderInfo({
      ...orderInfo,
      [e.target.name]: e.target.value,
    });
  };

  const calculateExtraFee = () => {
    const extraFee = 200;
    const occurDate = new Date(orderInfo?.occurDate);
    const today = new Date();
    occurDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if (orderInfo?.isPenaltyMode && today.getTime() > occurDate.getTime())
      return setOrderInfo({
        ...orderInfo,
        extraFee: extraFee,
        remainder: orderInfo.remainder + extraFee,
      });
    if (orderInfo.extraFee > 0)
      setOrderInfo({
        ...orderInfo,
        extraFee: 0,
        remainder: orderInfo.remainder - extraFee,
      });
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
            <Rows render={payRemainderOverall} />
          </div>
          {/* Payment block */}
          <div className="payment">
            <h5>payment method</h5>
            <Rows render={payRemainderPayment} handleChange={handleChange} />
            {orderInfo?.payMethod === 'bank' && (
              <img src={qrCode} alt="qr code" className="qr-code" />
            )}
          </div>
        </div>
        <div className="btn-wrap">
          <button className="btn">complete</button>
          <Row
            title="penalty mode"
            type="checkbox"
            value="isPenaltyMode"
            handleChange={handleChange}
          />
        </div>
      </Wrapper>
    </Modal>
  );
};
export default PayRemainderModal;
