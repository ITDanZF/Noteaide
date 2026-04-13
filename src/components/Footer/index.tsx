import { Flex, Text, Link, HStack } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Flex alignItems="center" justifyContent="center" h="full" px="4">
      <HStack gap={4} fontSize="sm" color="gray.200">
        <Text>© 2024 Noteaide. All rights reserved.</Text>
        <Link href="https://github.com" target="_blank" rel="noopener noreferrer" color="gray.200" _hover={{ color: 'blue.400' }}>
          GitHub
        </Link>
        <Link href="#" color="gray.200" _hover={{ color: 'blue.400' }}>
          Documentation
        </Link>
      </HStack>
    </Flex>
  );
}