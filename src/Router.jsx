import AutoRedirect from './components/AutoRedirect';
import { useContext, useEffect, useState } from 'react';
import Loading from './components/Loading';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';

import {
  HomeLayout,
  Error,
  Login,
  DashboardLayout,
  Lobby,
  Order,
  Report,
  FoodAndService,
  User,
} from './pages';
import { AuthContext } from './context/auth.context';
const getDashboardChildrenRoutes = async (permissionList) => {
  let childrenRoutes = [
    { page: "lobby", path: 'lobby', element: <Lobby /> },
    { page: "order", path: 'order', element: <Order /> },
    { page: "report", path: 'report', element: <Report /> },
    { page: "food_service", path: 'food-service', element: <FoodAndService /> },
    { page: "user", path: 'user', element: <User /> },
  ];
  childrenRoutes = childrenRoutes.filter(role => permissionList.some(permission => permission.page === role.page) )
  
  if (childrenRoutes.length > 0) {
    childrenRoutes.unshift({ index: true, element: <Navigate to={childrenRoutes[0].path} /> });
  }

  return childrenRoutes;
};

const RouterWrapper = () => {
    const [routes, setRoutes] = useState(null);
    const { permissionList, isLoad } = useContext(AuthContext)
    useEffect(() => {
      const fetchRoutes = async () => {
        const dashboardChildrenRoutes = await getDashboardChildrenRoutes(permissionList);
        const routerConfig = [
          {
            path: '/',
            element: <HomeLayout />,
            errorElement: <Error />,
            children: [
              {
                index: true,
                element: (
                  <AutoRedirect>
                    <Login />
                  </AutoRedirect>
                ),
              },
              {
                path: 'dashboard',
                element: (
                    <RequireAuth>
                      <DashboardLayout />
                    </RequireAuth>
                ),
                children: dashboardChildrenRoutes.length > 0 
                ? dashboardChildrenRoutes 
                : [{ index: true, element: <Navigate to="/" /> }],
              },
              {
                path: '*',
                element: <Navigate to="/" />,
              },
            ],
          },
        ];
        setRoutes(createBrowserRouter(routerConfig));
      };
  
      if (!isLoad && permissionList) {
        fetchRoutes();
      }
    }, [isLoad, permissionList]);
  
    if (isLoad || !routes) {
      return <Loading minsize="35px" />;
    }

    return (
        <RouterProvider router={routes} />
    )
}

export default RouterWrapper