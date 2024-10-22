import React, { useState, useRef, useEffect } from "react";
import { Box, Text, Progress, Flex, Tooltip, Image, useColorMode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getBadgeUrl } from "./BadgeUrls";

const ExamCard = React.memo(({ title, progress, totalQuestions, view, examId }) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const progressPercentage = (progress / totalQuestions) * 100;

  const BadgeImage = ({ size }) => (
    <Image
      src={getBadgeUrl(title)}
      alt="badge"
      width={`${size}px`}
      height={`${size}px`}
      objectFit="contain"
    />
  );

  const [isTruncatedGrid, setIsTruncatedGrid] = useState(false);
  const textRefGrid = useRef(null);

  const [isTruncatedList, setIsTruncatedList] = useState(false);
  const textRefList = useRef(null);

  useEffect(() => {
    if (view === "grid") {
      const textElement = textRefGrid.current;
      if (textElement) {
        const isOverflowing = textElement.scrollHeight > textElement.clientHeight;
        setIsTruncatedGrid(isOverflowing);
      }
    } else {
      const textElement = textRefList.current;
      if (textElement) {
        const isOverflowing = textElement.scrollWidth > textElement.clientWidth;
        setIsTruncatedList(isOverflowing);
      }
    }
  }, [title, view]);

  const handleContinue = () => {
    if (examId) {
      navigate(`/actual-exam/${examId}`);
    } else {
      console.error("Exam ID is undefined");
    }
  };

  const formatTitle = (title) => {
    const parts = title.split('-code-');
    if (parts.length === 2) {
      let [examName, examCode] = parts;
      if (examName.toLowerCase().includes("google")) {
        return examName;
      } else if (examName.toLowerCase().includes("microsoft")) {
        examCode = examCode.split('-').map((part, index) => {
          if (index === 0) {
            return part.toUpperCase();
          }
          if (index === 1 && ['DP', 'MD', 'AI'].includes(examCode.split('-')[0].toUpperCase())) {
            return part.toUpperCase();
          }
          return part;
        }).join('-');
        
        return `${examCode}: ${examName}`;
      } else {
        return `${examCode.toUpperCase()}: ${examName}`;
      }
    }
    return title;
  };

  const formattedTitle = formatTitle(title);

  if (view === "grid") {
    return (
      <Box
        backgroundColor={colorMode === 'light' ? "brand.background.light" : "brand.surface.dark"}
        borderRadius="12px"
        border="1px solid"
        borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
        boxShadow={colorMode === 'light' 
          ? "0 4px 0 0 black"
          : "0 4px 0 0 rgba(255, 255, 255, 0.2)"
        }
        padding={3}
        width={{ base: "100%", sm: "250px", md: "280px", lg: "300px" }}
        height="300px"
        flexShrink={0}
        display="flex"
        flexDirection="column"
      >
        <Tooltip label={formattedTitle} isDisabled={!isTruncatedGrid}>
          <Text
            ref={textRefGrid}
            fontSize={{ base: "14px", md: "16px", lg: "18px" }}
            fontWeight="bold"
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
            {formattedTitle}
          </Text>
        </Tooltip>
        <Box
          flexGrow={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginBottom={2}
        >
          <BadgeImage size={150} />
        </Box>
        <Progress
          value={progressPercentage}
          colorScheme="blue"
          marginBottom={2}
          height="8px"
          width="100%"
          borderRadius="4px"
          backgroundColor={colorMode === 'light' ? "gray.200" : "gray.600"}
        />
        <Flex justifyContent="space-between" alignItems="center">
          <Text
            fontSize={{ base: "12px", md: "13px", lg: "14px" }}
            color={colorMode === 'light' ? "gray.600" : "gray.400"}
          >
            {progress} / {totalQuestions} questions
          </Text>
          <Box
            as="button"
            paddingX={4}
            paddingY={1}
            borderRadius="full"
            backgroundColor={colorMode === 'light' ? "brand.primary.light" : "brand.primary.dark"}
            color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
            fontWeight="bold"
            fontSize={{ base: "12px", md: "13px", lg: "14px" }}
            border="1px solid"
            borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
            boxShadow={colorMode === 'light' 
              ? "0 2px 0 0 black"
              : "0 2px 0 0 rgba(255, 255, 255, 0.2)"
            }
            _hover={{ 
              backgroundColor: colorMode === 'light' ? "brand.primary.dark" : "brand.primary.light"
            }}
            _active={{ 
              boxShadow: "none", 
              transform: "translateY(2px)" 
            }}
            onClick={handleContinue}
          >
            Continue
          </Box>
        </Flex>
      </Box>
    );
  } else {
    return (
      <Flex
        alignItems="center"
        paddingY={2}
        paddingLeft={4}
        borderBottom="1px solid"
        borderColor={colorMode === 'light' ? "gray.200" : "gray.600"}
      >
        <Box width="80px" height="80px" marginRight={4} flexShrink={0}>
          <BadgeImage size={80} />
        </Box>
        <Box flex="1" minWidth="200px">
          <Tooltip label={formattedTitle} isDisabled={!isTruncatedList}>
            <Text
              ref={textRefList}
              fontSize={{ base: "14px", md: "16px", lg: "18px" }}
              fontWeight="bold"
              isTruncated
              color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
            >
              {formattedTitle}
            </Text>
          </Tooltip>
        </Box>
        <Box width="25%" paddingX={2}>
          <Progress
            value={progressPercentage}
            colorScheme="blue"
            height="8px"
            width="100%"
            borderRadius="4px"
            backgroundColor={colorMode === 'light' ? "gray.200" : "gray.600"}
          />
        </Box>
        <Text
          fontSize={{ base: "12px", md: "13px", lg: "14px" }}
          color={colorMode === 'light' ? "gray.600" : "gray.400"}
          width="15%"
          textAlign="right"
        >
          {progress} / {totalQuestions}
        </Text>
        <Box
          as="button"
          paddingX={4}
          paddingY={1}
          marginLeft={2}
          borderRadius="full"
          backgroundColor={colorMode === 'light' ? "brand.primary.light" : "brand.primary.dark"}
          color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
          fontWeight="bold"
          fontSize={{ base: "12px", md: "13px", lg: "14px" }}
          border="1px solid"
          borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
          boxShadow={colorMode === 'light' 
            ? "0 2px 0 0 black"
            : "0 2px 0 0 rgba(255, 255, 255, 0.2)"
          }
          _hover={{ 
            backgroundColor: colorMode === 'light' ? "brand.primary.dark" : "brand.primary.light"
          }}
          _active={{ 
            boxShadow: "none", 
            transform: "translateY(2px)" 
          }}
          onClick={handleContinue}
        >
          Continue
        </Box>
      </Flex>
    );
  }
});

export default ExamCard;