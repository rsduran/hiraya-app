import React, { useState } from "react";
import { Box, Text, Flex, Input, Icon, useColorMode } from "@chakra-ui/react";
import { BsBookmarkFill } from "react-icons/bs";
import ExamCard from "./ExamCard";

const ProviderCard = ({ providerName, exams, view, isPopular }) => {
  const { colorMode } = useColorMode();
  const [searchTerm, setSearchTerm] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  const filteredExams = exams.filter((exam) =>
    exam.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const renderExams = () => {
    if (filteredExams.length === 0) {
      return (
        <Box paddingY={4} textAlign="center">
          <Text 
            fontSize="lg" 
            color={colorMode === 'light' ? "gray.600" : "gray.400"}
          >
            No exams or questions available for this provider.
          </Text>
        </Box>
      );
    }

    if (view === "grid") {
      return (
        <Box overflowX="auto" paddingBottom={4}>
          <Flex gap={6}>
            {filteredExams.map((exam, index) => (
              <ExamCard
                key={index}
                title={exam.title}
                progress={exam.progress}
                totalQuestions={exam.totalQuestions}
                view={view}
                examId={exam.id}
              />
            ))}
          </Flex>
        </Box>
      );
    } else {
      return (
        <Box>
          {filteredExams.map((exam, index) => (
            <ExamCard
              key={index}
              title={exam.title}
              progress={exam.progress}
              totalQuestions={exam.totalQuestions}
              view={view}
              examId={exam.id}
            />
          ))}
        </Box>
      );
    }
  };

  return (
    <Box
      backgroundColor={colorMode === 'light' ? "brand.surface.light" : "brand.surface.dark"}
      borderRadius="20px"
      border="1px solid"
      borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
      boxShadow={colorMode === 'light' 
        ? "0 4px 0 0 black"
        : "0 4px 0 0 rgba(255, 255, 255, 0.2)"
      }
      padding={6}
      marginBottom={8}
      width="100%"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        marginBottom={6}
        flexWrap="wrap"
        gap={4}
      >
        <Flex alignItems="center" gap={4}>
          <Text
            fontSize={{ base: "24px", md: "26px", lg: "28px" }}
            fontWeight="bold"
            color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
          >
            {providerName}
          </Text>
          {isPopular && (
            <Box
              paddingX={2}
              paddingY={0}
              borderRadius="full"
              display="inline-block"
              alignSelf="center"
              border="1px solid"
              borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
              bgGradient={colorMode === 'light' 
                ? "linear(to-r, #FFD700, #FFA500)"
                : "linear(to-r, #B8860B, #CD853F)"  // Darker gold gradient for dark mode
              }
            >
              <Text 
                fontSize="14px" 
                fontWeight="500" 
                color={colorMode === 'light' ? "black" : "white"}
              >
                Popular
              </Text>
            </Box>
          )}
        </Flex>
        <Flex alignItems="center" gap={4}>
          <Box
            as="button"
            onClick={toggleBookmark}
            transition="all 0.2s"
            _hover={{ transform: "scale(1.1)" }}
            _active={{ transform: "scale(0.9)" }}
          >
            <Icon
              as={BsBookmarkFill}
              color={isBookmarked 
                ? "#FFD700"  // Keep original gold color for bookmark
                : colorMode === 'light' ? "white" : "gray.600"
              }
              boxSize={6}
              strokeWidth={1}
              stroke={colorMode === 'light' ? "black" : "white"}
              transition="all 0.2s"
            />
          </Box>
          <Input
            placeholder="Search exams..."
            size="md"
            width={{ base: "100%", sm: "200px", md: "250px", lg: "300px" }}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            backgroundColor={colorMode === 'light' ? "brand.background.light" : "brand.surface.dark"}
            color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
            borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
            _placeholder={{
              color: colorMode === 'light' ? "gray.500" : "gray.400"
            }}
          />
        </Flex>
      </Flex>
      {renderExams()}
    </Box>
  );
};

export default ProviderCard;