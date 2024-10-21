import React, { useState } from 'react';
import { Box, Text, Flex, VStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const sanitizeOptionText = (text) => {
  // Remove all HTML tags, trim the text, and remove "Most Voted" label
  return text.replace(/<[^>]*>/g, '')
             .replace(/Most Voted/g, '')
             .trim();
};

const OptionBox = ({ option, isSelected, onClick, hasInteracted }) => (
  <motion.div
    onClick={onClick}
    style={{
      background: isSelected ? "#b3ebf2" : "white",
      borderRadius: "10px",
      border: "1px solid black",
      padding: "16px",
      cursor: "pointer",
      transition: "all 0.2s",
    }}
    whileHover={{
      background: isSelected ? "#b3ebf2" : "#e6f7f9",
    }}
    initial={hasInteracted ? { opacity: 0, y: -10 } : false}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
  >
    <Text fontWeight={700} fontSize="16px" lineHeight="19px" color="black">
      {sanitizeOptionText(option)}
    </Text>
  </motion.div>
);

const OptionsBox = ({ options }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setHasInteracted(true);
  };

  const handleSelect = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
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
          Options
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
                  isSelected={option === selectedOption}
                  onClick={() => handleSelect(option)}
                  hasInteracted={hasInteracted}
                />
              ))}
            </VStack>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default OptionsBox;