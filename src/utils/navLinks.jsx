import { FaHotel, FaConciergeBell, FaUtensils, FaUser } from 'react-icons/fa';
import { FaChartSimple } from 'react-icons/fa6';

const links = [
  {
    text: 'lobby',
    page: 'lobby',
    path: '.',
    icon: <FaHotel />,
  },
  {
    text: 'order',
    page: 'order',
    path: 'order',
    icon: <FaConciergeBell />,
  },
  {
    text: 'report',
    page: 'report',
    path: 'report',
    icon: <FaChartSimple />,
  },
  {
    text: 'food&Service',
    page: 'food_service',
    path: 'food-service',
    icon: <FaUtensils />,
  },
  {
    text: 'user',
    page: 'user',
    path: 'user',
    icon: <FaUser />,
  },
];

export default links;
