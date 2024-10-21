import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { StarIconBox } from './IconBox';
import { transformImageUrl } from '../utils';

const QuestionBox = ({ questionNumber, totalQuestionsInTopic, questionData, isStarFilled, toggleStar, currentTopic }) => {
  if (!questionData) {
    return (
      <Box
        width="100%"
        backgroundColor="#f2f2f3"
        borderRadius="20px"
        border="1px solid black"
        boxShadow="0 4px 0 0 black"
        position="relative"
        overflow="hidden"
        padding={6}
      >
        <Text fontSize="20px" fontWeight="500" color="black">
          No question data available.
        </Text>
      </Box>
    );
  }

  const transformedBody = questionData.body.replace(
    /<img\s+src="([^"]+)"/g,
    (match, p1) => `<img src="${transformImageUrl(p1)}"`
  );

  return (
    <Box
      width="100%"
      backgroundColor="#f2f2f3"
      borderRadius="20px"
      border="1px solid black"
      boxShadow="0 4px 0 0 black"
      position="relative"
      overflow="hidden"
      padding={6}
    >
      <Flex justifyContent="space-between" alignItems="center" marginBottom={4}>
        <Box
          backgroundColor="#b3ebf2"
          paddingX={1}
          paddingY={0}
          borderRadius="8px"
        >
          <Text fontSize="24px" fontWeight="700" color="black">
            T{currentTopic} Q{questionNumber} of {totalQuestionsInTopic}
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
        <Text fontSize="20px" fontWeight="500" color="black" dangerouslySetInnerHTML={{ __html: transformedBody || "No question text available." }} />
      </Box>
    </Box>
  );
};

export default QuestionBox;