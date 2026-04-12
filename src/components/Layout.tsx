import { Outlet } from 'react-router';
import { Flex, Box } from '@chakra-ui/react';

export default function Layout() {
  return (
    <Flex direction="column" h="100vh">
      <Box h="12" flexShrink={0}>
        Header
      </Box>
      <Box flex="1" overflow="hidden">
        <Outlet />
      </Box>
      <Box h="8" flexShrink={0}>
        Footer
      </Box>
    </Flex>
  );
}
