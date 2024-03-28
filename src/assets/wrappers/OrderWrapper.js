import styled from 'styled-components';

const Wrapper = styled.section`
  height: var(--section-height);
  main {
    height: calc(var(--section-height) - var(--header-height));
    padding: 2.5rem;
  }
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
    background-color: var(--white);
    padding: 1.8rem 2rem;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .container::-webkit-scrollbar {
    display: none;
  }
`;
export default Wrapper;
