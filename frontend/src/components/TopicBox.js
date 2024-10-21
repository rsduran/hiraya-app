import React from 'react';
import { Box, Text, VStack, Flex } from '@chakra-ui/react';

const TopicBox = ({ topicNumber, examCode, examTitle }) => {
  // Capitalize the exam code
  const capitalizedExamCode = examCode.toUpperCase();

  return (
    <Flex
      direction="column"
      width="100%"
      bgGradient="linear(to top left, #F7941E, #72C6EF, #00A651)"
      borderRadius="20px"
      border="1px solid black"
      boxShadow="0 4px 0 0 black"
      position="relative"
      overflow="hidden"
      padding={6}
    >
      <VStack spacing={4} align="stretch">
        <Box
          paddingX={2}
          paddingY={0}
          borderRadius="full"
          display="inline-block"
          alignSelf="flex-start"
          border="1px solid black"
          backgroundColor="rgba(255, 255, 255, 0.7)"
        >
          <Text fontSize="14px" fontWeight="500" color="black">
            Topic {topicNumber}
          </Text>
        </Box>
        <Text fontSize="24px" fontWeight="700" color="black" lineHeight="1.2">
          {capitalizedExamCode}
        </Text>
        <Text fontSize="20px" fontWeight="700" color="black" lineHeight="1.2">
          {examTitle}
        </Text>
      </VStack>
    </Flex>
  );
};

export default TopicBox;