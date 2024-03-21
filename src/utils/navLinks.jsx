import {
  FaHotel,
  FaConciergeBell,
  FaChartLine,
  FaUtensils,
  FaUser,
} from 'react-icons/fa';

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
    icon: <FaChartLine />,
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
