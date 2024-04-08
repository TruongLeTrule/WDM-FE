import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import resolveCurrency from '../utils/resolveCurrency';
import { useOrderContext } from '../pages/Order';
import Wrapper from '../assets/wrappers/TextRowWrapper';

const TextRow = ({ title, keyValue, value, openModal }) => {
  const { setOrderModalState } = useOrderContext();

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

  if (openModal) {
    return (
      <Wrapper className="text-row">
        <span className="title">{title}</span>
        <div
          onClick={() =>
            setOrderModalState((prev) => ({ ...prev, [openModal]: true }))
          }
          className="open-modal"
        >
          {value}
          {resolveCurrency(keyValue)}
          <FaArrowUpRightFromSquare />
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="text-row">
      <span className={`title  ${resolveClass()}`}>{title}</span>
      <span className={resolveClass()}>
        {value}
        {resolveCurrency(keyValue)}
      </span>
    </Wrapper>
  );
};

export default TextRow;
