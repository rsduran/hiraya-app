import React, { useState } from 'react';
import { Box, Button, ButtonGroup, Flex, Text, useColorMode } from '@chakra-ui/react';
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";

const TabButton = ({ children, isSelected, ...props }) => {
  const { colorMode } = useColorMode();
  
  return (
    <Button
      variant="referral"
      bg={isSelected 
        ? colorMode === 'light' ? 'brand.primary.light' : 'brand.primary.dark'
        : colorMode === 'light' ? 'brand.surface.light' : 'brand.surface.dark'
      }
      color={isSelected 
        ? colorMode === 'light' ? 'brand.text.light' : 'brand.text.dark'
        : colorMode === 'light' ? 'gray.600' : 'gray.400'
      }
      _hover={{
        bg: isSelected
          ? colorMode === 'light' ? 'brand.primary.dark' : 'brand.primary.light'
          : colorMode === 'light' ? 'brand.secondary.light' : 'brand.secondary.dark'
      }}
      border="1px solid"
      borderColor={colorMode === 'light' ? 'brand.border.light' : 'brand.border.dark'}
      {...props}
    >
      {children}
    </Button>
  );
};

const NavIconBox = ({ icon: Icon, onClick, isDisabled }) => {
  const { colorMode } = useColorMode();
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const size = '40px';
  const iconScale = 0.5;
  const iconSize = `${parseInt(size) * iconScale}px`;
  const borderThickness = '0.5px';

  const handleMouseDown = () => {
    if (!isDisabled) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    if (!isDisabled) {
      setIsPressed(false);
    }
  };

  const handleMouseEnter = () => {
    if (!isDisabled) {
      setIsHovered(true);
    }
  };

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
        border={borderThickness + " solid"}
        borderColor={colorMode === 'light' ? 'brand.border.light' : 'brand.border.dark'}
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
          color={isHovered && !isDisabled 
            ? colorMode === 'light' ? 'brand.primary.light' : 'brand.primary.dark'
            : colorMode === 'light' ? 'brand.text.light' : 'brand.text.dark'
          } 
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
  onNavigateRight,
  isNavigationDisabled
}) => {
  const { colorMode } = useColorMode();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  const handleNavigateLeft = () => {
    if (!isNavigationDisabled && currentQuestionIndex > 0) {
      onNavigateLeft();
    }
  };

  const handleNavigateRight = () => {
    if (!isNavigationDisabled && currentQuestionIndex < totalQuestions - 1) {
      onNavigateRight();
    }
  };

  return (
    <Box 
      bg={colorMode === 'light' ? 'brand.background.light' : 'brand.background.dark'}
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      width="100%" 
      marginBottom={4}
    >
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
          onClick={handleNavigateLeft} 
          isDisabled={currentQuestionIndex === 0 || isNavigationDisabled}
        />
        <Text 
          fontSize="lg" 
          color={colorMode === 'light' ? 'brand.text.light' : 'brand.text.dark'}
        >
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </Text>
        <NavIconBox 
          icon={PiArrowRightBold} 
          onClick={handleNavigateRight} 
          isDisabled={currentQuestionIndex === totalQuestions - 1 || isNavigationDisabled}
        />
      </Flex>
    </Box>
  );
};

export default TabList;