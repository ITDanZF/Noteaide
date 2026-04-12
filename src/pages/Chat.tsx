import { Splitter, Box } from '@chakra-ui/react';
export default function Chat() {
  return (
    <Splitter.Root defaultSize={[25, 75]} panels={[{ id: 'sidebar' }, { id: 'content' }]} h="100%">
      <Splitter.Panel id="sidebar">
        <Box p="4">侧边栏</Box>
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="sidebar:content" />
      <Splitter.Panel id="content">
        <Box p="4">主内容区</Box>
      </Splitter.Panel>
    </Splitter.Root>
  );
}
