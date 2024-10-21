import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Flex justifyContent="center" alignItems="center" marginTop={8} marginBottom={4}>
      <Flex
        as="button"
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        alignItems="center"
        marginRight={2}
        color={currentPage === 1 ? "gray.400" : "black"}
        fontWeight="bold"
        _hover={{ color: currentPage === 1 ? "gray.400" : "#00bfff" }}
        _active={{ color: currentPage === 1 ? "gray.400" : "#0095cc" }}
        cursor={currentPage === 1 ? "not-allowed" : "pointer"}
      >
        <ChevronLeftIcon marginRight={1} />
        Previous
      </Flex>
      {pageNumbers.map((number, index) => (
        number === '...' ? (
          <Text key={index} marginX={1}>...</Text>
        ) : (
          <Box
            key={index}
            as="button"
            marginX={1}
            width="40px"
            height="40px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="lg"
            backgroundColor={currentPage === number ? "#00bfff" : "white"}
            color="black"
            fontWeight="bold"
            border="1px solid black"
            boxShadow="0 2px 0 0 black"
            onClick={() => onPageChange(number)}
            _hover={{ backgroundColor: currentPage === number ? "#00bfff" : "#b3ebf2" }}
            _active={{ boxShadow: "none", transform: "translateY(2px)" }}
          >
            {number}
          </Box>
        )
      ))}
      <Flex
        as="button"
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        alignItems="center"
        marginLeft={2}
        color={currentPage === totalPages ? "gray.400" : "black"}
        fontWeight="bold"
        _hover={{ color: currentPage === totalPages ? "gray.400" : "#00bfff" }}
        _active={{ color: currentPage === totalPages ? "gray.400" : "#0095cc" }}
        cursor={currentPage === totalPages ? "not-allowed" : "pointer"}
      >
        Next
        <ChevronRightIcon marginLeft={1} />
      </Flex>
    </Flex>
  );
};

export default Pagination;