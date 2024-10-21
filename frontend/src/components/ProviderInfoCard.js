import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  Image,
  Tooltip,
} from "@chakra-ui/react";

const ProviderInfoCard = ({ provider, view }) => {
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

  if (view === "grid") {
    return (
      <Box
        backgroundColor="white"
        borderRadius="12px"
        border="1px solid black"
        boxShadow="0 4px 0 0 black"
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
          <Box width="100px" height="100px" display="flex" alignItems="center" justifyContent="center" marginBottom={4}>
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
          >
            {description}
          </Text>
          <Flex flexDirection="column" width="100%" alignItems="flex-start" marginBottom={4}>
            <Text fontSize="14px" color="gray.600">
              Total Exams: {totalExams}
            </Text>
            <Text fontSize="14px" color="gray.600">
              Total Questions: {totalQuestions}
            </Text>
          </Flex>
          <Box
            as="button"
            paddingX={4}
            paddingY={2}
            borderRadius="full"
            backgroundColor="#00bfff"
            color="black"
            fontWeight="bold"
            fontSize="14px"
            border="1px solid black"
            boxShadow="0 2px 0 0 black"
            _hover={{ backgroundColor: "#00a6d6" }}
            _active={{ boxShadow: "none", transform: "translateY(2px)" }}
            width="100%"
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
        borderBottom="1px solid #E2E8F0"
      >
        <Box width="80px" height="80px" display="flex" alignItems="center" justifyContent="center" marginRight={4}>
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
            >
              {name}
            </Text>
          </Tooltip>
          <Text fontSize="16px" color="gray.600">
            {description}
          </Text>
          <Text fontSize="14px" color="gray.600">
            Total Exams: {totalExams}
          </Text>
          <Text fontSize="14px" color="gray.600">
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
            backgroundColor="#00bfff"
            color="black"
            fontWeight="bold"
            fontSize="14px"
            border="1px solid black"
            boxShadow="0 2px 0 0 black"
            _hover={{ backgroundColor: "#00a6d6" }}
            _active={{ boxShadow: "none", transform: "translateY(2px)" }}
          >
            View Exams
          </Box>
        </Flex>
      </Flex>
    );
  }
};

export default ProviderInfoCard;