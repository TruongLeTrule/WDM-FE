import { Link } from 'react-router-dom';
import Logo from './Logo';
import Wrapper from '../assets/wrappers/SidebarWrapper';
import { UserRole, NavLinks } from '../components';

const Sidebar = () => {
  return (
    <Wrapper>
      <header>
        <Link to=".">
          <Logo />
        </Link>
      </header>
      <NavLinks />
      <div className="role">
        <UserRole />
      </div>
    </Wrapper>
  );
};
export default Sidebar;
