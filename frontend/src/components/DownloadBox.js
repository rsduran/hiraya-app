import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { FaFileDownload, FaChevronRight } from "react-icons/fa";

const DownloadBox = () => {

  return (
    <Box position="relative" width="100%" maxWidth="2xl" mx="auto">
      <Box
        width="100%"
        height="auto"
        py={12}
        bg="gray.100"
        borderRadius="20px"
        border="1px solid black"
        boxShadow="0 4px 0 0 black"
        position="relative"
        overflow="hidden"
        display="flex"
        justifyContent="center"
        alignItems="center"
        cursor="not-allowed"  // This brings back the disabled cursor
      >
        <VStack spacing={2} color="gray.500" textAlign="center">
          <FaFileDownload size="32px" />
          <Text fontSize="2xl" fontWeight="semibold">Download exam questions</Text>
          <Text fontSize="lg" fontWeight="bold">PDF</Text>  {/* Bolded PDF text */}
        </VStack>
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="gray.100"
          opacity="0.7"
          zIndex="1"
        />
      </Box>
      
      <Box
        as="button"
        position="absolute"
        top="-20px"
        right="-20px"
        transform="rotate(12deg)"
        bgGradient="linear(to-r, #ffaa40, #9c40ff, #ffaa40)"
        color="white"
        fontWeight="bold"
        fontSize="lg"
        borderRadius="full"
        px={6}
        py={3}
        border="1px solid black"
        boxShadow="0 2px 0 0 black"
        _hover={{
          bgGradient: "linear(to-r, #ff9020, #7c20ff, #ff9020)",
        }}
        _active={{
          boxShadow: "none",
          transform: "rotate(12deg) translateY(2px)",
        }} 
        zIndex="2"
        cursor="pointer"  // Ensure the button has a pointer cursor
      >
        🎉 Go Premium! <Box as={FaChevronRight} display="inline-block" ml={1} />
      </Box>
    </Box>
  );
};

export default DownloadBox;
