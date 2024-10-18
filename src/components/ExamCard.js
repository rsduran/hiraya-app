import React from 'react';
import { Box, Text, Progress, Flex, Tooltip, Image } from '@chakra-ui/react';

const badgeUrls = {
  "AWS Certified Cloud Practitioner": "https://d1.awsstatic.com/certification/badges/AWS-Certified-Cloud-Practitioner_badge_150x150.17da917fbddc5383838d9f8209d2030c8d99f31e.png",
  "AWS Certified Solutions Architect - Associate": "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Solutions-Architect-Associate_badge.3419559c682629072f1eb968d59dea0741772c0f.png",
  "AWS Certified Developer - Associate": "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Developer-Associate_badge.5c083fa855fe82c1cf2d0c8b883c265ec72a17c0.png",
  "AWS Certified SysOps Administrator - Associate": "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-SysOps-Administrator-Associate_badge.c3586b02748654fb588633314dd66a1d6841893b.png",
  "AWS Certified DevOps Engineer - Professional": "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-DevOps-Engineer-Professional_badge.7492bf660b5351e51f3f8015e4818924294a7e8c.png"
};

const ExamCard = ({ title, progress, totalQuestions, view }) => {
  const progressPercentage = (progress / totalQuestions) * 100;

  if (view === 'grid') {
    return (
      <Box
        backgroundColor="white"
        borderRadius="12px"
        border="1px solid black"
        boxShadow="0 4px 0 0 black"
        padding={3}
        width={{ base: "100%", sm: "250px", md: "280px", lg: "300px" }}
        height="280px"
        flexShrink={0}
        display="flex"
        flexDirection="column"
      >
        <Tooltip label={title} isDisabled={title.length <= 50}>
          <Text 
            fontSize={{ base: "14px", md: "16px", lg: "18px" }}
            fontWeight="bold" 
            marginBottom={2}
            lineHeight="1.2"
            height="2.4em"
            overflow="hidden"
            textOverflow="ellipsis"
            display="-webkit-box"
            sx={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {title}
          </Text>
        </Tooltip>
        <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center" marginBottom={2}>
          <Image 
            src={badgeUrls[title] || "/api/placeholder/100/100"}
            alt={`${title} badge`}
            maxWidth="100px"
            maxHeight="100px"
            objectFit="contain"
          />
        </Box>
        <Progress 
          value={progressPercentage} 
          colorScheme="blue" 
          marginBottom={2} 
          height="8px" 
          width="100%"
          borderRadius="4px"
          backgroundColor="gray.200"
        />
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize={{ base: "12px", md: "13px", lg: "14px" }} color="gray.600">{progress} / {totalQuestions} questions</Text>
          <Box
            as="button"
            paddingX={4}
            paddingY={1}
            borderRadius="full"
            backgroundColor="#00bfff"
            color="black"
            fontWeight="bold"
            fontSize={{ base: "12px", md: "13px", lg: "14px" }}
            border="1px solid black"
            boxShadow="0 2px 0 0 black"
            _hover={{ backgroundColor: "#00a6d6" }}
            _active={{ boxShadow: "none", transform: "translateY(2px)" }}
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
        paddingLeft={4} // Indent the exam in list view
        borderBottom="1px solid #E2E8F0"
      >
        <Box flex="1" minWidth="200px">
          <Tooltip label={title} isDisabled={title.length <= 50}>
            <Text 
              fontSize={{ base: "14px", md: "16px", lg: "18px" }}
              fontWeight="bold"
              isTruncated
            >
              {title}
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
            backgroundColor="gray.200"
          />
        </Box>
        <Text fontSize={{ base: "12px", md: "13px", lg: "14px" }} color="gray.600" width="15%" textAlign="right">
          {progress} / {totalQuestions}
        </Text>
        <Box
          as="button"
          paddingX={4}
          paddingY={1}
          marginLeft={2}
          borderRadius="full"
          backgroundColor="#00bfff"
          color="black"
          fontWeight="bold"
          fontSize={{ base: "12px", md: "13px", lg: "14px" }}
          border="1px solid black"
          boxShadow="0 2px 0 0 black"
          _hover={{ backgroundColor: "#00a6d6" }}
          _active={{ boxShadow: "none", transform: "translateY(2px)" }}
        >
          Continue
        </Box>
      </Flex>
    );
  }
};

export default ExamCard;