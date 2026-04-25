import { HStack, Image, Text } from '@chakra-ui/react';

export default function Logo() {
  return (
    <HStack gap={2}>
      <Image src="/logo.svg" alt="Logo" boxSize="50px" objectFit="contain" />
      <Text fontSize="xl" fontWeight="bold">
        Noteaide
      </Text>
    </HStack>
  );
}
