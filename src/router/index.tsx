import { createBrowserRouter } from 'react-router';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },

  {
    path: '/Chat',
    element: <Layout />,
    children: [],
  },
]);

export default router;
