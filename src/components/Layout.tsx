import { Outlet } from 'react-router';
import { Flex, Box } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <Flex direction="column" h="100vh">
      <Box h="16" flexShrink={0} bg="gray.800" color="gray.100">
        <Header />
      </Box>
      <Box flex="1" overflow="hidden">
        <Outlet />
      </Box>
      <Box h="16" flexShrink={0} bg="gray.900" color="gray.100">
        <Footer />
      </Box>
    </Flex>
  );
}
