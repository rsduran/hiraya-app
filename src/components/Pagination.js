import React from 'react';
import { Flex, Button, Box } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Flex justifyContent="center" alignItems="center" mt={8} mb={4}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        mr={2}
        bg="transparent"
        color="black"
        _hover={{ color: currentPage === 1 ? "black" : "#00bfff" }}
        _active={{ color: currentPage === 1 ? "black" : "#0095cc" }}
        leftIcon={<ChevronLeftIcon />}
        variant="ghost"
        cursor={currentPage === 1 ? "not-allowed" : "pointer"}
      >
        Previous
      </Button>
      {pageNumbers.map((number) => (
        <Box
          key={number}
          as="button"
          mx={1}
          width="40px"
          height="40px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="lg"
          bg={currentPage === number ? "#00bfff" : "white"}
          color="black"
          fontWeight="bold"
          border="1px solid black"
          boxShadow="0 2px 0 0 black"
          onClick={() => onPageChange(number)}
          _hover={{ bg: currentPage === number ? "#00bfff" : "#b3ebf2" }}
          _active={{ boxShadow: "none", transform: "translateY(2px)" }}
        >
          {number}
        </Box>
      ))}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        ml={2}
        bg="transparent"
        color="black"
        _hover={{ color: currentPage === totalPages ? "black" : "#00bfff" }}
        _active={{ color: currentPage === totalPages ? "black" : "#0095cc" }}
        rightIcon={<ChevronRightIcon />}
        variant="ghost"
        cursor={currentPage === totalPages ? "not-allowed" : "pointer"}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;