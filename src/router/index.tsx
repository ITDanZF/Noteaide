import { createBrowserRouter } from 'react-router';
import Layout from '@/components/Layout/index';
import Home from '@/pages/Home';
import AiDraw from '@/pages/AiDraw';
import Login from '@/pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/AiDraw',
        element: <AiDraw />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
