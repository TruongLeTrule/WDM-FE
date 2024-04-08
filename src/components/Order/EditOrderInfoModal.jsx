import { useState } from 'react';
import { useOrderContext } from '../../pages/Order';
import {
  editOrderLeft,
  editOrderRight,
  datePickArr,
} from '../../utils/orderRenderArr';
import { Modal, DatePick, TextInput } from '../';
import Wrapper from '../../assets/wrappers/Order/EditOrderInfoWrapper';
import TextRow from '../TextRow';

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

  const resolveComponent = (title, key, type) => {
    const value = orderInfo?.[key];
    if (type === 'text-input') {
      return (
        <TextInput
          key={key}
          keyValue={key}
          title={title}
          value={value}
          handleChange={handleChange}
        />
      );
    }
    return (
      <TextRow
        value={orderInfo?.[key]}
        title={title}
        keyValue={key}
        key={key}
      />
    );
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
            <div className="rows">
              {editOrderLeft.map(({ title, key, type }) =>
                resolveComponent(title, key, type)
              )}
              {datePickArr.map(({ title, key }) => (
                <DatePick
                  title={title}
                  key={key}
                  handleDateChange={handleDateChange}
                  keyValue={key}
                  value={orderInfo?.[key]}
                />
              ))}
            </div>
          </div>
          {/* Right col */}
          <div className="right-col">
            <h5>{orderInfo?.lobby}</h5>
            <p className="shift">{orderInfo?.shift}</p>
            <div className="rows">
              {editOrderRight.map(({ title, key, openModal }) => (
                <TextRow
                  value={orderInfo?.[key]}
                  title={title}
                  keyValue={key}
                  key={key}
                  openModal={openModal}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="btn-wrapper">
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
