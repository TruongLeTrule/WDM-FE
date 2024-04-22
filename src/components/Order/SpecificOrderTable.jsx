import { useOrderContext } from '../../pages/Order';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import resolveDate from '../../utils/resolveDate';
import resolveCurrency from '../../utils/resolveCurrency';
import Wrapper from '../../assets/wrappers/Order/SpecificOrderTableWrapper';

const SpecificOrderTable = ({ data }) => {
  const { orderInfo, setOrderModalState } = useOrderContext();

  const resolveClass = (key, openModal) => {
    if (key === 'extra_fee') return orderInfo['extra_fee'] > 0 && 'red';
    if (openModal) return 'open-modal';
  };

  const setSpecificModalOpen = (openModal) => {
    setOrderModalState((prev) => ({ ...prev, [openModal]: true }));
  };

  return (
    <Wrapper>
      <div className="table">
        {data.map(({ title, key, type, openModal }, index) => (
          <div className="row" key={index}>
            <div className={`cell ${resolveClass(key)}`}>{index + 1}</div>
            <div className={`cell ${resolveClass(key)}`}>{title}</div>
            <div
              className={`cell ${resolveClass(key, openModal)}`}
              onClick={() => openModal && setSpecificModalOpen(openModal)}
            >
              {type === 'date' ? resolveDate(orderInfo[key]) : orderInfo[key]}
              {resolveCurrency(key)}
              {openModal && <FaArrowUpRightFromSquare />}
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};
export default SpecificOrderTable;
