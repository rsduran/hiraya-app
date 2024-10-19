import React, { useState, useMemo, useRef } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { FixedSizeList as List } from 'react-window';

const ProviderDropdown = ({ providers, selectedProvider, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const textRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (provider) => {
    onSelect(provider);
    setIsOpen(false);
  };

  const sortedProviders = useMemo(() => {
    return ["All Providers", "Popular", "Top Picks", ...providers.sort((a, b) => a.localeCompare(b))];
  }, [providers]);

  return (
    <Box position="relative" width="100%">
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
        <Text ref={textRef} isTruncated>{selectedProvider}</Text>
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Button>
      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          width="100%"
          height="300px"
          backgroundColor="white"
          borderRadius="10px"
          border="1px solid black"
          marginTop={2}
          zIndex={1}
          overflow="hidden"
        >
          <List
            height={300}
            itemCount={sortedProviders.length}
            itemSize={40}
            width="100%"
          >
            {({ index, style }) => (
              <Box
                style={style}
                paddingTop={2}
                paddingBottom={2}
                paddingLeft={4}
                paddingRight={4}
                cursor="pointer"
                backgroundColor={sortedProviders[index] === selectedProvider ? "#00bfff" : "white"}
                _hover={{ 
                  backgroundColor: sortedProviders[index] === selectedProvider ? "#00bfff" : "#b3ebf2" 
                }}
                onClick={() => handleSelect(sortedProviders[index])}
                borderBottom={index < sortedProviders.length - 1 ? "1px solid #E2E8F0" : "none"}
              >
                <Text 
                  fontWeight={700} 
                  fontSize="16px" 
                  lineHeight="19px" 
                  color="black"
                  isTruncated
                >
                  {sortedProviders[index]}
                </Text>
              </Box>
            )}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default ProviderDropdown;