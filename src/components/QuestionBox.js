import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { StarIconBox } from './IconBox';

const QuestionBox = ({ questionNumber, totalQuestions, questionText, isStarFilled, toggleStar }) => {
  return (
    <Box
      w="100%"
      bg="#f2f2f3"
      borderRadius="20px"
      border="1px solid black"
      boxShadow="0 4px 0 0 black"
      position="relative"
      overflow="hidden"
      p={6}
    >
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Box
          bg="#b3ebf2"
          px={1}
          py={0}
          borderRadius="8px"
        >
          <Text fontSize="24px" fontWeight="700" color="black">
            QUESTION {questionNumber} of {totalQuestions}
          </Text>
        </Box>
        <StarIconBox
          size="48px"
          iconScale={0.5}
          onClick={toggleStar}
          isStarFilled={isStarFilled}
        />
      </Flex>
      <Box>
        <Text fontSize="20px" fontWeight="500" color="black">
          {questionText}
        </Text>
      </Box>
    </Box>
  );
};

export default QuestionBox;