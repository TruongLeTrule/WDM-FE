import Wrapper from '../assets/wrappers/CheckBoxWrapper';

const CheckBox = ({ title, currValue, value, handleChange }) => {
  return (
    <Wrapper className="checkbox-wrapper">
      <input
        type="checkbox"
        id={value}
        name={value}
        checked={currValue}
        onChange={handleChange}
      />
      <label htmlFor={value} className={currValue ? 'checked' : ''}>
        {title}
      </label>
    </Wrapper>
  );
};
export default CheckBox;
