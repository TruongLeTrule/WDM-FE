import Wrapper from '../assets/wrappers/TextInputWrapper';

const TextInput = ({
  keyValue,
  title,
  value,
  handleChange,
  type,
  register,
  error,
}) => {
  const preventDefault = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };

  return (
    <Wrapper className="text-input-wrapper">
      {title && <label htmlFor={keyValue}>{title}</label>}
      <input
        type="text"
        name={keyValue}
        id={keyValue}
        value={value}
        onChange={handleChange}
        onKeyDown={type === 'number' ? (e) => preventDefault(e) : null}
        {...register}
      />
      {error && <span className="text-danger">{error.message}</span>}
    </Wrapper>
  );
};
export default TextInput;
