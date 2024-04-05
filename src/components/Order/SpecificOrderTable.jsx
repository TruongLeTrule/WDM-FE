import { useOrderContext } from '../../pages/Order';
import Wrapper from '../../assets/wrappers/Order/SpecificOrderTableWrapper';

const SpecificOrderTable = ({ data }) => {
  const { orderInfo } = useOrderContext();

  const resolveClass = (key) => {
    if (key === 'extraFee') return orderInfo[key] > 0 && 'red';
  };

  return (
    <Wrapper>
      <div className="table">
        {data.map(({ title, key }, index) => (
          <div className="row" key={index}>
            <div className={`cell ${resolveClass()}`}>{index + 1}</div>
            <div className={`cell ${resolveClass()}`}>{title}</div>
            <div className={`cell ${resolveClass()}`}>{orderInfo[key]}</div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};
export default SpecificOrderTable;
