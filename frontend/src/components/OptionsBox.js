import React, { useState } from 'react';
import { Box, Text, Flex, VStack, useColorMode } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const sanitizeOptionText = (text) => {
  return text.replace(/<[^>]*>/g, '')
             .replace(/Most Voted/g, '')
             .trim();
};

const OptionBox = ({ option, isSelected, onClick, isDisabled }) => {
  const { colorMode } = useColorMode();
  
  return (
    <Box
      onClick={isDisabled ? undefined : onClick}
      bg={isSelected 
        ? colorMode === 'light' ? 'brand.primary.light' : 'brand.primary.dark'
        : colorMode === 'light' ? 'brand.background.light' : 'brand.surface.dark'
      }
      borderRadius="10px"
      border="1px solid"
      borderColor={colorMode === 'light' ? 'brand.border.light' : 'brand.border.dark'}
      padding="16px"
      cursor={isDisabled ? "not-allowed" : "pointer"}
      opacity={isDisabled ? 0.5 : 1}
      transition="all 0.15s ease"
      _hover={!isDisabled && {
        bg: isSelected 
          ? colorMode === 'light' ? 'brand.primary.light' : 'brand.primary.dark'
          : colorMode === 'light' ? 'brand.secondary.light' : 'brand.secondary.dark'
      }}
    >
      <Text 
        fontWeight={700} 
        fontSize="16px" 
        lineHeight="19px" 
        color={colorMode === 'light' ? 'brand.text.light' : 'brand.text.dark'}
      >
        {sanitizeOptionText(option)}
      </Text>
    </Box>
  );
};

const OptionsBox = ({ options, selectedOptions, onOptionSelect, maxSelections, isUnansweredTab }) => {
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (index) => {
    if (selectedOptions.includes(index)) {
      onOptionSelect(selectedOptions.filter(i => i !== index));
    } else if (selectedOptions.length < maxSelections) {
      onOptionSelect([...selectedOptions, index]);
    }
  };

  return (
    <Box
      width="100%"
      bg={colorMode === 'light' ? 'brand.surface.light' : 'brand.surface.dark'}
      borderRadius="20px"
      border="1px solid"
      borderColor={colorMode === 'light' ? 'brand.border.light' : 'brand.border.dark'}
      boxShadow={colorMode === 'light' 
        ? "0 4px 0 0 black"
        : "0 4px 0 0 rgba(255, 255, 255, 0.2)"}
      position="relative"
      overflow="hidden"
      marginTop={4}
    >
      <Flex 
        justifyContent="space-between" 
        alignItems="center" 
        padding={6}
        onClick={toggleDropdown} 
        cursor="pointer"
      >
        <Text 
          fontSize="24px" 
          fontWeight="700" 
          color={colorMode === 'light' ? 'brand.text.light' : 'brand.text.dark'}
        >
          Options (Select {maxSelections})
        </Text>
        {isOpen ? 
          <ChevronUpIcon 
            boxSize={6} 
            color={colorMode === 'light' ? 'brand.text.light' : 'brand.text.dark'} 
          /> : 
          <ChevronDownIcon 
            boxSize={6} 
            color={colorMode === 'light' ? 'brand.text.light' : 'brand.text.dark'} 
          />
        }
      </Flex>
      
      <Box
        height={isOpen ? 'auto' : '0'}
        transition="height 0.2s ease"
        overflow="hidden"
      >
        <VStack spacing={2} align="stretch" paddingX={6} paddingBottom={6}>
          {options.map((option, index) => (
            <OptionBox
              key={index}
              option={option}
              isSelected={selectedOptions.includes(index)}
              onClick={() => handleSelect(index)}
              isDisabled={!selectedOptions.includes(index) && selectedOptions.length >= maxSelections}
            />
          ))}
        </VStack>
        {isUnansweredTab && selectedOptions.length < maxSelections && (
          <Text 
            color={colorMode === 'light' ? 'red.500' : 'red.300'} 
            paddingX={6} 
            paddingBottom={4}
          >
            {maxSelections - selectedOptions.length} more selection{maxSelections - selectedOptions.length !== 1 ? 's' : ''} required
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default OptionsBox;