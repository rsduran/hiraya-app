import React, { useState } from 'react';
import { Box, Text, Flex, Avatar, HStack } from '@chakra-ui/react';

const Navbar = ({ activeItem, children }) => {
  const [isLightTheme, setIsLightTheme] = useState(true);

  return (
    <Flex 
      justify="space-between" 
      align="center" 
      p={4} 
      pl={10}
      bg="white" 
      borderBottom="1px solid" 
      borderColor="gray.200"
    >
      <Flex align="center" overflow="hidden" flex={1} minWidth={0}>
        <Box flexShrink={0} mr={4}>
          <Text
            fontFamily='"Karla Variable", sans-serif'
            fontWeight={700}
            fontSize="24px"
            lineHeight="29px"
            color="rgb(0, 0, 0)"
          >
            <Box
              as="span"
              bg="#b3ebf2"
              px="1"
              py="0"
              borderRadius="8px"
            >
              {activeItem}
            </Box>
          </Text>
        </Box>
        <Box overflow="hidden" flex={1} minWidth={0}>
          {children}
        </Box>
      </Flex>
      <HStack spacing={4} flexShrink={0} ml={4}>
        <Flex align="center">
          <Box
            width="52px"
            height="24px"
            bg="gray.200"
            borderRadius="full"
            display="flex"
            alignItems="center"
            padding="2px"
            cursor="pointer"
            onClick={() => setIsLightTheme(!isLightTheme)}
            border="1px solid black"
          >
            <Box
              width="16px"
              height="16px"
              bg="#00bfff"
              borderRadius="full"
              transform={isLightTheme ? "translateX(3px)" : "translateX(27px)"}
              transition="transform 0.2s"
              border="1px solid black"
            />
          </Box>
          <Text
            fontFamily='"Karla Variable", sans-serif'
            fontWeight={500}
            fontSize="16px"
            lineHeight="24px"
            color="rgb(26, 32, 44)"
            ml={2}
          >
            {isLightTheme ? "Light theme" : "Dark theme"}
          </Text>
        </Flex>
        <Flex align="center">
          <Text
            fontFamily='"Karla Variable", sans-serif'
            fontWeight={700}
            fontSize="20px"
            lineHeight="30px"
            color="rgb(84, 84, 84)"
            mr={1}
          >
            Hello,
          </Text>
          <Text
            fontFamily='"Karla Variable", sans-serif'
            fontWeight={700}
            fontSize="20px"
            lineHeight="30px"
            color="rgb(26, 32, 44)"
            mr={2}
          >
            rsduran!
          </Text>
          <Avatar src="https://bit.ly/dan-abramov" size="md" />
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Navbar;