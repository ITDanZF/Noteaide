import { Box, Textarea, HStack } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useRef } from 'react';
import ChatDialogFun from './ChatDialogFun';
export default function ChatDialog() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
  };
  return (
    <>
      <Box bg="homeBgTransparent" borderRadius="md" border="1px solid" borderColor="blue.200" p="4">
        <Box>
          <Textarea
            placeholder="向Noteaide提问..."
            resize="none"
            rows={1}
            onInput={handleInput}
            style={{
              minHeight: '24px',
              maxHeight: '200px',
              height: 'auto',
            }}
            border="none"
            css={{
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: 'rgba(255, 255, 255, 0.5)',
              },
            }}
            _focus={{ border: 'none', outline: 'none' }}
            _hover={{ border: 'none' }}
            _placeholder={{ color: 'gray.400' }}
          />
        </Box>
        <ChatDialogFun />
      </Box>
    </>
  );
}
