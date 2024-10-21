import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { PiSealFill, PiSeal, PiStar, PiStarFill } from 'react-icons/pi';
import { BsQuestionLg } from 'react-icons/bs';

// Generic IconBox component
const IconBox = ({ 
  icon: Icon,
  size = '48px', 
  iconScale = 0.5, 
  onClick, 
  withBorder = true, 
  borderThickness = 3,
  bgColor = 'white',
  isActive = false
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const iconSize = `${parseInt(size) * iconScale}px`;

  return (
    <Box 
      position="relative" 
      width={size} 
      height={size} 
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      cursor="pointer"
      transition="all 0.1s ease"
      transform={isPressed ? 'scale(0.95)' : 'scale(1)'}
      userSelect="none"
    >
      <PiSealFill size={size} color={isActive ? "#b3ebf2" : bgColor} />
      {withBorder && (
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
      )}
      <Flex
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        alignItems="center"
        justifyContent="center"
      >
        {Icon ? (
          <Icon size={iconSize} color="black" />
        ) : (
          <BsQuestionLg size={iconSize} color="black" />
        )}
      </Flex>
    </Box>
  );
};

// Specialized StarIconBox component
const StarIconBox = ({ size = '48px', iconScale = 0.5, onClick, isStarFilled }) => {
  const [isPressed, setIsPressed] = useState(false);
  const iconSize = `${parseInt(size) * iconScale}px`;

  return (
    <Box 
      position="relative" 
      width={size} 
      height={size} 
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      cursor="pointer"
      transition="all 0.1s ease"
      transform={isPressed ? 'scale(0.95)' : 'scale(1)'}
      userSelect="none"
    >
      <PiSealFill size={size} color="white" />
      <Flex
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        alignItems="center"
        justifyContent="center"
      >
        <Box position="relative" width={iconSize} height={iconSize}>
          {isStarFilled && (
            <PiStarFill 
              size={iconSize} 
              color="#FFD700" 
              style={{ position: 'absolute', top: 0, left: 0 }} 
            />
          )}
          <PiStar 
            size={iconSize} 
            color="black" 
            style={{ position: 'absolute', top: 0, left: 0 }} 
          />
        </Box>
      </Flex>
    </Box>
  );
};

export { IconBox, StarIconBox };