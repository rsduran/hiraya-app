import React from 'react';
import { Box, Flex, Text, Button, VStack, Link } from '@chakra-ui/react';
import { FaApple, FaAndroid, FaHeart } from 'react-icons/fa';
import CustomDashboardTable from './CustomDashboardTable';

const WelcomeComponent = ({ users, countries }) => (
  <Box
    width="100%"
    bgGradient="linear(to-r, #00bfff, #0080ff)"
    borderRadius={{ base: "10px", md: "20px" }}
    border="1px solid black"
    boxShadow="0 4px 0 0 black"
    p={{ base: 4, md: 6 }}
    mb={{ base: 4, md: 8 }}
    position="relative"
    overflow="hidden"
  >
    <Box
      position="absolute"
      top={{ base: "-10px", md: "-20px" }}
      right={{ base: "-10px", md: "-20px" }}
      width={{ base: "100px", md: "150px" }}
      height={{ base: "100px", md: "150px" }}
      borderRadius="full"
      backgroundColor="rgba(255, 255, 255, 0.1)"
    />
    <Flex 
      justifyContent="space-between" 
      alignItems="center"
      flexDirection={{ base: "column", md: "row" }}
    >
      <VStack align={{ base: "center", md: "flex-start" }} spacing={2} mb={{ base: 4, md: 0 }}>
        <Text fontSize={{ base: "24px", md: "32px" }} fontWeight="800" color="white" textAlign={{ base: "center", md: "left" }}>
          Welcome to Hiraya
        </Text>
        <Text fontSize={{ base: "16px", md: "18px" }} fontWeight="500" color="white" textAlign={{ base: "center", md: "left" }}>
          Empowering your learning journey
        </Text>
      </VStack>
      <Flex>
        <Box mr={{ base: 4, md: 8 }} textAlign="center">
          <Text fontSize={{ base: "32px", md: "40px" }} fontWeight="800" color="white">
            {users}M+
          </Text>
          <Text fontSize={{ base: "14px", md: "16px" }} fontWeight="600" color="white">
            Users
          </Text>
        </Box>
        <Box textAlign="center">
          <Text fontSize={{ base: "32px", md: "40px" }} fontWeight="800" color="white">
            {countries}+
          </Text>
          <Text fontSize={{ base: "14px", md: "16px" }} fontWeight="600" color="white">
            Countries
          </Text>
        </Box>
      </Flex>
    </Flex>
  </Box>
);

const CustomButton = ({ children, leftIcon, ...props }) => (
  <Button
    height="48px"
    fontSize={{ base: "14px", md: "16px" }}
    px={{ base: "16px", md: "24px" }}
    backgroundColor="white"
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
    leftIcon={leftIcon}
    {...props}
  >
    {children}
  </Button>
);

const MobileAppsComing = () => (
  <Box
    width="100%"
    bgGradient="linear(to-br, #FFB347, #ffcc33)"
    borderRadius={{ base: "10px", md: "20px" }}
    border="1px solid black"
    boxShadow="0 4px 0 0 black"
    p={{ base: 4, md: 6 }}
    mb={{ base: 4, md: 8 }}
    position="relative"
    overflow="hidden"
  >
    <Box
      position="absolute"
      bottom={{ base: "-15px", md: "-30px" }}
      left={{ base: "-15px", md: "-30px" }}
      width={{ base: "100px", md: "150px" }}
      height={{ base: "100px", md: "150px" }}
      borderRadius="full"
      backgroundColor="rgba(255, 255, 255, 0.1)"
    />
    <Flex 
      justifyContent="space-between" 
      alignItems="center"
      flexDirection={{ base: "column", md: "row" }}
    >
      <VStack align={{ base: "center", md: "flex-start" }} spacing={2} mb={{ base: 4, md: 0 }}>
        <Text fontSize={{ base: "24px", md: "28px" }} fontWeight="800" color="black" textAlign={{ base: "center", md: "left" }}>
          Mobile Apps Coming Soon
        </Text>
        <Text fontSize={{ base: "16px", md: "18px" }} fontWeight="500" color="black" textAlign={{ base: "center", md: "left" }}>
          Your learning journey, now in your pocket!
        </Text>
      </VStack>
      <Flex flexDirection={{ base: "column", sm: "row" }} mt={{ base: 4, md: 0 }}>
        <CustomButton leftIcon={<FaApple />} mb={{ base: 2, sm: 0 }} mr={{ base: 0, sm: 4 }}>
          iOS
        </CustomButton>
        <CustomButton leftIcon={<FaAndroid />}>
          Android
        </CustomButton>
      </Flex>
    </Flex>
  </Box>
);

const SupportDevelopers = () => (
  <Box
    width="100%"
    bgGradient="linear(to-r, #8BC34A, #4CAF50)"
    borderRadius={{ base: "10px", md: "20px" }}
    border="1px solid black"
    boxShadow="0 4px 0 0 black"
    p={{ base: 4, md: 6 }}
    mb={{ base: 4, md: 8 }}
    position="relative"
    overflow="hidden"
  >
    <Box
      position="absolute"
      top={{ base: "-15px", md: "-30px" }}
      right={{ base: "-15px", md: "-30px" }}
      width={{ base: "100px", md: "150px" }}
      height={{ base: "100px", md: "150px" }}
      borderRadius="full"
      backgroundColor="rgba(255, 255, 255, 0.1)"
    />
    <Flex 
      justifyContent="space-between" 
      alignItems="center"
      flexDirection={{ base: "column", md: "row" }}
    >
      <VStack align={{ base: "center", md: "flex-start" }} spacing={2} flex="1">
        <Text fontSize={{ base: "24px", md: "28px" }} fontWeight="800" color="white" textAlign={{ base: "center", md: "left" }}>
          Support the Developers
        </Text>
        <Text fontSize={{ base: "16px", md: "18px" }} fontWeight="500" color="white" textAlign={{ base: "center", md: "left" }}>
          Help us keep Hiraya ad-free and running 24/7, 365 days a year
        </Text>
        <Text fontSize={{ base: "14px", md: "16px" }} fontWeight="500" color="white" textAlign={{ base: "center", md: "left" }}>
          Your support helps cover recurring costs and keeps this website ad-free. Thank you for your generosity!
        </Text>
      </VStack>
      <Box ml={{ base: 0, md: 4 }} mt={{ base: 4, md: 0 }}>
        <CustomButton 
          leftIcon={<FaHeart />} 
          backgroundColor="#FF4081" 
          color="white" 
          _hover={{ backgroundColor: "#E91E63" }}
        >
          DONATE
        </CustomButton>
      </Box>
    </Flex>
  </Box>
);

const Dashboard = () => {
  return (
    <Box width="100%" px={{ base: 2, sm: 4, md: 6, lg: 8 }}>
      <WelcomeComponent users={2.0} countries={190} />
      <MobileAppsComing />
      <SupportDevelopers />
      <CustomDashboardTable />
    </Box>
  );
};

export default Dashboard;