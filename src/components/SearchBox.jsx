import { useRef, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Wrapper from '../assets/wrappers/SearchBoxWrapper';

const SearchBox = ({ onChange }) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState();
  const handleFormClick = () => {
    inputRef.current.focus();
  };

  const handleInputChange = (e) => {
    onChange(e.target.value);
    setInputValue(e.target.value);
  }

  return (
    <Wrapper onClick={handleFormClick}>
      <form>
        <FaMagnifyingGlass className="icon" />
        <input
          ref={inputRef}
          type="text"
          placeholder="search"
          onChange={handleInputChange}
        />
      </form>
    </Wrapper>
  );
};
export default SearchBox;
