import { Box, Button } from '@chakra-ui/react';
import TypeIt from 'typeit-react';
import { useState } from 'react';

interface TextSegment {
  text: string;
  color: string;
  bold?: boolean;
}

const textTemplate: TextSegment[][] = [
  [
    { text: 'Noteaide', color: '#00d9ff', bold: true },
    { text: '是一个基于', color: '#ffffff' },
    { text: '人工智能', color: '#ff6b6b' },
    { text: '的', color: '#ffffff' },
    { text: '三维建模', color: '#ffd93d' },
    { text: '智能体项目。', color: '#ffffff' },
  ],
  [
    { text: '用户可以通过', color: '#ffffff' },
    { text: '自然语言对话', color: '#00d9ff' },
    { text: '的方式，与 ', color: '#ffffff' },
    { text: 'AI 助手', color: '#ff6b6b', bold: true },
    { text: ' 交互来创建和编辑', color: '#ffffff' },
    { text: '三维模型', color: '#ffd93d' },
    { text: '。', color: '#ffffff' },
  ],
  [
    { text: '无需专业的 3D 建模技能，只需描述你想要的模型，', color: '#ffffff' },
    { text: 'AI', color: '#ff6b6b', bold: true },
    { text: ' 就能帮你实现。', color: '#ffffff' },
  ],
];

const fontSizes = ['2.5rem', '2rem', '1.5rem'];

export default function Home() {
  const [isShowbutton, setShowbutton] = useState(false);
  return (
    <Box
      h="full"
      backgroundImage="url('/bg.svg')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        p={8}
      >
        {/* @ts-expect-error TypeIt types are incompatible */}
        <TypeIt
          options={{
            speed: 80,
            cursorChar: '丨',
            html: true,
            breakLines: true,
            afterComplete: () => {
              setShowbutton(true);
            },
          }}
          getBeforeInit={instance => {
            textTemplate.forEach((line, lineIndex) => {
              line.forEach(segment => {
                instance.type(
                  `<span style="color:${segment.color};font-weight:${segment.bold ? 'bold' : 'normal'};font-size:${fontSizes[lineIndex]}">${segment.text}</span>`
                );
              });
              if (lineIndex < textTemplate.length - 1) {
                instance.break();
              }
            });
            return instance;
          }}
        >
          <span />
        </TypeIt>
        <Button
          mt={8}
          size="lg"
          variant="ghost"
          color="teal.400"
          border="2px solid"
          borderColor="teal.400"
          px={12}
          py={7}
          fontSize="2xl"
          _hover={{ bg: 'teal.900', transform: 'scale(1.05)' }}
          transition="all 0.3s ease"
          opacity={isShowbutton ? 1 : 0}
          pointerEvents={isShowbutton ? 'auto' : 'none'}
        >
          立即体验
        </Button>
      </Box>
    </Box>
  );
}
