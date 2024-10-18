import React from 'react';
import { Box, Text, VStack, Flex } from '@chakra-ui/react';

const TopicBox = ({ topicNumber, courseName, courseFullName }) => {
  return (
    <Flex
      direction="column"
      w="100%"
      bgGradient="linear(to top left, #F7941E, #72C6EF, #00A651)"
      borderRadius="20px"
      border="1px solid black"
      boxShadow="0 4px 0 0 black"
      position="relative"
      overflow="hidden"
      p={6}
    >
      <VStack spacing={4} align="stretch">
        <Box
          px={2}
          py={0}
          borderRadius="full"
          display="inline-block"
          alignSelf="flex-start"
          border="1px solid black"
          bg="rgba(255, 255, 255, 0.7)"
        >
          <Text fontSize="14px" fontWeight="500" color="black">
            TOPIC {topicNumber}
          </Text>
        </Box>
        <Text fontSize="24px" fontWeight="700" color="black" lineHeight="1.2">
          {courseName}
        </Text>
        <Text fontSize="20px" fontWeight="700" color="black" lineHeight="1.2">
          {courseFullName}
        </Text>
      </VStack>
    </Flex>
  );
};

export default TopicBox;