import React, { useState } from 'react';
import { Box, Text, Flex, VStack, Tooltip } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const colors = ["yellow.400", "red.300", "blue.300", "green.300"];

const VoteBar = ({ votes }) => {
  const totalVotes = votes.reduce((sum, vote) => sum + vote.count, 0);
  
  return (
    <Box w="100%" h="30px" borderRadius="md" overflow="hidden" position="relative">
      <Flex h="100%">
        {votes.map((vote, index) => {
          const percentage = (vote.count / totalVotes) * 100;
          const isSmall = percentage < 10; // Threshold for small divisions

          return (
            <Tooltip
              key={index}
              label={`${vote.answer}: ${percentage.toFixed(2)}%`}
              placement="top"
              hasArrow
              bg="gray.700"
              color="white"
              isDisabled={!isSmall}
            >
              <Box
                bg={colors[index]}
                w={`${percentage}%`}
                h="100%"
                position="relative"
                minWidth="1px" // Ensure even very small percentages are visible
              >
                {!isSmall && (
                  <Text
                    position="absolute"
                    left={2}
                    top="50%"
                    transform="translateY(-50%)"
                    fontSize="14px"
                    fontWeight="bold"
                    color="black"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {vote.answer} {percentage.toFixed(2)}%
                  </Text>
                )}
              </Box>
            </Tooltip>
          );
        })}
      </Flex>
    </Box>
  );
};

const AnswerBox = ({ answer, answerDescription, votes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      w="100%"
      bg="#f2f2f3"
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
        p={6} // Updated padding to match other components
        onClick={toggleDropdown} 
        cursor="pointer"
      >
        <Text fontSize="24px" fontWeight="700" color="black">
          Answer
        </Text>
        {isOpen ? <ChevronUpIcon boxSize={6} /> : <ChevronDownIcon boxSize={6} />}
      </Flex>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <VStack spacing={4} align="stretch" px={6} pb={6}> {/* Updated padding */}
              <Text fontSize="20px" fontWeight="700" color="black">{answer}</Text>
              {answerDescription && (
                <Text fontSize="16px" color="black">{answerDescription}</Text>
              )}
              <Text fontSize="24px" fontWeight="700" color="black">Votes:</Text> {/* Updated font size */}
              <VoteBar votes={votes} />
            </VStack>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default AnswerBox;
