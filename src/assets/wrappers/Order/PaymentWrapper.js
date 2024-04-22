import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 3rem;
  text-transform: capitalize;
  h4 {
    text-align: center;
    margin-top: 2.5rem;
    font-weight: 700;
  }
  p {
    margin-top: 0.5rem;
    text-align: center;
  }
  .container {
    width: max-content;
    margin: 3rem auto 0 auto;
  }
  h5 {
    font-weight: 600;
    font-size: 1.2em;
    margin-top: 1rem;
  }
  .text-row,
  .text-input-wrapper,
  .radio-wrapper {
    margin-top: 0.7rem;
  }
  .text-row {
    column-gap: 2.5rem;
  }
  .text-input-wrapper input {
    min-width: 100%;
  }
  .btn {
    display: block;
    margin: 2rem auto;
    padding: 0.7rem 1.7rem;
    font-size: 1rem;
    font-weight: 500;
  }
`;

export default Wrapper;
