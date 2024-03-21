import { Outlet } from 'react-router-dom';
import Wrapper from '../assets/wrappers/DashboardWrapper';
import { Sidebar } from '../components';

const DashboardLayout = () => {
  return (
    <Wrapper>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-page">
          <Outlet />
        </div>
      </div>
    </Wrapper>
  );
};
export default DashboardLayout;
