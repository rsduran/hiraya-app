import React from 'react';
import { Flex, Text, Box, useColorMode } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { colorMode } = useColorMode();

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
        color={currentPage === 1 
          ? colorMode === 'light' ? "gray.400" : "gray.600"
          : colorMode === 'light' ? "brand.text.light" : "brand.text.dark"
        }
        fontWeight="bold"
        _hover={{ 
          color: currentPage === 1 
            ? colorMode === 'light' ? "gray.400" : "gray.600"
            : colorMode === 'light' ? "brand.primary.light" : "brand.primary.dark"
        }}
        _active={{ 
          color: currentPage === 1 
            ? colorMode === 'light' ? "gray.400" : "gray.600"
            : colorMode === 'light' ? "brand.primary.dark" : "brand.primary.light"
        }}
        cursor={currentPage === 1 ? "not-allowed" : "pointer"}
      >
        <ChevronLeftIcon marginRight={1} />
        Previous
      </Flex>
      {pageNumbers.map((number, index) => (
        number === '...' ? (
          <Text 
            key={index} 
            marginX={1}
            color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
          >
            ...
          </Text>
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
            backgroundColor={currentPage === number 
              ? colorMode === 'light' ? "brand.primary.light" : "brand.primary.dark"
              : colorMode === 'light' ? "brand.background.light" : "rgba(255, 255, 255, 0.2)"
            }
            color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
            fontWeight="bold"
            border="1px solid"
            borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
            boxShadow={colorMode === 'light'
              ? "0 2px 0 0 black"
              : "0 2px 0 0 rgba(255, 255, 255, 0.2)"
            }
            onClick={() => onPageChange(number)}
            _hover={{ 
              backgroundColor: currentPage === number 
                ? colorMode === 'light' ? "brand.primary.light" : "brand.primary.dark"
                : colorMode === 'light' ? "brand.secondary.light" : "brand.secondary.dark"
            }}
            _active={{ 
              boxShadow: "none", 
              transform: "translateY(2px)" 
            }}
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
        color={currentPage === totalPages 
          ? colorMode === 'light' ? "gray.400" : "gray.600"
          : colorMode === 'light' ? "brand.text.light" : "brand.text.dark"
        }
        fontWeight="bold"
        _hover={{ 
          color: currentPage === totalPages 
            ? colorMode === 'light' ? "gray.400" : "gray.600"
            : colorMode === 'light' ? "brand.primary.light" : "brand.primary.dark"
        }}
        _active={{ 
          color: currentPage === totalPages 
            ? colorMode === 'light' ? "gray.400" : "gray.600"
            : colorMode === 'light' ? "brand.primary.dark" : "brand.primary.light"
        }}
        cursor={currentPage === totalPages ? "not-allowed" : "pointer"}
      >
        Next
        <ChevronRightIcon marginLeft={1} />
      </Flex>
    </Flex>
  );
};

export default Pagination;