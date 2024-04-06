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
  .title {
    font-weight: 600;
    margin-right: 1rem;
  }
  .row,
  .date-wrap {
    margin-top: 1.3rem;
  }
  .space-between {
    display: flex;
    justify-content: space-between;
  }
  .row input {
    min-width: 15rem;
    font-size: 1rem;
    margin-top: 0.4rem;
    display: block;
    padding: 0.6rem 1rem;
    border: 1px solid var(--grey-200);
    border-radius: 7px;
    color: var(--grey-400);
  }
  .date-wrap {
    max-width: 15rem;
    display: flex;
    flex-direction: column;
    row-gap: 0.4rem;
    fieldset {
      border: 1px solid var(--grey-200);
      border-radius: 7px;
    }
    input {
      padding: 0.6rem 1rem;
      font-size: 1rem;
      color: var(--grey-400);
    }
  }
  .link {
    display: inline-flex;
    align-items: center;
    column-gap: 0.5rem;
    color: var(--grey-400);
    text-decoration: underline;
    cursor: pointer;
  }
  .right-col {
    h5 {
      margin-top: 3.7rem;
      text-align: center;
    }
    .rows {
      width: max-content;
      margin: 0 auto;
    }
  }
  .strong {
    font-weight: 700;
  }
  .btn-wrap {
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
