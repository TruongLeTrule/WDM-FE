import Wrapper from '../assets/wrappers/TextInputWrapper';

const TextInput = ({ keyValue, title, value, handleChange, type }) => {
  const preventDefault = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <Wrapper className="text-input-wrapper">
      <label className="title" htmlFor={keyValue}>
        {title}
      </label>
      <input
        type="text"
        name={keyValue}
        id={keyValue}
        value={value}
        onChange={handleChange}
        onKeyDown={type === 'number' ? (e) => preventDefault(e) : null}
      />
    </Wrapper>
  );
};
export default TextInput;
