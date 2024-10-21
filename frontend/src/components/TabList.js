import React, { useState } from 'react';
import { Box, Button, ButtonGroup, Flex, Text } from '@chakra-ui/react';
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";

const TabButton = ({ children, isSelected, ...props }) => (
  <Button
    variant="referral"
    backgroundColor={isSelected ? '#00bfff' : '#f2f2f3'}
    color={isSelected ? 'black' : 'gray.600'}
    {...props}
  >
    {children}
  </Button>
);

const NavIconBox = ({ icon: Icon, onClick, isDisabled }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const size = '40px';
  const iconScale = 0.5;
  const iconSize = `${parseInt(size) * iconScale}px`;
  const borderThickness = '0.5px';

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  return (
    <Box
      position="relative"
      width={size}
      height={size}
      onClick={isDisabled ? undefined : onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      cursor={isDisabled ? "not-allowed" : "pointer"}
      transition="all 0.1s ease"
      transform={isPressed && !isDisabled ? 'scale(0.95)' : 'scale(1)'}
      userSelect="none"
      opacity={isDisabled ? 0.5 : 1}
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        borderRadius="50%"
        border={borderThickness + " solid black"}
        backgroundColor="transparent"
      />
      <Flex
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
      >
        <Icon 
          size={iconSize} 
          color={isHovered && !isDisabled ? "#00bfff" : "black"} 
          transition="color 0.2s ease"
        />
      </Flex>
    </Box>
  );
};

const TabList = ({ 
  tabs, 
  onTabChange, 
  currentQuestionIndex, 
  totalQuestions, 
  onNavigateLeft, 
  onNavigateRight 
}) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  return (
    <Box backgroundColor="gray.50" display="flex" flexDirection="column" alignItems="center" width="100%" marginBottom={4}>
      <ButtonGroup isAttached variant="referral" width="100%" marginBottom={4}>
        {tabs.map((tab) => (
          <TabButton
            key={tab}
            isSelected={selectedTab === tab}
            onClick={() => handleTabChange(tab)}
            flex={1}
          >
            {tab}
          </TabButton>
        ))}
      </ButtonGroup>

      <Flex width="100%" justifyContent="space-between" alignItems="center" paddingY={4}>
        <NavIconBox 
          icon={PiArrowLeftBold} 
          onClick={onNavigateLeft} 
          isDisabled={currentQuestionIndex === 0}
        />
        <Text fontSize="lg" color="gray.600">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </Text>
        <NavIconBox 
          icon={PiArrowRightBold} 
          onClick={onNavigateRight} 
          isDisabled={currentQuestionIndex === totalQuestions - 1}
        />
      </Flex>
    </Box>
  );
};

export default TabList;