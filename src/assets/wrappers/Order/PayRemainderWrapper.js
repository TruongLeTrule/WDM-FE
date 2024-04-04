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
    h5 {
      margin-bottom: 1.2rem;
      font-weight: 600;
      font-size: 1.2em;
    }
    .row {
      margin-top: 0.7rem;
    }
    .overall {
      .row {
        display: flex;
        justify-content: space-between;
      }
      .red {
        color: var(--red-dark);
      }
    }
    .payment {
      position: relative;
      margin-top: 2.5rem;
      .qr-code {
        position: absolute;
        right: -10rem;
        top: -1.1rem;
      }
      .row {
        display: grid;
        grid-template-columns: 1em auto;
        gap: 0.5em;
        align-items: center;
      }
    }
  }
  /* radio */
  input[type='radio'] {
    -webkit-appearance: none;
    margin: 0;
    appearance: none;
    color: var(--grey-300);
    width: 1em;
    height: 1em;
    border: 1px solid var(--grey-300);
    border-radius: 50%;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
    transition: 0.1s border-color ease-in-out;
  }
  input[type='radio']:checked {
    border-color: var(--primary);
  }
  input[type='radio']::before {
    content: '';
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    transform: scale(0);
    box-shadow: inset 1em 1em var(--primary);
    transition: 120ms transform ease-in-out;
  }
  input[type='radio']:checked::before {
    transform: scale(1);
  }
  .btn-wrap {
    text-align: center;
    position: relative;
    margin-top: 4.5rem;
    .btn {
      padding: 0.7rem 1.7rem;
      font-size: 1rem;
      font-weight: 500;
    }
    .row {
      position: absolute;
      right: 0;
      top: 50%;
      translate: 0 -50%;
      label {
        color: var(--grey-400);
      }
      label.checked {
        color: var(--primary);
      }
    }
  }
  /* checkbox */
  input[type='checkbox'] {
    margin-right: 0.5rem;
    accent-color: var(--primary);
  }
  .strong {
    font-weight: 700;
  }
`;

export default Wrapper;
