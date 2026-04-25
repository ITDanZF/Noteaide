import { createBrowserRouter } from 'react-router';
import Layout from '@/components/Layout/index';
import Home from '@/pages/Home';
import AiDraw from '@/pages/AiDraw';

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
    ],
  },
]);

export default router;
