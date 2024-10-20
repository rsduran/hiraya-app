import React, { useState } from 'react';
import { Box, Text, Flex, Avatar, Tooltip } from '@chakra-ui/react';

const Navbar = ({ activeItem, children }) => {
  const [isLightTheme, setIsLightTheme] = useState(true);

  // Function to truncate text and add ellipsis if necessary
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Extract the exam title from children if it exists
  const examTitle = React.Children.toArray(children).find(
    child => child.type === 'span' && child.props.children[2]
  )?.props?.children[2];

  return (
    <Flex 
      justify="space-between" 
      align="center" 
      p={4} 
      bg="white" 
      borderBottom="1px solid" 
      borderColor="gray.200"
    >
      <Flex align="center" overflow="hidden">
        <Box ml={4} flexShrink={0}>
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
              ml="2"
            >
              {activeItem}
            </Box>
          </Text>
        </Box>
        <Box ml={4} overflow="hidden">
          {examTitle ? (
            <Tooltip label={examTitle} aria-label="Full exam title">
              <Text
                fontFamily='"Karla Variable", sans-serif'
                fontWeight={500}
                fontSize="16px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {truncateText(examTitle, 30)}
              </Text>
            </Tooltip>
          ) : (
            children
          )}
        </Box>
      </Flex>
      <Flex align="center" mr={4}>
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
          mr={4}
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
          mr={4}
        >
          {isLightTheme ? "Light theme" : "Dark theme"}
        </Text>
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
      </Flex>
    </Flex>
  );
};

export default Navbar;