import React, { useState, useRef, useEffect } from "react";
import { Box, Text, Progress, Flex, Tooltip, Image } from "@chakra-ui/react";

const badgeUrls = {
  // AWS
  "AWS Certified Cloud Practitioner":
    "https://d1.awsstatic.com/certification/badges/AWS-Certified-Cloud-Practitioner_badge_150x150.17da917fbddc5383838d9f8209d2030c8d99f31e.png",
  "AWS Certified Solutions Architect - Associate":
    "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Solutions-Architect-Associate_badge.3419559c682629072f1eb968d59dea0741772c0f.png",
  "AWS Certified Developer - Associate":
    "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Developer-Associate_badge.5c083fa855fe82c1cf2d0c8b883c265ec72a17c0.png",
  "AWS Certified SysOps Administrator - Associate":
    "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-SysOps-Administrator-Associate_badge.c3586b02748654fb588633314dd66a1d6841893b.png",
  "AWS Certified DevOps Engineer - Professional":
    "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-DevOps-Engineer-Professional_badge.7492bf660b5351e51f3f8015e4818924294a7e8c.png",
  // Microsoft Azure
  "AZ-900: Microsoft Azure Fundamentals":
    "https://images.credly.com/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
  "AZ-104: Microsoft Azure Administrator":
    "https://images.credly.com/images/336eebfc-0ac3-4553-9a67-b402f491f185/azure-administrator-associate-600x600.png",
  "AZ-204: Developing Solutions for Microsoft Azure":
    "https://images.credly.com/images/63316b60-f62d-4e51-aacc-c23cb850089c/azure-developer-associate-600x600.png",
  "AZ-305: Designing Microsoft Azure Infrastructure Solutions":
    "https://images.credly.com/images/9d7dc4c0-5681-41fc-b96b-26e9157786d7/image.png",
  "AZ-400: Designing and Implementing Microsoft DevOps Solutions":
    "https://images.credly.com/images/c3ab66f8-5d59-4afa-a6c2-0ba30a1989ca/CERT-Expert-DevOps-Engineer-600x600.png",
  // Cisco
  "CCNA: Cisco Certified Network Associate":
    "https://images.credly.com/images/683783d8-eaac-4c37-a14d-11bd8a36321d/twitter_thumb_201604_ccna_600.png",
  "CCNP Enterprise":
    "https://images.credly.com/size/680x680/images/84b3d8a1-385f-4827-a70d-ddbb6da72eff/Cisco_Specialist_600.png",
  "CCNP Security":
    "https://images.credly.com/images/cd769843-4907-4d1a-9702-0512eb87ae6e/cisco_ccnp_security.png",
  "CCNP Data Center":
    "https://images.credly.com/images/94815c25-cd60-4d27-b722-45c62ef03fa6/twitter_thumb_201604_cisco_ccnp_datacenter.png",
  "Cisco Certified DevNet Professional":
    "https://images.credly.com/images/3c535132-dd19-4e1b-9861-535d27dfbbb6/twitter_thumb_201604_DevNetPro_600.png",
  // CompTIA
  "CompTIA A+":
    "https://images.credly.com/images/a81e53e7-3649-4366-917d-9611bb74c10c/CompTIA_A_2B.png",
  "CompTIA Network+":
    "https://images.credly.com/images/e1fc05b2-959b-45a4-8d20-124b1df121fe/CompTIA_Network_2Bce.png",
  "CompTIA Security+":
    "https://images.credly.com/images/74790a75-8451-400a-8536-92d792c5184a/CompTIA_Security_2Bce.png",
  "CompTIA Cloud+":
    "https://images.credly.com/images/4a1a7339-ce0f-458a-9ee7-620416e68c19/CompTIA_Cloud_2Bce.png",
  "CompTIA CySA+":
    "https://images.credly.com/images/5cb4b153-44d8-410c-97c6-6afba3faa4af/Comptia_CySA_2Bce.png",
  // Google Cloud
  "Google Cloud Digital Leader":
    "https://images.credly.com/images/44994cda-b5b0-44cb-9a6d-d29b57163073/twitter_thumb_201604_image.png",
  "Google Cloud Associate Cloud Engineer":
    "https://images.credly.com/size/340x340/images/08096465-cbfc-4c3e-93e5-93c5aa61f23e/image.png",
  "Google Cloud Professional Cloud Architect":
    "https://images.credly.com/images/71c579e0-51fd-4247-b493-d2fa8167157a/twitter_thumb_201604_image.png",
  "Google Cloud Professional Data Engineer":
    "https://images.credly.com/images/2d613ff8-8879-430b-b2d8-925fa29785e8/twitter_thumb_201604_image.png",
  "Google Cloud Professional Cloud DevOps Engineer":
    "https://images.credly.com/images/33f08b7e-fa6a-41cd-810a-21cc1c336f6d/twitter_thumb_201604_image.png",
};


const ExamCard = React.memo(({ title, progress, totalQuestions, view }) => {
  const progressPercentage = (progress / totalQuestions) * 100;

  const BadgeImage = ({ size }) => (
    <Image
      src={badgeUrls[title] || `/api/placeholder/${size}/${size}`}
      alt={`${title} badge`}
      width={`${size}px`}
      height={`${size}px`}
      objectFit="contain"
    />
  );

  // Hooks must be called at the top level
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
  }, [title, view]);

  if (view === "grid") {
    return (
      <Box
        backgroundColor="white"
        borderRadius="12px"
        border="1px solid black"
        boxShadow="0 4px 0 0 black"
        padding={3}
        width={{ base: "100%", sm: "250px", md: "280px", lg: "300px" }}
        height="300px"
        flexShrink={0}
        display="flex"
        flexDirection="column"
      >
        <Tooltip label={title} isDisabled={!isTruncatedGrid}>
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
            sx={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
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
          backgroundColor="gray.200"
        />
        <Flex justifyContent="space-between" alignItems="center">
          <Text
            fontSize={{ base: "12px", md: "13px", lg: "14px" }}
            color="gray.600"
          >
            {progress} / {totalQuestions} questions
          </Text>
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
        paddingLeft={4}
        borderBottom="1px solid #E2E8F0"
      >
        <Box width="80px" height="80px" marginRight={4} flexShrink={0}>
          <BadgeImage size={80} />
        </Box>
        <Box flex="1" minWidth="200px">
          <Tooltip label={title} isDisabled={!isTruncatedList}>
            <Text
              ref={textRefList}
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
        <Text
          fontSize={{ base: "12px", md: "13px", lg: "14px" }}
          color="gray.600"
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
});

export default ExamCard;