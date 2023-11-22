// import DashboardIcon from '@mui/icons-material/Dashboard';
import { Dashboard } from '../pages/Dashboard';
import { Crypto } from '../pages/Crypto';


export const APP_PAGES = [
  {
    title: 'Dashboard',
    route: '/',
    // icon: <DashboardIcon />,
    component: <Dashboard />,
    showMenu: false,
  },
  {
    title: 'Cryptocurrencies',
    route: '/cryptocurrencies',
    // icon: <DashboardIcon />,
    component: <Crypto />,
    showMenu: true,
  },
  {
    title: 'NFT',
    route: '/nft',
    // icon: <DashboardIcon />,
    component: <Crypto />,
    showMenu: true,
  },
  {
    title: 'CrypTown',
    route: '/crypTown',
    // icon: <DashboardIcon />,
    component: <Crypto />,
    showMenu: true,
  },
  {
    title: 'Watchlist',
    route: '/watchlist',
    // icon: <DashboardIcon />,
    component: <Crypto />,
    showMenu: true,
  },
  {
    title: 'Products',
    route: '/products',
    // icon: <DashboardIcon />,
    component: <Crypto />,
    showMenu: true,
  },
  {
    title: 'Learn',
    route: '/learn',
    // icon: <DashboardIcon />,
    component: <Crypto />,
    showMenu: true,
  },
  
  {
    title: 'Login',
    route: '/login',
    // icon: <DashboardIcon />,
    component: <Crypto />,
    showMenu: false,
  },

  {
    title: 'Signup',
    route: '/signup',
    // icon: <DashboardIcon />,
    component: <Crypto />,
    showMenu: false,
  },
  
  
]
