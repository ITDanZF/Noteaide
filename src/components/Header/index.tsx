import { Flex, Box, Text } from '@chakra-ui/react';
import Logo from '@/components/Header/Logo';
export default function Header() {
  return (
    <Flex
      h="16"
      flexShrink={0}
      bg="gray.800"
      color="gray.100"
      alignItems="center"
      px="4"
      justifyContent="space-between"
    >
      <Box>
        <Logo />
      </Box>
      <Box>
        <Text>中间标题</Text>
      </Box>
      <Box>
        <Text>右侧内容</Text>
      </Box>
    </Flex>
  );
}
