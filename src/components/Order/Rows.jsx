import Row from './Row';
import { useOrderContext } from '../../pages/Order';

const Rows = ({ render, handleChange }) => {
  const { orderInfo } = useOrderContext();
  return (
    <div className="rows">
      {render.map(({ title, key, type, link, optionValue }) => (
        <Row
          title={title}
          value={optionValue ? optionValue : orderInfo?.[key]}
          type={type}
          keyValue={key}
          link={link}
          handleChange={handleChange}
          key={optionValue ? optionValue : key}
        />
      ))}
    </div>
  );
};
export default Rows;
