import { Flex, Box } from '@chakra-ui/react';
import MessageList from './DialogBox/MessageList';
import ChatDialog from './DialogBox/ChatDialog';

export default function Chat() {
  return (
    <Flex direction="column" width="100%" height="100vh">
      {/* 消息列表区域 */}
      <Box flex="1" overflowY="auto" width="100%">
        <Flex justify="center" width="100%" py="4">
          <Box maxWidth="700px" width="100%">
            <MessageList />
          </Box>
        </Flex>
      </Box>

      {/* 底部输入框 */}
      <Flex justify="center" width="100%" pb="80px">
        <ChatDialog />
      </Flex>
    </Flex>
  );
}
