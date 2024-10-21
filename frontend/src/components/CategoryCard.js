import React, { useState } from "react";
import { Box, Text, Flex, Input, Icon } from "@chakra-ui/react";
import { BsBookmarkFill } from 'react-icons/bs';
import ProviderInfoCard from "./ProviderInfoCard";

const CategoryCard = ({ categoryName, providers, view }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const filteredProviders = providers.filter(provider => 
    provider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Box
      backgroundColor="#f2f2f3"
      borderRadius="20px"
      border="1px solid black"
      boxShadow="0 4px 0 0 black"
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
        <Text
          fontSize={{ base: "24px", md: "26px", lg: "28px" }}
          fontWeight="bold"
        >
          {categoryName}
        </Text>
        <Flex alignItems="center" gap={4}>
          <Box
            as="button"
            onClick={toggleBookmark}
            transition="all 0.2s"
            _hover={{ transform: 'scale(1.1)' }}
            _active={{ transform: 'scale(0.9)' }}
          >
            <Icon
              as={BsBookmarkFill}
              color={isBookmarked ? "#FFD700" : "white"}
              boxSize={6}
              strokeWidth={1}
              stroke="black"
              transition="all 0.2s"
            />
          </Box>
          <Input
            placeholder="Search providers..."
            size="md"
            width={{ base: "100%", sm: "200px", md: "250px", lg: "300px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            backgroundColor="white"
          />
        </Flex>
      </Flex>
      {view === "grid" ? (
        <Box overflowX="auto" paddingBottom={4}>
          <Flex gap={6} wrap="nowrap" width={`calc(300px * ${Math.ceil(filteredProviders.length / 5)} + 24px * ${Math.ceil(filteredProviders.length / 5) - 1})`}>
            {filteredProviders.map((provider, index) => (
              <Box
                key={index}
                flex="0 0 auto"
                width="300px"
              >
                <ProviderInfoCard
                  provider={provider}
                  view={view}
                />
              </Box>
            ))}
          </Flex>
        </Box>
      ) : (
        <Box>
          {filteredProviders.map((provider, index) => (
            <ProviderInfoCard
              key={index}
              provider={provider}
              view={view}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CategoryCard;