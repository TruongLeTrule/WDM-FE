import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Lobby />,
          },
          {
            path: 'order',
            element: <Order />,
          },
          {
            path: 'report',
            element: <Report />,
          },
          {
            path: 'food-service',
            element: <FoodAndService />,
          },
          {
            path: 'user',
            element: <User />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
};

export default App;
