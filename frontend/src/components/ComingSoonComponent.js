import React, { useState } from 'react';
import { Box, Text, VStack, Input, Button, Flex, useToast } from '@chakra-ui/react';
import { RiMailSendLine } from 'react-icons/ri';

const ComingSoonComponent = () => {
  const [email, setEmail] = useState('');
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    toast({
      title: "You're on the list!",
      description: "We'll notify you when the Custom Exam feature is ready.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setEmail('');
  };

  return (
    <Flex
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="100%"
        maxW="800px"
        bgGradient="linear(to-br, #4158D0, #C850C0, #FFCC70)"
        borderRadius="20px"
        border="1px solid black"
        boxShadow="0 8px 0 0 black"
        position="relative"
        overflow="hidden"
        p={8}
      >
        <VStack spacing={6} align="stretch">
          <Text
            fontSize="48px"
            fontWeight="800"
            color="white"
            textAlign="center"
            fontFamily="'Space Grotesk', sans-serif"
            textShadow="2px 2px 4px rgba(0,0,0,0.3)"
          >
            Custom Exam
          </Text>
          <Text
            fontSize="28px"
            fontWeight="700"
            color="#FFCC70"
            textAlign="center"
            textShadow="1px 1px 2px rgba(0,0,0,0.2)"
          >
            Coming Soon!
          </Text>
          <Text fontSize="18px" color="white" textAlign="center" lineHeight="1.6">
            We're working hard to bring you the ability to create custom exams.
            <br />
            Enter your email below to be notified when this feature is ready!
          </Text>
          <form onSubmit={handleSubmit}>
            <Flex flexDirection="column" alignItems="center">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                bg="white"
                borderRadius="full"
                border="1px solid black"
                height="48px"
                width="100%"
                maxWidth="400px"
                mb={4}
                _focus={{
                  boxShadow: 'none',
                  borderColor: 'black',
                }}
              />
              <Button
                type="submit"
                height="48px"
                fontSize="16px"
                px="24px"
                bg="#FFCC70"
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
                leftIcon={<RiMailSendLine />}
              >
                Notify Me
              </Button>
            </Flex>
          </form>
        </VStack>
        <Box
          position="absolute"
          bottom="-50px"
          right="-50px"
          width="200px"
          height="200px"
          borderRadius="full"
          bg="rgba(255, 255, 255, 0.1)"
          zIndex={0}
        />
      </Box>
    </Flex>
  );
};

export default ComingSoonComponent;