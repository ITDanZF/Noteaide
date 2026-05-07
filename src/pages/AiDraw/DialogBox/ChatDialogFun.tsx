import { HStack, Box, Button } from '@chakra-ui/react';
import { AddIcon, ModelSelectIcon, DeepThinkIcon } from '@/components/icons';

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
        <AddIcon width={20} height={20} />
      </Box>

      {/* 中间Box: 占据所有剩余空间，内部内容靠左 */}
      <Box flex="1" w="auto">
        <Button
          variant="ghost"
          size="sm"
          color="white"
          rounded="lg"
          px={2}
          _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
        >
          <ModelSelectIcon width={16} height={16} style={{ marginRight: '3px' }} />
          模型选择
        </Button>
        <Button
          variant="ghost"
          size="sm"
          color="white"
          rounded="lg"
          px={2}
          _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
        >
          <DeepThinkIcon width={16} height={16} style={{ marginRight: '3px' }} />
          深度思考
        </Button>
      </Box>

      {/* 右侧Box: 宽度自适应内容 */}
      <Box w="auto">
        <Button>发送</Button>
      </Box>
    </HStack>
  );
}
