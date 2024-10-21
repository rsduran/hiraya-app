import React from 'react';
import { Box, Text, VStack, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';

const SelectExamBox = () => {
  const navigate = useNavigate();

  return (
    <Flex width="100%" height="100%" alignItems="flex-start" justifyContent="center" paddingTop="50px">
      <Box
        width="100%"
        maxWidth="800px"
        bgGradient="linear(to-br, #8E2DE2, #4A00E0)"
        borderRadius="20px"
        border="1px solid black"
        boxShadow="0 8px 0 0 black"
        position="relative"
        overflow="hidden"
        padding={8}
      >
        <VStack spacing={6} align="stretch">
          <Text
            fontSize="48px"
            fontWeight="800"
            color="white"
            textAlign="center"
            fontFamily="'Space Grotesk', sans-serif"
            textShadow="2px 2px 4px rgba(0,0,0,0.2)"
          >
            Select an Exam
          </Text>
          <Text fontSize="20px" color="#E0E0E0" textAlign="center" lineHeight="1.6">
            Please select an exam to begin your practice session.
          </Text>
          <Flex justifyContent="center">
            <Button
              onClick={() => navigate("/exams")}
              height="48px"
              fontSize="16px"
              paddingLeft="24px"
              paddingRight="24px"
              backgroundColor="#4FD1C5"
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
                backgroundColor: "#45B7AB",
              }}
              _active={{
                transform: 'translateY(4px)',
                boxShadow: 'none',
              }}
              leftIcon={<FaPaperPlane />}
            >
              Go to Exams Page
            </Button>
          </Flex>
        </VStack>
        <Box
          position="absolute"
          bottom="-50px"
          right="-50px"
          width="200px"
          height="200px"
          borderRadius="full"
          backgroundColor="rgba(255, 255, 255, 0.1)"
          zIndex={0}
        />
      </Box>
    </Flex>
  );
};

export default SelectExamBox;