import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  VStack,
  HStack,
  Progress,
  Box,
  Flex,
  useColorMode,
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';

const StatusBadge = ({ status }) => {
  const { colorMode } = useColorMode();
  let bgGradient;
  let textColor = colorMode === 'light' ? "brand.text.light" : "brand.text.dark";
  
  switch (status) {
    case "PASSED":
      bgGradient = colorMode === 'light'
        ? "linear(to-r, #4CAF50, #8BC34A)"  // Light mode: Bright green gradient
        : "linear(to-r, #2E673F, #4A6F2E)"; // Dark mode: Darker green gradient
      break;
    case "FAILED":
      bgGradient = colorMode === 'light'
        ? "linear(to-r, #FF5252, #FF8A80)"  // Light mode: Bright red gradient
        : "linear(to-r, #992F2F, #994D4D)"; // Dark mode: Darker red gradient
      break;
    default:
      bgGradient = colorMode === 'light'
        ? "linear(to-r, #FFD54F, #FFF176)"  // Light mode: Bright yellow gradient
        : "linear(to-r, #997F30, #998E47)"; // Dark mode: Darker yellow gradient
  }
  
  return (
    <Box
      paddingLeft={2}
      paddingRight={2}
      paddingTop={0}
      paddingBottom={0}
      borderRadius="full"
      display="inline-block"
      alignSelf="center"
      border="1px solid"
      borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
      bgGradient={bgGradient}
    >
      <Text fontSize="14px" fontWeight="500" color={textColor}>
        {status}
      </Text>
    </Box>
  );
};

const CloseButton = ({ onClick, colorMode }) => {
  return (
    <Box
      as="button"
      onClick={onClick}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      w="24px"
      h="24px"
      bg="transparent"
      _focus={{ boxShadow: "none" }}
      color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
      borderRadius="50%"
      _hover={{ bg: 'transparent' }} // Ensures no background change on hover
    >
      <FaTimes size="16px" />
    </Box>
  );
};

const CustomButton = ({ children, onClick }) => {
  const { colorMode } = useColorMode();
  
  return (
    <Button
      onClick={onClick}
      height="48px"
      fontSize="16px"
      px="24px"
      bg={colorMode === 'light' ? "brand.primary.light" : "brand.primary.dark"}
      color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
      borderRadius="full"
      border="1px solid"
      borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
      fontWeight={700}
      textTransform="uppercase"
      transition="0.3s"
      boxShadow={colorMode === 'light' 
        ? "0 4px 0 0 black"
        : "0 4px 0 0 rgba(255, 255, 255, 0.2)"
      }
      _hover={{
        transform: 'translateY(2px)',
        boxShadow: colorMode === 'light'
          ? "0 2px 0 0 black"
          : "0 2px 0 0 rgba(255, 255, 255, 0.2)",
      }}
      _active={{
        transform: 'translateY(4px)',
        boxShadow: 'none',
      }}
    >
      {children}
    </Button>
  );
};

const formatIncorrectQuestions = (incorrectQuestions) => {
  if (incorrectQuestions.length === 0) return '';

  const sortedQuestions = incorrectQuestions.sort((a, b) => {
    const [aTopic, aQ] = a.split(' ');
    const [bTopic, bQ] = b.split(' ');
    return aTopic.localeCompare(bTopic) || parseInt(aQ.slice(1)) - parseInt(bQ.slice(1));
  });

  let result = [];
  let currentTopic = '';
  let currentRange = [];

  sortedQuestions.forEach((q, index) => {
    const [topic, questionNum] = q.split(' ');
    if (topic !== currentTopic) {
      if (currentRange.length > 0) {
        result.push(formatRange(currentTopic, currentRange));
      }
      currentTopic = topic;
      currentRange = [parseInt(questionNum.slice(1))];
    } else {
      const prevNum = currentRange[currentRange.length - 1];
      const currentNum = parseInt(questionNum.slice(1));
      if (currentNum !== prevNum + 1 && currentRange.length > 0) {
        result.push(formatRange(currentTopic, currentRange));
        currentRange = [currentNum];
      } else {
        currentRange.push(currentNum);
      }
    }

    if (index === sortedQuestions.length - 1) {
      result.push(formatRange(currentTopic, currentRange));
    }
  });

  return result.join(', ');
};

const formatRange = (topic, range) => {
  if (range.length === 1) {
    return `${topic} Q${range[0]}`;
  } else if (range.length === 2) {
    return `${topic} Q${range[0]}, ${topic} Q${range[1]}`;
  } else {
    return `${topic} Q${range[0]}-${topic} Q${range[range.length - 1]}`;
  }
};

const ResultsModal = ({ isOpen, onClose, results }) => {
  const { colorMode } = useColorMode();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent
        borderRadius="20px"
        border="1px solid"
        borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
        boxShadow={colorMode === 'light'
          ? "0 8px 0 0 black"
          : "0 8px 0 0 rgba(255, 255, 255, 0.2)"
        }
        bg={colorMode === 'light' ? "brand.background.light" : "brand.surface.dark"}
        p={6}
      >
        <Flex justifyContent="flex-end">
          <CloseButton onClick={onClose} />
        </Flex>
        <ModalHeader
          fontFamily="heading"
          fontWeight="bold"
          fontSize="24px"
          pb={4}
          color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
        >
          Exam Results
        </ModalHeader>
        <ModalBody>
          {results ? (
            <VStack spacing={4} align="stretch">
              <HStack justifyContent="space-between">
                <Text fontWeight="bold" color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}>
                  Score:
                </Text>
                <Text color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}>
                  {results.score}%
                </Text>
              </HStack>
              <Progress 
                value={results.score} 
                colorScheme={results.passed ? "green" : "red"}
                bg={colorMode === 'light' ? "brand.surface.light" : "brand.background.dark"}
              />
              <HStack justifyContent="space-between">
                <Text fontWeight="bold" color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}>
                  Result:
                </Text>
                <StatusBadge status={results.passed ? "PASSED" : "FAILED"} />
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontWeight="bold" color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}>
                  Correct Answers:
                </Text>
                <Text color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}>
                  {results.correct_answers} / {results.total_questions}
                </Text>
              </HStack>
              {results.incorrect_questions.length > 0 && (
                <VStack align="stretch">
                  <Text fontWeight="bold" color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}>
                    Incorrect Questions:
                  </Text>
                  <Text color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}>
                    {formatIncorrectQuestions(results.incorrect_questions)}
                  </Text>
                </VStack>
              )}
            </VStack>
          ) : (
            <VStack spacing={4} align="center">
              <Text color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}>
                Loading results...
              </Text>
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          <Flex justifyContent="flex-end" width="100%">
            <CustomButton onClick={onClose}>
              Close
            </CustomButton>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResultsModal;