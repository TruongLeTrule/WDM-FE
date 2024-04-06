import PickDateModal from './PickDateModal';
import LobTypeModal from './LobTypeModal';
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
        <LobTypeModal
          isOpen={createOrderModalState?.lobType}
          setModalClose={() => setModalState('lobType', false)}
        />
      )}
    </>
  );
};
export default CreateOrderModalContainer;
