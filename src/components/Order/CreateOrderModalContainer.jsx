import { useOrderContext } from '../../pages/Order';
import {
  PickDateModal,
  PickLobTypeModal,
  PickLobbyModal,
  GetUserInfoModal,
  PickFoodServiceModal,
  PaymentModal,
  ReviewModal,
  SuccessModal,
} from './';

const CreateOrderModalContainer = () => {
  const {
    createOrderModalState,
    setCreateOrderModalState,
    newOrder,
    setNewOrder,
  } = useOrderContext();

  const setModalState = (
    currModal,
    currModalState,
    nextModal,
    nextModalState
  ) => {
    setCreateOrderModalState({
      ...createOrderModalState,
      [currModal]: currModalState,
      [nextModal]: nextModalState,
    });
  };

  const handleSubmit = () => {
    console.log('fetch api');
  };

  return (
    <>
      {createOrderModalState?.pickDate && (
        <PickDateModal
          isOpen={createOrderModalState?.pickDate}
          setModalClose={() => setModalState('pickDate', false)}
          setValue={(newValue) => setNewOrder({ occurDate: newValue })}
          setNextModalOpen={() =>
            setModalState('pickDate', false, 'lobType', true)
          }
        />
      )}
      {createOrderModalState?.lobType && (
        <PickLobTypeModal
          isOpen={createOrderModalState?.lobType}
          setModalClose={() => setModalState('lobType', false)}
          setValue={(value) => setNewOrder({ ...newOrder, lobType: value })}
          setNextModalOpen={() =>
            setModalState('lobType', false, 'lobby', true)
          }
        />
      )}
      {createOrderModalState?.lobby && (
        <PickLobbyModal
          isOpen={createOrderModalState?.lobby}
          setModalClose={() => setModalState('lobby', false)}
          setLobValue={(value) => setNewOrder({ ...newOrder, lobby: value })}
          setShiftValue={(value) => setNewOrder({ ...newOrder, shift: value })}
          setNextModalOpen={() =>
            setModalState('lobby', false, 'userInfo', true)
          }
        />
      )}
      {createOrderModalState?.userInfo && (
        <GetUserInfoModal
          isOpen={createOrderModalState?.userInfo}
          setModalClose={() => setModalState('userInfo', false)}
          setUserInfoValue={(value) => setNewOrder({ ...newOrder, ...value })}
          setNextModalOpen={() =>
            setModalState('userInfo', false, 'food', true)
          }
        />
      )}
      {createOrderModalState?.food && (
        <PickFoodServiceModal
          type="food"
          isOpen={createOrderModalState?.food}
          setModalClose={() => setModalState('food', false)}
          setValue={(value) => setNewOrder({ ...newOrder, food: value })}
          setNextModalOpen={() => setModalState('food', false, 'service', true)}
        />
      )}
      {createOrderModalState?.service && (
        <PickFoodServiceModal
          type="service"
          isOpen={createOrderModalState?.service}
          setModalClose={() => setModalState('service', false)}
          setValue={(value) => setNewOrder({ ...newOrder, service: value })}
          setNextModalOpen={() =>
            setModalState('service', false, 'payment', true)
          }
        />
      )}
      {createOrderModalState?.payment && (
        <PaymentModal
          isOpen={createOrderModalState?.payment}
          setModalClose={() => setModalState('payment', false)}
          setPaymentValue={(value) => setNewOrder({ ...newOrder, ...value })}
          setNextModalOpen={() =>
            setModalState('payment', false, 'review', true)
          }
        />
      )}
      {createOrderModalState?.review && (
        <ReviewModal
          isOpen={createOrderModalState?.review}
          setModalClose={() => setModalState('review', false)}
          handleSubmit={handleSubmit}
          setNextModalOpen={() =>
            setModalState('review', false, 'success', true)
          }
        />
      )}
      {createOrderModalState?.success && (
        <SuccessModal
          isOpen={createOrderModalState?.success}
          setModalClose={() => setModalState('success', false)}
          setNextModalOpen={() => setModalState('success', false)}
        />
      )}
    </>
  );
};
export default CreateOrderModalContainer;
