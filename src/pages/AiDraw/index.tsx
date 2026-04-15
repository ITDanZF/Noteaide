import { Splitter, Box } from '@chakra-ui/react';
import Chat from '@/pages/AiDraw/Chat';
export default function AiDraw() {
  return (
    <Splitter.Root defaultSize={[25, 75]} panels={[{ id: 'sidebar' }, { id: 'content' }]} h="100%">
      <Splitter.Panel id="sidebar">
        <Box p="4" bg="homeBgSecondary">
          <Chat />
        </Box>
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="sidebar:content" />
      <Splitter.Panel id="content">
        <Box p="4" bg="homeBg">
          主内容区
        </Box>
      </Splitter.Panel>
    </Splitter.Root>
  );
}
