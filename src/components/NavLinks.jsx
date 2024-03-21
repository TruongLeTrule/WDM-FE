import links from '../utils/navLinks';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  return (
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
  );
};
export default NavLinks;
