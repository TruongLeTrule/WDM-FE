import { FaHotel, FaConciergeBell, FaUtensils, FaUser } from 'react-icons/fa';
import { FaChartSimple } from 'react-icons/fa6';

const links = [
  {
    text: 'lobby',
    path: '.',
    icon: <FaHotel />,
  },
  {
    text: 'order',
    path: 'order',
    icon: <FaConciergeBell />,
  },
  {
    text: 'report',
    path: 'report',
    icon: <FaChartSimple />,
  },
  {
    text: 'food&Service',
    path: 'food-service',
    icon: <FaUtensils />,
  },
  {
    text: 'user',
    path: 'user',
    icon: <FaUser />,
  },
];

export default links;
