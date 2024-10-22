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
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import { IconBox } from './IconBox';

const StatusBadge = ({ status }) => {
  let bgGradient;
  let textColor = "black";
  switch (status) {
    case "PASSED":
      bgGradient = "linear(to-r, #4CAF50, #8BC34A)";
      break;
    case "FAILED":
      bgGradient = "linear(to-r, #FF5252, #FF8A80)";
      break;
    default:
      bgGradient = "linear(to-r, #FFD54F, #FFF176)";
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
      border="1px solid black"
      bgGradient={bgGradient}
    >
      <Text fontSize="14px" fontWeight="500" color={textColor}>
        {status}
      </Text>
    </Box>
  );
};

const CloseButton = ({ onClick }) => (
  <IconBox
    icon={FaTimes}
    size="24px"
    iconScale={0.7}
    withBorder={false}
    bgColor="transparent"
    onClick={onClick}
  />
);

const CustomButton = ({ children, onClick }) => (
  <Button
    onClick={onClick}
    height="48px"
    fontSize="16px"
    px="24px"
    bg="#00bfff"
    color="black"
    borderRadius="full"
    border="1px solid black"
    fontWeight={700}
    textTransform="uppercase"
    transition="0.3s"
    boxShadow="0 4px 0 0 black"
    _hover={{
      transform: 'translateY(2px)',
      boxShadow: '0 2px 0 0 black',
    }}
    _active={{
      transform: 'translateY(4px)',
      boxShadow: 'none',
    }}
  >
    {children}
  </Button>
);

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
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent
        borderRadius="20px"
        border="1px solid black"
        boxShadow="0 8px 0 0 black"
        p={6}
      >
        <Flex justifyContent="flex-end">
          <CloseButton onClick={onClose} />
        </Flex>
        <ModalHeader
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="bold"
          fontSize="24px"
          pb={4}
        >
          Exam Results
        </ModalHeader>
        <ModalBody>
          {results ? (
            <VStack spacing={4} align="stretch">
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">Score:</Text>
                <Text>{results.score}%</Text>
              </HStack>
              <Progress value={results.score} colorScheme={results.passed ? "green" : "red"} />
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">Result:</Text>
                <StatusBadge status={results.passed ? "PASSED" : "FAILED"} />
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">Correct Answers:</Text>
                <Text>{results.correct_answers} / {results.total_questions}</Text>
              </HStack>
              {results.incorrect_questions.length > 0 && (
                <VStack align="stretch">
                  <Text fontWeight="bold">Incorrect Questions:</Text>
                  <Text>{formatIncorrectQuestions(results.incorrect_questions)}</Text>
                </VStack>
              )}
            </VStack>
          ) : (
            <VStack spacing={4} align="center">
              <Text>Loading results...</Text>
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