import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Box, Input, InputGroup, InputLeftElement, InputRightElement, Flex } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import { PiShuffle } from "react-icons/pi";
import { RxReset } from "react-icons/rx";
import { PiSealFill, PiSeal } from "react-icons/pi";
import { MdFormatListNumbered } from "react-icons/md";
import QuestionListDropdown from './QuestionListDropdown';

const SealedButton = React.memo(({ icon: Icon, onClick }) => {
  const [isPressed, setIsPressed] = useState(false);
  const size = '48px';
  const iconScale = 0.5;
  const iconSize = `${parseInt(size) * iconScale}px`;
  const borderThickness = 3;

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
});

const SearchBar = ({ 
  placeholder = "Search questions...", 
  onSearch, 
  onShuffle, 
  onReset, 
  currentQuestion, 
  onQuestionSelect 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleQuestionSelect = (question) => {
    if (onQuestionSelect) {
      onQuestionSelect(question);
    }
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const questions = useMemo(() => Array.from({ length: 1000 }, (_, index) => `T1 Q${index + 1}`), []);

  return (
    <Flex width="100%" marginBottom={4} align="center" justify="space-between">
      <InputGroup size="lg" flex={1} marginRight={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          value={searchTerm}
          onChange={handleSearch}
          placeholder={placeholder}
          backgroundColor="white"
          border="1px solid black"
          borderRadius="12px"
          _focus={{
            boxShadow: '0 0 0 1px black',
            borderColor: 'black',
          }}
          _hover={{
            borderColor: 'black',
          }}
          fontFamily='"Karla Variable", sans-serif'
          fontWeight={500}
          fontSize="16px"
        />
        {searchTerm && (
          <InputRightElement>
            <CloseIcon color="gray.500" cursor="pointer" onClick={clearSearch} />
          </InputRightElement>
        )}
      </InputGroup>
      <Flex ref={dropdownRef}>
        <Box position="relative">
          <SealedButton icon={MdFormatListNumbered} onClick={toggleDropdown} />
          {isDropdownOpen && (
            <QuestionListDropdown
              questions={questions}
              currentQuestion="T1 Q1"
              onSelect={handleQuestionSelect}
            />
          )}
        </Box>
        <Box width="8px" />
        <SealedButton icon={PiShuffle} onClick={onShuffle} />
        <Box width="8px" />
        <SealedButton icon={RxReset} onClick={onReset} />
      </Flex>
    </Flex>
  );
};

export default SearchBar;