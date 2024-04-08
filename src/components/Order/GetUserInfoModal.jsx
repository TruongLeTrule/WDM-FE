import { useState } from 'react';
import { getUserInfo } from '../../utils/orderRenderArr';
import { TextInput } from '../';
import Modal from '../Modal';
import Wrapper from '../../assets/wrappers/Order/GetUserInfoWrapper';

const customStyle = {
  content: {
    width: '25vw',
    height: '60vh',
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

const GetUserInfoModal = ({
  isOpen,
  setModalClose,
  setUserInfoValue,
  setNextModalOpen,
}) => {
  const [formState, setFormState] = useState({
    groom: '',
    bride: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextBtnClick = () => {
    setUserInfoValue(formState);
    setNextModalOpen();
  };

  return (
    <Modal
      isOpen={isOpen}
      setModalClose={setModalClose}
      customStyle={customStyle}
    >
      <Wrapper>
        <h4>user information</h4>
        <div className="rows">
          {getUserInfo.map(({ key, title }) => (
            <TextInput
              key={key}
              title={title}
              keyValue={key}
              handleChange={handleChange}
            />
          ))}
        </div>
        <button className="btn" onClick={handleNextBtnClick}>
          next: choose food
        </button>
      </Wrapper>
    </Modal>
  );
};
export default GetUserInfoModal;
