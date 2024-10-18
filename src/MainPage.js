import React, { useState } from 'react';
import { ChakraProvider, extendTheme, Box, Text, Flex, VStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import '@fontsource-variable/karla/wght.css';
import { PiStar, PiStarFill, PiSealFill } from 'react-icons/pi';

const theme = extendTheme({
  fonts: {
    body: '"Karla Variable", sans-serif',
  },
});

const MotionBox = motion(Box);

const IconBox = ({ bgColor, size, iconScale, onClick, isStarFilled }) => {
  const iconSize = `${parseInt(size) * iconScale}px`;

  return (
    <Box 
      position="relative" 
      width={size} 
      height={size} 
      onClick={onClick}
      cursor="pointer"
      transition="all 0.3s ease"
      _hover={{
        '& > svg:first-of-type': {
          color: '#b3ebf2',
        }
      }}
      userSelect="none"
    >
      <PiSealFill size={size} color={bgColor} />
      <Flex
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        alignItems="center"
        justifyContent="center"
      >
        <Box position="relative" width={iconSize} height={iconSize}>
          {isStarFilled && (
            <PiStarFill 
              size={iconSize} 
              color="#FFD700" 
              style={{ position: 'absolute', top: 0, left: 0 }} 
            />
          )}
          <PiStar 
            size={iconSize} 
            color="black" 
            style={{ position: 'absolute', top: 0, left: 0 }} 
          />
        </Box>
      </Flex>
    </Box>
  );
};

const OptionBox = ({ option, isSelected, onClick, hasInteracted }) => (
  <motion.div
    onClick={onClick}
    style={{
      background: isSelected ? "#b3ebf2" : "white",
      borderRadius: "10px",
      border: "1px solid black",
      padding: "16px",
      cursor: "pointer",
      transition: "all 0.2s",
    }}
    whileHover={{
      background: isSelected ? "#b3ebf2" : "#e6f7f9",
    }}
    initial={hasInteracted ? { opacity: 0, y: -10 } : false}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
  >
    <Text fontWeight={700} fontSize="16px" lineHeight="19px" color="black">
      {option}
    </Text>
  </motion.div>
);

const OptionsBox = ({ options }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setHasInteracted(true);
  };

  const handleSelect = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  return (
    <Box
      w="100%"
      bg="gray.200"
      borderRadius="20px"
      border="1px solid black"
      boxShadow="0 4px 0 0 black"
      position="relative"
      overflow="hidden"
      mt={4}
    >
      <Flex 
        justifyContent="space-between" 
        alignItems="center" 
        p={6}
        onClick={toggleDropdown} 
        cursor="pointer"
      >
        <Text fontSize="24px" fontWeight="700" color="black">
          Options
        </Text>
        {isOpen ? <ChevronUpIcon boxSize={6} /> : <ChevronDownIcon boxSize={6} />}
      </Flex>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={hasInteracted ? { height: 0 } : false}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <VStack spacing={2} align="stretch" px={6} pb={6}>
              {options.map((option, index) => (
                <OptionBox
                  key={index}
                  option={option}
                  isSelected={option === selectedOption}
                  onClick={() => handleSelect(option)}
                  hasInteracted={hasInteracted}
                />
              ))}
            </VStack>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

const MainPage = () => {
  const [isStarFilled, setIsStarFilled] = useState(false);
  const questionNumber = 1;
  const totalQuestions = 10;
  const questionText = "A company is planning to run a global marketing application in the AWS Cloud. The application will feature videos that can be viewed by users. The company must ensure that all users can view these videos with low latency. Which AWS service should the company use to meet this requirement?";

  const toggleStar = (e) => {
    e.stopPropagation();
    setIsStarFilled(!isStarFilled);
  };

  const options = [
    "AWS Auto Scaling",
    "Amazon Kinesis Video Streams",
    "Elastic Load Balancing",
    "Amazon CloudFront"
  ];

  return (
    <ChakraProvider theme={theme}>
      <Flex justifyContent="center" alignItems="center" minHeight="100vh" bg="white" py={8}>
        <VStack w="95%" maxW="800px" spacing={4}>
          <Box
            w="100%"
            bg="gray.200"
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
                px={2}
                py={1}
                borderRadius="8px"
              >
                <Text fontSize="24px" fontWeight="700" color="black">
                  QUESTION {questionNumber} of {totalQuestions}
                </Text>
              </Box>
              <IconBox
                bgColor="white"
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
          <OptionsBox options={options} />
        </VStack>
      </Flex>
    </ChakraProvider>
  );
};

export default MainPage;