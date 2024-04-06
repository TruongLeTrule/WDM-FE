import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import resolveCurrency from '../../utils/resolveCurrency';
import { useOrderContext } from '../../pages/Order';

const Row = ({
  title,
  keyValue,
  value,
  type,
  openModal,
  handleChange,
  handleDateChange,
}) => {
  const { orderInfo, setOrderModalState } = useOrderContext();

  const resolveClass = () => {
    switch (keyValue) {
      case 'remainder':
        return 'strong';
      case 'extraFee':
        return value > 0 ? 'red' : '';
      default:
        return;
    }
  };

  if (type === 'input') {
    return (
      <div className="row">
        <label className="title" htmlFor={keyValue}>
          {title}
        </label>
        <input
          type="text"
          name={keyValue}
          id={keyValue}
          defaultValue={value}
          onChange={handleChange}
        />
      </div>
    );
  }

  if (type === 'radio') {
    return (
      <div className="row">
        <input
          type="radio"
          name={keyValue}
          id={value}
          value={value}
          checked={orderInfo?.payMethod === value}
          onChange={handleChange}
        />
        <label htmlFor={value}>{title}</label>
      </div>
    );
  }

  if (type === 'checkbox') {
    return (
      <div className="row">
        <input
          type="checkbox"
          id={value}
          name={value}
          checked={orderInfo?.isPenaltyMode}
          onChange={handleChange}
        />
        <label
          htmlFor={value}
          className={orderInfo?.isPenaltyMode ? 'checked' : ''}
        >
          {title}
        </label>
      </div>
    );
  }

  if (type === 'date') {
    return (
      <div className="date-wrap">
        <span className="title">{title}</span>
        <DatePicker
          value={dayjs(value)}
          onChange={(newValue) => handleDateChange(keyValue, newValue.toDate())}
        />
      </div>
    );
  }

  if (openModal) {
    return (
      <div className="row space-between">
        <span className="title">{title}</span>
        <div
          onClick={() =>
            setOrderModalState((prev) => ({ ...prev, [openModal]: true }))
          }
          className="link"
        >
          {value}
          {resolveCurrency(keyValue)}
          <FaArrowUpRightFromSquare />
        </div>
      </div>
    );
  }

  return (
    <div className="row space-between">
      <span className={`title  ${resolveClass()}`}>{title}</span>
      <span className={resolveClass()}>
        {value}
        {resolveCurrency(keyValue)}
      </span>
    </div>
  );
};

export default Row;
