import React, { useState } from 'react';
import { Box, Text, Flex, Button, SimpleGrid } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const TopicButton = ({ topic, isSelected, onClick }) => (
  <Button
    onClick={() => onClick(topic)}
    width="100%"
    height="40px"
    backgroundColor={isSelected ? "#00bfff" : "white"}
    color="black"
    fontWeight={700}
    fontSize="12px"
    borderRadius="8px"
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
  const topicsPerPage = 10;
  const totalPages = Math.ceil(topics.length / topicsPerPage);

  const visibleTopics = topics.slice(
    currentPage * topicsPerPage,
    (currentPage + 1) * topicsPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === 'left') {
      setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
    } else {
      setCurrentPage((prevPage) => Math.min(totalPages - 1, prevPage + 1));
    }
  };

  return (
    <Box
      width="100%"
      bg="#f2f2f3"
      borderRadius="16px"
      border="1px solid black"
      boxShadow="0 4px 0 0 black"
      p={3}
    >
      <Text fontSize="18px" fontWeight="700" color="black" mb={2}>
        Topics
      </Text>
      <SimpleGrid columns={5} spacing={2} mb={3}>
        {visibleTopics.map((topic) => (
          <TopicButton
            key={topic}
            topic={topic}
            isSelected={currentTopic === topic}
            onClick={onTopicChange}
          />
        ))}
      </SimpleGrid>
      <Flex justifyContent="space-between" alignItems="center">
        <Button
          onClick={() => handlePageChange('left')}
          isDisabled={currentPage === 0}
          leftIcon={<ChevronLeftIcon />}
          size="sm"
          backgroundColor="white"
          color="black"
          fontWeight={700}
          fontSize="12px"
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
        <Text fontWeight="bold" fontSize="14px">
          Page {currentPage + 1} of {totalPages}
        </Text>
        <Button
          onClick={() => handlePageChange('right')}
          isDisabled={currentPage === totalPages - 1}
          rightIcon={<ChevronRightIcon />}
          size="sm"
          backgroundColor="white"
          color="black"
          fontWeight={700}
          fontSize="12px"
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