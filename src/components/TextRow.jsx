import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import resolveCurrency from '../utils/resolveCurrency';
import { useOrderContext } from '../pages/Order';
import Wrapper from '../assets/wrappers/TextRowWrapper';

const TextRow = ({ title, keyValue, value, openModal, type }) => {
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

  if (type === 'date') {
    const date = new Date(value);
    return (
      <Wrapper className="text-row">
        <span className="title">{title}</span>
        <span>{date.toLocaleDateString()}</span>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="text-row">
      <span className={`title  ${resolveClass()}`}>{title}</span>
      <span className={resolveClass()}>
        {typeof value === 'number' ? value.toFixed(1) : value}
        {resolveCurrency(keyValue)}
      </span>
    </Wrapper>
  );
};

export default TextRow;
