import { Outlet } from 'react-router';
import { Flex, Box } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <Flex direction="column" h="100vh">
      <Box h="16" flexShrink={0} bg="homeBgSecondary" color="textPrimary">
        <Header />
      </Box>
      <Box flex="1" overflow="hidden" bg="homeBg">
        <Outlet />
      </Box>
      <Box h="16" flexShrink={0} bg="homeBg" color="textPrimary">
        <Footer />
      </Box>
    </Flex>
  );
}
