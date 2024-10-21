import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, VStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const sanitizeOptionText = (text) => {
  return text.replace(/<[^>]*>/g, '')
             .replace(/Most Voted/g, '')
             .trim();
};

const OptionBox = ({ option, isSelected, onClick, hasInteracted, isDisabled }) => (
  <motion.div
    onClick={isDisabled ? undefined : onClick}
    style={{
      background: isSelected ? "#b3ebf2" : "white",
      borderRadius: "10px",
      border: "1px solid black",
      padding: "16px",
      cursor: isDisabled ? "not-allowed" : "pointer",
      transition: "all 0.2s",
      opacity: isDisabled ? 0.5 : 1,
    }}
    whileHover={!isDisabled ? {
      background: isSelected ? "#b3ebf2" : "#e6f7f9",
    } : {}}
    initial={hasInteracted ? { opacity: 0, y: -10 } : false}
    animate={{ opacity: isDisabled ? 0.5 : 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
  >
    <Text fontWeight={700} fontSize="16px" lineHeight="19px" color="black">
      {sanitizeOptionText(option)}
    </Text>
  </motion.div>
);

const OptionsBox = ({ options, selectedOptions, onOptionSelect, maxSelections, isUnansweredTab }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    setHasInteracted(true);
  }, [selectedOptions]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setHasInteracted(true);
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
      backgroundColor="#f2f2f3"
      borderRadius="20px"
      border="1px solid black"
      boxShadow="0 4px 0 0 black"
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
        <Text fontSize="24px" fontWeight="700" color="black">
          Options (Select {maxSelections})
        </Text>
        {isOpen ? <ChevronUpIcon boxSize={6} /> : <ChevronDownIcon boxSize={6} />}
      </Flex>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={hasInteracted ? { height: 0 } : false}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <VStack spacing={2} align="stretch" paddingX={6} paddingBottom={6}>
              {options.map((option, index) => (
                <OptionBox
                  key={index}
                  option={option}
                  isSelected={selectedOptions.includes(index)}
                  onClick={() => handleSelect(index)}
                  hasInteracted={hasInteracted}
                  isDisabled={!selectedOptions.includes(index) && selectedOptions.length >= maxSelections}
                />
              ))}
            </VStack>
            {isUnansweredTab && selectedOptions.length < maxSelections && (
              <Text color="red.500" paddingX={6} paddingBottom={4}>
                {maxSelections - selectedOptions.length} more selection{maxSelections - selectedOptions.length !== 1 ? 's' : ''} required
              </Text>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default OptionsBox;