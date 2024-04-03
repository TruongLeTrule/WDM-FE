import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 3rem;
  text-transform: capitalize;
  .header {
    h4 {
      text-align: center;
      margin-top: 3rem;
      font-weight: 700;
    }
  }
  .container {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    h5 {
      font-weight: 600;
      font-size: 1.4em;
    }
    .right-col {
      h5 {
        text-align: center;
      }
    }
    .shift {
      text-align: center;
      font-size: 0.9rem;
      margin-top: 0.5rem;
      color: var(--grey-400);
    }
    .rows {
      .row {
        margin-top: 1.3rem;
        .title {
          font-weight: 600;
          margin-right: 1rem;
        }
        input {
          margin-top: 0.4rem;
          display: block;
          padding: 0.6rem 1rem;
          border: 1px solid var(--grey-200);
          border-radius: 7px;
          color: var(--grey-400);
        }
        .calendar-wrap {
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          column-gap: 0.5rem;
          .icon {
            color: var(--primary);
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
      }
      .space-between {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .right-col {
    .rows {
      width: max-content;
      margin: 0 auto;
    }
  }
  .btn-wrap {
    margin-top: 3.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 2rem;
    .btn {
      padding: 0.7rem 1.7rem;
      font-size: 1rem;
      font-weight: 500;
      display: block;
    }
    .delete {
      background-color: var(--red-dark);
    }
  }
`;
export default Wrapper;
