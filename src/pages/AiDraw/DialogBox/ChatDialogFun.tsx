import { HStack, Box, Button } from '@chakra-ui/react';
export default function ChatDialogFun() {
  return (
    <HStack>
      <Box>上传图片</Box>
      <Box>
        <Button>选择模型</Button>
        <Button>深度思考</Button>
      </Box>
      <Box>
        <Button>发送</Button>
      </Box>
    </HStack>
  );
}
