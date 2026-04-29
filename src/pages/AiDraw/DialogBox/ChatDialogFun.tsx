import { HStack, Box, Button } from '@chakra-ui/react';
export default function ChatDialogFun() {
  return (
    <HStack>
      {/* 左侧Box: 宽度自适应内容 */}
      <Box
        w="auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        color="textPrimary"
        transition="transform 0.3s ease"
        _hover={{ transform: 'rotate(90deg)' }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </Box>

      {/* 中间Box: 占据所有剩余空间，内部内容靠左 */}
      <Box flex="1" w="auto">
        <Button>选择模型</Button>
        <Button>深度思考</Button>
      </Box>

      {/* 右侧Box: 宽度自适应内容 */}
      <Box w="auto">
        <Button>发送</Button>
      </Box>
    </HStack>
  );
}
