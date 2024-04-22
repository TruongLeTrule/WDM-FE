import { FaFilter, FaPlus } from 'react-icons/fa6';
import Wrapper from '../assets/wrappers/HeaderWrapper';
import SearchBox from './SearchBox';
import { Icon } from '../assets/icon';

const Header = ({ handleAddBtnClick, headerTitle, isBack, handleBackBtn }) => {
  return (
    <Wrapper>
      <div className='backBtn'>
        {
          isBack ?
            <Icon.leffcirclefilled
              className='canClickIcon'
              onClick={handleBackBtn}
            />
            : <Icon.leftcircleoutlined />
        }
      </div>
      <h1>{headerTitle}</h1>
      <div className="right-container">
        <SearchBox />
        <button>
          <FaFilter className="icon" />
        </button>
        <button onClick={handleAddBtnClick}>
          <FaPlus className="icon" />
        </button>
      </div>
    </Wrapper>
  );
};
export default Header;
