import React, { useState } from 'react';
import { Box, Text, Flex, VStack, Tooltip, Image } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const colors = ["yellow.400", "red.300", "blue.300", "green.300"];

const transformImageUrl = (url) => {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://www.examtopics.com${url}`;
};

const VoteBar = ({ votes }) => {
  const totalVotes = votes.reduce((sum, vote) => sum + vote.count, 0);
  
  return (
    <Box width="100%" height="30px" borderRadius="md" overflow="hidden" position="relative">
      <Flex height="100%">
        {votes.map((vote, index) => {
          const percentage = (vote.count / totalVotes) * 100;
          const isSmall = percentage < 10;

          return (
            <Tooltip
              key={index}
              label={`${vote.answer}: ${percentage.toFixed(2)}%`}
              placement="top"
              hasArrow
              backgroundColor="gray.700"
              color="white"
              isDisabled={!isSmall}
            >
              <Box
                backgroundColor={colors[index]}
                width={`${percentage}%`}
                height="100%"
                position="relative"
                minWidth="1px"
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

const AnswerContent = ({ content, isAnswer }) => {
  const parsedContent = content.split(/<br>|<br\/>/).map((part, index) => {
    if (part.startsWith('<img')) {
      const srcMatch = part.match(/src="([^"]+)"/);
      if (srcMatch) {
        const src = transformImageUrl(srcMatch[1]);
        return <Image key={index} src={src} alt="Answer content" />;
      }
    }
    const textContent = part.replace(/<[^>]*>/g, '');
    if (index === 0 && isAnswer) {
      return (
        <Text key={index} fontSize="24px" fontWeight="700" color="black">
          {textContent}
        </Text>
      );
    }
    return (
      <Text key={index} fontSize="16px" color="black">
        {textContent}
      </Text>
    );
  });

  return <>{parsedContent}</>;
};

const AnswerBox = ({ answer, answerDescription, votes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      width="100%"
      backgroundColor="#f2f2f3"
      borderRadius="20px"
      border="1px solid black"
      boxShadow="0 4px 0 0 black"
      position="relative"
      overflow="hidden"
      marginTop={4}
    >
      <Flex 
        justifyContent="space-between" 
        alignItems="center" 
        padding={6}
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
            <VStack spacing={4} align="stretch" paddingX={6} paddingBottom={6}>
              <AnswerContent content={answer} isAnswer={true} />
              {answerDescription && (
                <AnswerContent content={answerDescription} isAnswer={false} />
              )}
              <Text fontSize="24px" fontWeight="700" color="black">Votes:</Text>
              <VoteBar votes={votes} />
            </VStack>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default AnswerBox;