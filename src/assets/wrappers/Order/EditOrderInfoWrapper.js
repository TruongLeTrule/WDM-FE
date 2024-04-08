import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 3rem;
  text-transform: capitalize;
  h4 {
    text-align: center;
    margin-top: 3rem;
    font-weight: 700;
  }
  .container {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  h5 {
    font-weight: 600;
    font-size: 1.4em;
  }
  .shift {
    text-align: center;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    color: var(--grey-400);
  }
  .text-row,
  .date-wrapper,
  .text-input-wrapper {
    margin-top: 1.3rem;
  }
  .text-row {
    column-gap: 2.5rem;
  }
  .right-col {
    h5 {
      margin-top: 4.2rem;
      text-align: center;
    }
    .rows {
      width: max-content;
      margin: 0 auto;
    }
  }
  .btn-wrapper {
    margin-top: 2.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 2rem;
  }
  .btn {
    padding: 0.7rem 1.7rem;
    font-size: 1rem;
    font-weight: 500;
    display: block;
  }
  .delete {
    background-color: var(--red-dark);
  }
`;
export default Wrapper;
