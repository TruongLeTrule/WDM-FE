import PickDateModal from './PickDateModal';
import PickLobTypeModal from './PickLobTypeModal';
import PickLobby from './PickLobbyModal';
import GetUserInfoModal from './GetUserInfoModal';
import { useOrderContext } from '../../pages/Order';

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
        <PickLobby
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
    </>
  );
};
export default CreateOrderModalContainer;
