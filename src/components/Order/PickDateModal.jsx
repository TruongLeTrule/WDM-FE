import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Modal from '../Modal';

const customStyle = {
  content: {
    width: '25vw',
    height: '43vh',
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

const PickDateModal = ({
  isOpen,
  setModalClose,
  setValue,
  setNextModalOpen,
}) => {
  const handleOnChange = (newValue) => {
    setValue(newValue.toDate());
    setNextModalOpen();
  };

  return (
    <Modal
      isOpen={isOpen}
      setModalClose={setModalClose}
      customStyle={customStyle}
    >
      <DateCalendar
        onChange={(newValue) => handleOnChange(newValue)}
        label="Choose day"
      />
    </Modal>
  );
};
export default PickDateModal;
