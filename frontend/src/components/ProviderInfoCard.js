import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Flex,
  Image,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";

const ProviderInfoCard = ({ provider, view }) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const {
    name,
    description,
    image,
    totalExams,
    totalQuestions,
    isPopular,
  } = provider;

  // Hooks for text truncation
  const [isTruncatedGrid, setIsTruncatedGrid] = useState(false);
  const textRefGrid = useRef(null);

  const [isTruncatedList, setIsTruncatedList] = useState(false);
  const textRefList = useRef(null);

  useEffect(() => {
    if (view === "grid") {
      const textElement = textRefGrid.current;
      if (textElement) {
        const isOverflowing =
          textElement.scrollHeight > textElement.clientHeight;
        setIsTruncatedGrid(isOverflowing);
      }
    } else {
      const textElement = textRefList.current;
      if (textElement) {
        const isOverflowing =
          textElement.scrollWidth > textElement.clientWidth;
        setIsTruncatedList(isOverflowing);
      }
    }
  }, [name, view]);

  const handleViewExams = () => {
    navigate('/exams', { 
      state: { 
        selectedProvider: name,
        fromProviders: true
      }
    });
  };

  if (view === "grid") {
    return (
      <Box
        backgroundColor={colorMode === 'light' 
          ? "brand.background.light" 
          : "rgba(255, 255, 255, 0.05)"} // Slightly lighter than the dark background
        borderRadius="12px"
        border="1px solid"
        borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
        boxShadow={colorMode === 'light' 
          ? "0 4px 0 0 black"
          : "0 4px 0 0 rgba(255, 255, 255, 0.2)"}
        padding={4}
        width="300px"
        height="400px"
        flexShrink={0}
        display="flex"
        flexDirection="column"
        position="relative"
      >
        {isPopular && (
          <Box
            px={2}
            py={0}
            borderRadius="full"
            display="inline-block"
            alignSelf="center"
            border="1px solid black"
            bgGradient="linear(to-r, #FFD700, #FFA500)"
            position="absolute"
            top={2}
            right={2}
          >
            <Text fontSize="14px" fontWeight="500" color="black">
              Popular
            </Text>
          </Box>
        )}
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          height="100%"
        >
          <Box 
            width="100px" 
            height="100px" 
            display="flex" 
            alignItems="center" 
            justifyContent="center" 
            marginBottom={4}
            backgroundColor={colorMode === 'light' 
              ? "transparent"
              : "rgba(255, 255, 255, 0.1)"} // Slightly lighter background for logo area
            borderRadius="md"
            padding={2}
          >
            <Image
              src={image}
              alt={`${name} logo`}
              maxWidth="100%"
              maxHeight="100%"
              objectFit="contain"
            />
          </Box>
          <Tooltip label={name} isDisabled={!isTruncatedGrid}>
            <Text
              ref={textRefGrid}
              fontSize="18px"
              fontWeight="bold"
              textAlign="center"
              marginBottom={2}
              lineHeight="1.2"
              height="2.4em"
              overflow="hidden"
              textOverflow="ellipsis"
              display="-webkit-box"
              color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
              sx={{
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {name}
            </Text>
          </Tooltip>
          <Text
            fontSize="16px"
            textAlign="center"
            marginBottom={4}
            color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
          >
            {description}
          </Text>
          <Flex flexDirection="column" width="100%" alignItems="flex-start" marginBottom={4}>
            <Text 
              fontSize="14px" 
              color={colorMode === 'light' ? "gray.600" : "gray.400"}
            >
              Total Exams: {totalExams}
            </Text>
            <Text 
              fontSize="14px" 
              color={colorMode === 'light' ? "gray.600" : "gray.400"}
            >
              Total Questions: {totalQuestions}
            </Text>
          </Flex>
          <Box
            as="button"
            paddingX={4}
            paddingY={2}
            borderRadius="full"
            backgroundColor={colorMode === 'light' ? "brand.primary.light" : "brand.primary.dark"}
            color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
            fontWeight="bold"
            fontSize="14px"
            border="1px solid"
            borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
            boxShadow={colorMode === 'light' 
              ? "0 2px 0 0 black"
              : "0 2px 0 0 rgba(255, 255, 255, 0.2)"}
            _hover={{ 
              backgroundColor: colorMode === 'light' 
                ? "brand.primary.dark" 
                : "brand.primary.light"
            }}
            _active={{ 
              boxShadow: "none", 
              transform: "translateY(2px)" 
            }}
            width="100%"
            onClick={handleViewExams}
          >
            View Exams
          </Box>
        </Flex>
      </Box>
    );
  } else {
    return (
      <Flex
        alignItems="center"
        paddingY={4}
        paddingX={4}
        borderBottom="1px solid"
        borderColor={colorMode === 'light' ? "gray.200" : "gray.600"}
        backgroundColor={colorMode === 'light' 
          ? "transparent" 
          : "rgba(255, 255, 255, 0.05)"} // Slightly lighter for list view as well
      >
        <Box 
          width="80px" 
          height="80px" 
          display="flex" 
          alignItems="center" 
          justifyContent="center" 
          marginRight={4}
          backgroundColor={colorMode === 'light' 
            ? "transparent"
            : "rgba(255, 255, 255, 0.1)"} // Slightly lighter background for logo area
          borderRadius="md"
          padding={2}
        >
          <Image
            src={image}
            alt={`${name} logo`}
            maxWidth="100%"
            maxHeight="100%"
            objectFit="contain"
          />
        </Box>
        <Box flex="1">
          <Tooltip label={name} isDisabled={!isTruncatedList}>
            <Text
              ref={textRefList}
              fontSize="18px"
              fontWeight="bold"
              isTruncated
              color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
            >
              {name}
            </Text>
          </Tooltip>
          <Text 
            fontSize="16px" 
            color={colorMode === 'light' ? "gray.600" : "gray.400"}
          >
            {description}
          </Text>
          <Text 
            fontSize="14px" 
            color={colorMode === 'light' ? "gray.600" : "gray.400"}
          >
            Total Exams: {totalExams}
          </Text>
          <Text 
            fontSize="14px" 
            color={colorMode === 'light' ? "gray.600" : "gray.400"}
          >
            Total Questions: {totalQuestions}
          </Text>
        </Box>
        <Flex alignItems="center">
          {isPopular && (
            <Box
              px={2}
              py={0}
              borderRadius="full"
              display="inline-block"
              border="1px solid black"
              bgGradient="linear(to-r, #FFD700, #FFA500)"
              marginRight={2}
            >
              <Text fontSize="14px" fontWeight="500" color="black">
                Popular
              </Text>
            </Box>
          )}
          <Box
            as="button"
            paddingX={4}
            paddingY={2}
            borderRadius="full"
            backgroundColor={colorMode === 'light' ? "brand.primary.light" : "brand.primary.dark"}
            color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
            fontWeight="bold"
            fontSize="14px"
            border="1px solid"
            borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
            boxShadow={colorMode === 'light' 
              ? "0 2px 0 0 black"
              : "0 2px 0 0 rgba(255, 255, 255, 0.2)"}
            _hover={{ 
              backgroundColor: colorMode === 'light' 
                ? "brand.primary.dark" 
                : "brand.primary.light"
            }}
            _active={{ 
              boxShadow: "none", 
              transform: "translateY(2px)" 
            }}
            onClick={handleViewExams}
          >
            View Exams
          </Box>
        </Flex>
      </Flex>
    );
  }
};

export default ProviderInfoCard;