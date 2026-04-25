import { Flex, Text, Link, HStack } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Flex alignItems="center" justifyContent="center" h="full" px="4">
      <HStack gap={4} fontSize="sm" color="textSecondary">
        <Text>© 2024 Noteaide. All rights reserved.</Text>
        <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          color="textSecondary"
          _hover={{ color: 'accentBlue' }}
        >
          GitHub
        </Link>
        <Link href="#" color="textSecondary" _hover={{ color: 'accentBlue' }}>
          Documentation
        </Link>
      </HStack>
    </Flex>
  );
}
