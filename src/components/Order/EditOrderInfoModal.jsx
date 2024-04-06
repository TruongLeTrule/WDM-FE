import { useState } from 'react';
import { useOrderContext } from '../../pages/Order';
import { editOrderLeft, editOrderRight } from '../../utils/orderRows';
import Wrapper from '../../assets/wrappers/Order/EditOrderInfoWrapper';
import Modal from '../Modal';
import Rows from './Rows';

const customStyle = {
  content: {
    width: '45vw',
    height: '85vh',
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
  const { orderModalState, setOrderModalState, orderInfo } = useOrderContext();

  const [formState, setFormState] = useState(orderInfo);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (keyValue, newValue) => {
    setFormState({
      ...formState,
      [keyValue]: newValue.toLocaleDateString(),
    });
  };

  const handleSubmit = () => {
    console.log(formState);
  };

  return (
    <Modal
      isOpen={orderModalState?.edit}
      setModalClose={() =>
        setOrderModalState({ ...orderModalState, edit: false })
      }
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
            <Rows
              render={editOrderLeft}
              handleChange={handleChange}
              handleDateChange={handleDateChange}
            />
          </div>
          {/* Right col */}
          <div className="right-col">
            <h5>{orderInfo?.lobby}</h5>
            <p className="shift">{orderInfo?.shift}</p>
            <Rows render={editOrderRight} handleChange={handleChange} />
          </div>
        </div>
        <div className="btn-wrap">
          <button className="btn delete">delete</button>
          <button className="btn" onClick={handleSubmit}>
            save
          </button>
        </div>
      </Wrapper>
    </Modal>
  );
};
export default EditOrderInfoModal;
