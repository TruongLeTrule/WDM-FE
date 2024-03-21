import { FaFilter, FaPlus } from 'react-icons/fa6';
import Wrapper from '../assets/wrappers/HeaderWrapper';
import SearchBox from './SearchBox';

const Header = () => {
  return (
    <Wrapper>
      <h1>Order</h1>
      <div className="right-container">
        <SearchBox />
        <button>
          <FaFilter className="icon" />
        </button>
        <button>
          <FaPlus className="icon" />
        </button>
      </div>
    </Wrapper>
  );
};
export default Header;
