import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { FixedSizeList as List } from 'react-window';

const QuestionListDropdown = React.memo(({ questions, currentQuestion, onSelect }) => {
  console.log("QuestionListDropdown rendered", { questions, currentQuestion });

  const itemSize = 32; // Height of each item in pixels
  const listHeight = Math.min(questions.length * itemSize, 300); // Max height of 300px

  const Row = ({ index, style }) => {
    const question = questions[index];
    const isSelected = question === currentQuestion;

    return (
      <Box
        style={style}
        paddingTop={2}
        paddingBottom={2}
        paddingLeft={4}
        paddingRight={4}
        cursor="pointer"
        _hover={{ backgroundColor: "#b3ebf2" }}
        onClick={() => onSelect(question)}
        backgroundColor={isSelected ? "#00bfff" : "white"}
      >
        <Text fontWeight={700} fontSize="14px" lineHeight="16px" color="black">
          {question}
        </Text>
      </Box>
    );
  };

  return (
    <Box
      position="absolute"
      top="calc(100% + 8px)"
      left="50%"
      transform="translateX(-50%)"
      width="120px"
      height={listHeight}
      backgroundColor="white"
      borderRadius="10px"
      border="1px solid black"
      zIndex={1000}
      overflow="hidden"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
    >
      <List
        height={listHeight}
        itemCount={questions.length}
        itemSize={itemSize}
        width="100%"
      >
        {Row}
      </List>
    </Box>
  );
});

export default QuestionListDropdown;