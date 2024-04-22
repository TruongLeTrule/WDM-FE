import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2rem 3rem;
  text-align: center;
  h4 {
    text-transform: capitalize;
    font-weight: 600;
  }
  .pointer {
    cursor: pointer;
  }
  .header {
    position: relative;
    .cart-wrapper {
      z-index: 999;
      position: absolute;
      right: 0;
      top: 0;
      .food-list {
        text-transform: capitalize;
        border-radius: 6px;
        padding: 1rem;
        background-color: var(--white);
        box-shadow: 0px 4px 31px -5px rgba(0, 0, 0, 0.75);
        -webkit-box-shadow: 0px 4px 31px -5px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 4px 31px -5px rgba(0, 0, 0, 0.75);
        h6 {
          font-size: 1rem;
          text-transform: capitalize;
          margin-bottom: 0.7rem;
        }
        img {
          display: block;
          width: 3rem;
          height: 3rem;
          object-fit: cover;
          border-radius: 4px;
        }
        .food {
          margin-top: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          column-gap: 2rem;
          font-size: 0.9rem;
          .col {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            row-gap: 0.5rem;
            .quantity-group {
              display: flex;
              .quantity {
                border: 1px solid var(--grey-300);
                padding: 0.1rem 0.25rem;
              }
            }
          }
          .trash {
            color: var(--red-dark);
          }
        }
        strong {
          display: block;
          margin-top: 1.2rem;
        }
        .btn {
          margin-top: 1rem;
        }
      }
    }
    .icon {
      font-size: 1.2rem;
      color: var(--primary);
    }
    .badge {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: -0.5rem;
      right: -1rem;
      background-color: var(--white);
      width: 1.5rem;
      height: 1rem;
      border-radius: 3px;
      font-size: 0.7rem;
      box-shadow: 0px 4px 31px -5px rgba(0, 0, 0, 0.75);
      -webkit-box-shadow: 0px 4px 31px -5px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 0px 4px 31px -5px rgba(0, 0, 0, 0.75);
    }
  }
  .container {
    padding: 2rem 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
  .card {
    z-index: 1;
    position: relative;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0px 2px 8px 0px rgba(78, 78, 78, 0.2);
    -webkit-box-shadow: 0px 2px 8px 0px rgba(78, 78, 78, 0.2);
    -moz-box-shadow: 0px 2px 8px 0px rgba(78, 78, 78, 0.2);
  }
  .lob-img {
    z-index: 1;
    display: block;
    width: 100%;
    height: 11rem;
    object-fit: cover;
    border-radius: 4px;
  }
  h5 {
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: 600;
  }
  .price {
    font-size: 0.9rem;
    margin-top: 0.3rem;
  }
  .quantity-group {
    margin-top: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1rem;
    .icon {
      cursor: pointer;
    }
    .disable {
      color: var(--grey-400);
      cursor: default;
    }
  }
  .btn-group {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1rem;
    margin-top: 0.7rem;
    .btn {
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
      background-color: var(--black);
    }
    .reset {
      color: var(--grey-500);
      background-color: var(--grey-300);
    }
  }
`;
export default Wrapper;
