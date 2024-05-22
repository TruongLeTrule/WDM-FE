import { useOrderContext } from '../../pages/Order';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import resolveDate from '../../utils/resolveDate';
import resolveCurrency from '../../utils/resolveCurrency';
import Wrapper from '../../assets/wrappers/Order/SpecificOrderTableWrapper';

const SpecificOrderTable = (p) => {
  const { orderData } = p

  return (
    <Wrapper>
      <table className="table">
        {Object.keys(orderData).map((key, index) => (
          <tr className="row" key={index}>
            <td className={`cell`}>{index + 1}</td>
            <td className={`cell`}>{key}</td>
            <td className={`cell`}>{orderData[key]}</td>
          </tr>
        ))}
      </table>
    </Wrapper>
  );
};
export default SpecificOrderTable;
