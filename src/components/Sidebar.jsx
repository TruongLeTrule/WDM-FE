import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';
import Wrapper from '../assets/wrappers/SidebarWrapper';
import links from '../utils/navLinks';
import { UserRole } from '../components';

const Sidebar = () => {
  return (
    <Wrapper>
      <header>
        <Link to=".">
          <Logo />
        </Link>
      </header>
      <div className="nav-links">
        {links.map((link) => {
          const { text, path, icon } = link;
          return (
            <NavLink to={path} key={text} className="nav-link" end>
              <span className="icon">{icon}</span>
              {text}
            </NavLink>
          );
        })}
      </div>
      <div className="role">
        <UserRole />
      </div>
    </Wrapper>
  );
};
export default Sidebar;
