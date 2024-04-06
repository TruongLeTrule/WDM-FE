import Row from './Row';
import { useOrderContext } from '../../pages/Order';

const Rows = ({ render, handleChange, handleDateChange }) => {
  const { orderInfo } = useOrderContext();
  return (
    <div className="rows">
      {render.map(({ title, key, type, link, optionValue, openModal }) => (
        <Row
          title={title}
          value={optionValue ? optionValue : orderInfo?.[key]}
          type={type}
          keyValue={key}
          link={link}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          openModal={openModal}
          key={optionValue ? optionValue : key}
        />
      ))}
    </div>
  );
};
export default Rows;
