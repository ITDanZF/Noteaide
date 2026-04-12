import { createBrowserRouter } from 'react-router';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Chat from '@/pages/Chat';

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
        path: '/Chat',
        element: <Chat />,
      },
    ],
  },
]);

export default router;
