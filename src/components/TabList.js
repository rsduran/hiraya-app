import React, { useState } from 'react';
import { Box, Button, ButtonGroup, Flex, Text } from '@chakra-ui/react';
import { PiArrowLeftBold, PiArrowRightBold, PiSealFill, PiSeal } from "react-icons/pi";

const TabButton = ({ children, isSelected, ...props }) => (
  <Button
    variant="referral"
    bg={isSelected ? '#00bfff' : '#f2f2f3'}
    color={isSelected ? 'black' : 'gray.600'}
    {...props}
  >
    {children}
  </Button>
);

const NavIconBox = ({ icon: Icon, onClick }) => {
  const [isPressed, setIsPressed] = useState(false);
  const size = '48px';
  const iconScale = 0.5;
  const iconSize = `${parseInt(size) * iconScale}px`;
  const borderThickness = 3;

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  return (
    <Box
      position="relative"
      width={size}
      height={size}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      cursor="pointer"
      transition="all 0.1s ease"
      transform={isPressed ? 'scale(0.95)' : 'scale(1)'}
      userSelect="none"
    >
      <PiSealFill size={size} color="white" />
      <Box
        as={PiSeal}
        size={size}
        color="black"
        position="absolute"
        top="0"
        left="0"
        style={{
          width: size,
          height: size,
        }}
        sx={{
          svg: {
            strokeWidth: borderThickness,
            stroke: 'black',
            fill: 'none',
          },
          path: {
            strokeWidth: borderThickness,
            stroke: 'black',
            fill: 'none',
          },
        }}
      />
      <Flex
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        alignItems="center"
        justifyContent="center"
      >
        <Icon size={iconSize} color="black" />
      </Flex>
    </Box>
  );
};

const TabList = ({ tabs, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  return (
    <Box bg="white" display="flex" flexDirection="column" alignItems="center" width="100%" mb={4}>
      <ButtonGroup isAttached variant="referral" width="100%" mb={4}>
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

      <Flex width="100%" justifyContent="space-between" alignItems="center" py={4}>
        <NavIconBox icon={PiArrowLeftBold} onClick={() => console.log('Navigate left')} />
        <Text fontSize="lg" color="gray.600">
          {selectedTab}
        </Text>
        <NavIconBox icon={PiArrowRightBold} onClick={() => console.log('Navigate right')} />
      </Flex>
    </Box>
  );
};

export default TabList;