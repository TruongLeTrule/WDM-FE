import styled from 'styled-components';

const Wrapper = styled.form`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 999px;
  background-color: var(--grey-100);
  .icon {
    color: var(--grey-300);
    margin: 0 0.5rem;
  }
  input {
    text-transform: capitalize;
  }
  input::placeholder {
    color: var(--grey-400);
    font-weight: 500;
  }
`;

export default Wrapper;
