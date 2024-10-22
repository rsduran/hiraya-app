import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Box, Text, Button, Tooltip } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const CategoryItem = React.memo(({ category, isSelected, onClick }) => {
  const itemRef = useRef(null);
  const [isItemTruncated, setIsItemTruncated] = useState(false);

  useEffect(() => {
    if (itemRef.current) {
      setIsItemTruncated(itemRef.current.scrollWidth > itemRef.current.clientWidth);
    }
  }, []);

  return (
    <Tooltip label={category} isDisabled={!isItemTruncated}>
      <Box
        padding={3}
        cursor="pointer"
        backgroundColor={isSelected ? "#00bfff" : "white"}
        _hover={{
          backgroundColor: isSelected ? "#00bfff" : "#b3ebf2",
        }}
        onClick={onClick}
      >
        <Text
          ref={itemRef}
          fontWeight={700}
          fontSize="16px"
          lineHeight="19px"
          color="black"
          isTruncated
        >
          {category}
        </Text>
      </Box>
    </Tooltip>
  );
});

const CategoriesDropdown = ({ categories, selectedCategory, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [selectedCategory]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (category) => {
    onSelect(category);
    setIsOpen(false);
  };

  const sortedCategories = useMemo(() => {
    // Separate "All Categories", "Other Certifications" and regular categories
    const allCategories = categories.find(cat => cat === "All Categories");
    const otherCertifications = categories.find(cat => cat === "Other Certifications");
    const regularCategories = categories.filter(cat => 
      cat !== "Other Certifications" && cat !== "All Categories"
    );
    
    // Sort regular categories alphabetically
    const sortedRegular = regularCategories.sort((a, b) => a.localeCompare(b));
    
    // Combine them in the desired order, ensuring "All Categories" is first
    return [
      allCategories || "All Categories", // Always include "All Categories"
      ...sortedRegular,
      otherCertifications
    ].filter(Boolean);
  }, [categories]);

  return (
    <Box position="relative" width="100%">
      <Tooltip label={selectedCategory} isDisabled={!isTruncated}>
        <Button
          onClick={toggleDropdown}
          width="100%"
          backgroundColor="white"
          color="black"
          fontWeight={700}
          fontSize="16px"
          lineHeight="19px"
          borderRadius="10px"
          border="1px solid black"
          boxShadow="none"
          _hover={{
            backgroundColor: "#00bfff",
            boxShadow: "0 3px 0 0 black",
          }}
          _active={{
            backgroundColor: "#00bfff",
            boxShadow: "none",
          }}
          transition="all 0.2s"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          paddingLeft={4}
          paddingRight={4}
          paddingTop={3}
          paddingBottom={3}
        >
          <Text ref={textRef} isTruncated>{selectedCategory}</Text>
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Button>
      </Tooltip>
      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          width="100%"
          maxHeight="300px"
          backgroundColor="white"
          borderRadius="10px"
          border="1px solid black"
          marginTop={2}
          zIndex={1}
          overflowY="auto"
        >
          {sortedCategories.map((category, index) => (
            <CategoryItem
              key={index}
              category={category}
              isSelected={category === selectedCategory}
              onClick={() => handleSelect(category)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CategoriesDropdown;