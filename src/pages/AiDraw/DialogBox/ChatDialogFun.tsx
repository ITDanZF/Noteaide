import { HStack, Box, Button } from '@chakra-ui/react';
export default function ChatDialogFun() {
  return (
    <HStack>
      {/* 左侧Box: 宽度自适应内容 */}
      <Box w="auto">上传图片</Box>

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
