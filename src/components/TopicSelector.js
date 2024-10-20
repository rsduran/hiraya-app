import React, { useState, useRef, useEffect } from 'react';
import { Box, Text, Flex, Button, VStack } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const CONTAINER_HEIGHT = "300px";
const TOPICS_PER_PAGE = 10;

const TopicButton = ({ topic, isSelected, onClick }) => (
  <Button
    onClick={() => onClick(topic)}
    width="100%"
    height="40px"
    backgroundColor={isSelected ? "#00bfff" : "white"}
    color="black"
    fontWeight={700}
    fontSize="14px"
    borderRadius="10px"
    border="1px solid black"
    boxShadow={isSelected ? "none" : "0 2px 0 0 black"}
    _hover={{
      backgroundColor: isSelected ? "#00a6d6" : "#e6f7f9",
      transform: "translateY(1px)",
      boxShadow: isSelected ? "none" : "0 1px 0 0 black",
    }}
    _active={{
      transform: "translateY(2px)",
      boxShadow: "none",
    }}
    transition="all 0.2s"
  >
    Topic {topic}
  </Button>
);

const TopicSelector = ({ topics, currentTopic, onTopicChange }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollContainerRef = useRef(null);
  const totalPages = Math.ceil(topics.length / TOPICS_PER_PAGE);

  const handlePageChange = (direction) => {
    setCurrentPage(prevPage => {
      const newPage = direction === 'left'
        ? Math.max(0, prevPage - 1)
        : Math.min(totalPages - 1, prevPage + 1);
      return newPage;
    });
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  return (
    <Box
      width="100%"
      bg="#f2f2f3"
      borderRadius="20px"
      border="1px solid black"
      boxShadow="0 4px 0 0 black"
      p={4}
    >
      <Text fontSize="24px" fontWeight="700" color="black" mb={4}>
        Topics
      </Text>
      <Box
        ref={scrollContainerRef}
        overflowY="auto"
        height={CONTAINER_HEIGHT}
        mb={4}
        css={{
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        <VStack spacing={3} align="stretch" padding={2}>
          {topics.slice(currentPage * TOPICS_PER_PAGE, (currentPage + 1) * TOPICS_PER_PAGE).map((topic) => (
            <TopicButton
              key={topic}
              topic={topic}
              isSelected={currentTopic === topic}
              onClick={onTopicChange}
            />
          ))}
        </VStack>
      </Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Button
          onClick={() => handlePageChange('left')}
          isDisabled={currentPage === 0}
          leftIcon={<ChevronLeftIcon />}
          size="sm"
          backgroundColor="white"
          color="black"
          fontWeight={700}
          fontSize="14px"
          borderRadius="full"
          border="1px solid black"
          boxShadow="0 2px 0 0 black"
          _hover={{
            backgroundColor: "#e6f7f9",
            transform: "translateY(1px)",
            boxShadow: "0 1px 0 0 black",
          }}
          _active={{
            transform: "translateY(2px)",
            boxShadow: "none",
          }}
          _disabled={{
            opacity: 0.5,
            cursor: "not-allowed",
            boxShadow: "none",
          }}
        >
          Previous
        </Button>
        <Button
          onClick={() => handlePageChange('right')}
          isDisabled={currentPage === totalPages - 1}
          rightIcon={<ChevronRightIcon />}
          size="sm"
          backgroundColor="white"
          color="black"
          fontWeight={700}
          fontSize="14px"
          borderRadius="full"
          border="1px solid black"
          boxShadow="0 2px 0 0 black"
          _hover={{
            backgroundColor: "#e6f7f9",
            transform: "translateY(1px)",
            boxShadow: "0 1px 0 0 black",
          }}
          _active={{
            transform: "translateY(2px)",
            boxShadow: "none",
          }}
          _disabled={{
            opacity: 0.5,
            cursor: "not-allowed",
            boxShadow: "none",
          }}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default TopicSelector;