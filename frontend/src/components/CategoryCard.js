import React, { useState } from "react";
import { Box, Text, Flex, Input, Icon, useColorMode } from "@chakra-ui/react";
import { BsBookmarkFill } from 'react-icons/bs';
import ProviderInfoCard from "./ProviderInfoCard";

const CategoryCard = ({ categoryName, providers, view }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { colorMode } = useColorMode();

  const filteredProviders = providers.filter(provider => 
    provider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Box
      backgroundColor={colorMode === 'light' ? "brand.surface.light" : "brand.surface.dark"}
      borderRadius="20px"
      border="1px solid"
      borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
      boxShadow={colorMode === 'light' 
        ? "0 4px 0 0 black" 
        : "0 4px 0 0 rgba(255, 255, 255, 0.2)"}
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
          color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
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
            backgroundColor="transparent"
          >
            <Icon
              as={BsBookmarkFill}
              color={isBookmarked 
                ? "brand.primary.light"
                : colorMode === 'light' 
                  ? "brand.background.light" 
                  : "brand.background.dark"}
              boxSize={6}
              strokeWidth={1}
              stroke={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
              transition="all 0.2s"
            />
          </Box>
          <Input
            placeholder="Search providers..."
            size="md"
            width={{ base: "100%", sm: "200px", md: "250px", lg: "300px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            backgroundColor={colorMode === 'light' ? "brand.background.light" : "brand.surface.dark"}
            color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
            borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
            _placeholder={{
              color: colorMode === 'light' 
                ? "rgba(0, 0, 0, 0.6)" 
                : "rgba(255, 255, 255, 0.6)"
            }}
          />
        </Flex>
      </Flex>
      {view === "grid" ? (
        <Box overflowX="auto" paddingBottom={4}>
          <Flex 
            gap={6} 
            wrap="nowrap" 
            width={`calc(300px * ${Math.ceil(filteredProviders.length / 5)} + 24px * ${Math.ceil(filteredProviders.length / 5) - 1})`}
          >
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