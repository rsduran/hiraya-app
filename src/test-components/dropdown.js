import React, { useState } from 'react';
import { ChakraProvider, extendTheme, Box, Text, Flex, Button } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import '@fontsource-variable/karla/wght.css';

const theme = extendTheme({
  fonts: {
    body: '"Karla Variable", sans-serif',
  },
});

const CustomDropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box position="relative" width="300px">
        <Button
          onClick={toggleDropdown}
          width="100%"
          bg="white"
          color="black"
          fontWeight={700}
          fontSize="16px"
          lineHeight="19px"
          borderRadius="10px"
          border="1px solid black"
          boxShadow="none"
          _hover={{
            bg: "#00bfff",
            boxShadow: "0 3px 0 0 black",
          }}
          _active={{
            bg: "#00bfff",
            boxShadow: "none",
          }}
          transition="all 0.2s"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={4}
          py={3}
        >
          <Text>{selectedOption}</Text>
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Button>
        {isOpen && (
          <Box
            position="absolute"
            top="100%"
            left={0}
            width="100%"
            bg="white"
            borderRadius="10px"
            border="1px solid black"
            mt={2}
            zIndex={1}
            overflow="hidden"
          >
            {options.map((option, index) => (
              <Box
                key={index}
                py={2}
                px={4}
                cursor="pointer"
                _hover={{ bg: "#b3ebf2" }}
                onClick={() => handleSelect(option)}
                borderBottom={index < options.length - 1 ? "1px solid #E2E8F0" : "none"}
              >
                <Text fontWeight={700} fontSize="16px" lineHeight="19px" color="black">
                  {option}
                </Text>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};

const App = () => {
  const options = [
    "Stage 1: Building The Network",
    "Stage 2: Capturing the web",
    "Stage 3: Another option",
  ];

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh" bg="gray.100">
      <CustomDropdown options={options} />
    </Flex>
  );
};

export default App;