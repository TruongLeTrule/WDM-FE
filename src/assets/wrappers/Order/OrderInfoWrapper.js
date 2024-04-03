import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 3rem;
  text-transform: capitalize;
  .header {
    position: relative;
    h4 {
      margin-top: 2.2rem;
      text-align: center;
      font-weight: 700;
    }
    .icon {
      position: absolute;
      right: 0;
      top: 50%;
      translate: 0 -50%;
      color: var(--primary);
      cursor: pointer;
    }
  }
  .container {
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    h5 {
      text-align: center;
      font-weight: 600;
      font-size: 1.4em;
    }
    .shift {
      text-align: center;
      font-size: 0.9rem;
      margin-top: 0.3rem;
      color: var(--grey-400);
    }
    .rows {
      width: max-content;
      margin: 0 auto;
      .row {
        display: flex;
        justify-content: space-between;
        margin-top: 0.7rem;
        .title {
          font-weight: 600;
          margin-right: 1rem;
        }
        .link {
          display: inline-flex;
          align-items: center;
          column-gap: 0.5rem;
          color: var(--grey-400);
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
  .btn {
    padding: 0.7rem 1.7rem;
    font-size: 1rem;
    font-weight: 500;
    margin: 1.2rem auto;
    display: block;
  }
`;
export default Wrapper;
