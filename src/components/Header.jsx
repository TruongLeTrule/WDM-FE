import { FaFilter, FaPlus } from 'react-icons/fa6';
import Wrapper from '../assets/wrappers/HeaderWrapper';
import SearchBox from './SearchBox';
import { Icon } from '../assets/icon';

const Header = (p) => {
  const {
    handleAddBtnClick,
    headerTitle,
    isBack,
    handleBackBtn,
    handleSearch,
    action=true
  } = p
  return (
    <Wrapper>
      <div className="backBtn">
        {isBack && (
          <Icon.leffcirclefilled
            className="canClickIcon"
            onClick={handleBackBtn}
          />
        )}
      </div>
      <h1>{headerTitle}</h1>
      {action && <div className="right-container">
        <SearchBox handleSearch={handleSearch} />
        <button>
          <FaFilter className="icon" />
        </button>
        <button onClick={handleAddBtnClick}>
          <FaPlus className="icon" />
        </button>
      </div>}
    </Wrapper>
  );
};
export default Header;
