import { useRef } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Wrapper from '../assets/wrappers/SearchBoxWrapper';

const SearchBox = () => {
  const inputRef = useRef(null);
  const handleFormClick = () => {
    inputRef.current.focus();
  };
  return (
    <Wrapper onClick={handleFormClick}>
      <FaMagnifyingGlass className="icon" />
      <input ref={inputRef} type="text" placeholder="search" />
    </Wrapper>
  );
};
export default SearchBox;
