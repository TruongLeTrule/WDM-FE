import { TextInput } from '../';
import { useForm } from 'react-hook-form';
import { createWedding } from '../../api/wedding.api';
import { getUserInfo } from '../../utils/orderRenderArr';
import Modal from '../Modal';
import Wrapper from '../../assets/wrappers/Order/GetUserInfoWrapper';
import { useOrderContext } from '../../pages/Order';

const customStyle = {
  content: {
    width: '25vw',
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

const GetUserInfoModal = ({ isOpen, setModalClose, setNextModalOpen }) => {
  const { newOrder, setNewOrder } = useOrderContext();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleNextBtnClick = handleSubmit(async (formResult) => {
    try {
      const tableCount = Number(formResult.table_count);
      delete newOrder['lob_type_id'];
      const { data } = await createWedding({
        ...formResult,
        ...newOrder,
        table_count: tableCount,
      });
      setNewOrder({ ...newOrder, id: data.id });
      setNextModalOpen();
    } catch (error) {
      alert(error.message);
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      setModalClose={setModalClose}
      customStyle={customStyle}
    >
      <Wrapper>
        <h4>user information</h4>
        <form className="rows">
          {getUserInfo.map(({ key, title, type }) => (
            <TextInput
              key={key}
              title={title}
              keyValue={key}
              type={type}
              register={register(key, {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              })}
              error={errors?.[key]}
            />
          ))}
        </form>
        <button className="btn" onClick={handleNextBtnClick}>
          next: choose food
        </button>
      </Wrapper>
    </Modal>
  );
};
export default GetUserInfoModal;
