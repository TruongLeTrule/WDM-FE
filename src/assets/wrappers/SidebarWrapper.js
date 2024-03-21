import styled from 'styled-components';

const Wrapper = styled.aside`
  position: relative;
  background-color: var(--white);
  height: 100vh;
  padding: 0 2.6rem 0 2.3rem;
  border-right: 1px solid var(--grey-200);
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 3.2rem 0;
  }
  .nav-links {
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 2.2rem;
  }
  .nav-link {
    position: relative;
    display: flex;
    align-items: center;
    text-transform: capitalize;
    font-size: 1em;
    font-weight: 500;
    color: #b1b1b1;
    .icon {
      font-size: 1.1em;
      color: #000;
      margin-right: 1rem;
    }
    transition: all 0.25s ease;
  }
  .nav-link:hover {
    color: var(--primary);
    opacity: 0.75;
    .icon {
      color: var(--primary);
    }
  }
  .role {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .role-icon {
      font-size: 1.5em;
    }
    .role-text {
      margin-top: 0.3rem;
      display: block;
      text-transform: capitalize;
      font-size: 0.9em;
      font-weight: 500;
    }
  }
  .active {
    color: var(--primary);
    .icon {
      color: var(--primary);
    }
  }
`;

export default Wrapper;
