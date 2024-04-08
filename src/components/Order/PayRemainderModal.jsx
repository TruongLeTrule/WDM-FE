import { useEffect, useState } from 'react';
import { useOrderContext } from '../../pages/Order';
import { payRemainderOverall } from '../../utils/orderRenderArr';
import { CheckBox, Modal, TextInput } from '../';
import TextRow from '../TextRow';
import Wrapper from '../../assets/wrappers/Order/PayRemainderWrapper';

const customStyle = {
  content: {
    width: '35vw',
    height: '75vh',
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
  const [payRemainder, setPayRemainder] = useState(0);

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

  const handleSubmitBtnClick = () => {
    setOrderInfo({
      ...orderInfo,
      paidDate: new Date(),
      status: 'paid',
    });
    setOrderModalState({
      ...orderModalState,
      payRemainder: false,
      bill: true,
    });
    console.log(payRemainder);
  };

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
            {payRemainderOverall.map(({ title, key }) => (
              <TextRow
                title={title}
                keyValue={key}
                key={key}
                value={orderInfo?.[key]}
              />
            ))}
          </div>
          {/* Payment block */}
          <div className="payment">
            <h5>pay remainder</h5>
            <TextInput
              keyValue="payRemainder"
              value={Number(payRemainder).toString()}
              handleChange={(e) => setPayRemainder(e.target.value)}
              type="number"
            />
          </div>
        </div>
        <div className="btn-wrapper">
          <button className="btn" onClick={handleSubmitBtnClick}>
            complete
          </button>
          <CheckBox
            title="penalty mode"
            type="checkbox"
            value="isPenaltyMode"
            currValue={orderInfo?.isPenaltyMode}
            handleChange={handleChange}
          />
        </div>
      </Wrapper>
    </Modal>
  );
};
export default PayRemainderModal;
