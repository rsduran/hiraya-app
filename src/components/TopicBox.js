import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

const TopicBox = ({ topicNumber, courseName, courseFullName }) => {
  return (
    <Box
      w="100%"
      bgGradient="linear(to top left, #F7941E, #72C6EF, #00A651)"
      borderRadius="20px"
      border="1px solid black"
      boxShadow="0 4px 0 0 black"
      position="relative"
      overflow="hidden"
      p={6}
      mb={4}
    >
      <VStack spacing={2} align="stretch">
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
        <Text fontSize="20px" fontWeight="700" color="black" lineHeight="1.2">
          {courseName}
        </Text>
        <Text fontSize="20px" fontWeight="700" color="black" lineHeight="1.2" mt="0 !important">
          {courseFullName}
        </Text>
      </VStack>
    </Box>
  );
};

export default TopicBox;