import styled from 'styled-components';

const Wrapper = styled.header`
  height: var(--header-height);
  padding: 0 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--white);
  border-bottom: 1px solid var(--grey-200);
  h1 {
    font-size: 2em;
    font-weight: 700;
  }
  .right-container {
    display: flex;
    align-items: center;
    column-gap: 2rem;
  }
  button {
    background-color: var(--grey-100);
    width: 3rem;
    height: 3rem;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .icon {
      font-size: 1.3em;
    }
  }
`;
export default Wrapper;
