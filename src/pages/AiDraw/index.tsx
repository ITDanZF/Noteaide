import { Flex, Box } from '@chakra-ui/react';
import Chat from '@/pages/AiDraw/Chat';
export default function AiDraw() {
  return (
    <Flex h="100%">
      <Box w="50rem" flexShrink={0}>
        <Box p="4">
          <Chat />
        </Box>
      </Box>
      <Box flex="1" p="4" bg="homeBg">
        主内容区
      </Box>
    </Flex>
  );
}
