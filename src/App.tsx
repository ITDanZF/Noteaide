import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router';
import router from './router';
import './index.css';
import { chakraSystem } from '@/configuration/index';

function App() {
  return (
    <ChakraProvider value={chakraSystem}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
