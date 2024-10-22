import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import {
  VStack, 
  Flex,
  Input,
  Box,
  Container,
  Center,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import { LuGrid, LuList } from "react-icons/lu";
import { IconBox } from "./IconBox";
import CategoriesDropdown from "./CategoriesDropdown";
import Pagination from "./Pagination";
import { debounce } from "lodash";

const CategoryCard = lazy(() => import("./CategoryCard"));

const LoadingSpinner = () => {
  const { colorMode } = useColorMode();
  
  return (
    <Center height="200px">
      <Spinner 
        size="xl" 
        color={colorMode === 'light' ? "brand.primary.light" : "brand.primary.dark"} 
        thickness="4px" 
      />
    </Center>
  );
};

const ProvidersPage = () => {
  const { colorMode } = useColorMode();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [view, setView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const categoriesPerPage = 2;

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/provider-statistics');
        if (!response.ok) {
          throw new Error('Failed to fetch provider statistics');
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (err) {
        console.error('Error fetching providers:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const categoryNames = useMemo(() => 
    ["All Categories", ...categories.map(category => category.name)],
    [categories]
  );

  const filteredCategories = useMemo(() => {
    let filtered = categories;
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(category => category.name === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.map(category => ({
        ...category,
        providers: category.providers.filter(provider =>
          provider.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.providers.length > 0);
    }
    return filtered;
  }, [categories, selectedCategory, searchTerm]);

  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * categoriesPerPage;
    const endIndex = startIndex + categoriesPerPage;
    return filteredCategories.slice(startIndex, endIndex);
  }, [filteredCategories, currentPage]);

  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchTerm(value), 300),
    []
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Center>
        <Box 
          fontSize="xl" 
          color={colorMode === 'light' ? "red.500" : "red.300"}
        >
          Error: {error}
        </Box>
      </Center>
    );
  }

  return (
    <Container maxWidth="100%" paddingLeft={4} paddingRight={4}>
      <VStack spacing={8} align="stretch" width="100%">
        {/* Search and Controls */}
        <Flex
          alignItems="center"
          justifyContent="space-between"
          gap={4}
          flexWrap="wrap"
        >
          <Input
            placeholder="Search providers..."
            size="lg"
            width={{ base: "100%", md: "400px" }}
            onChange={(e) => debouncedSearch(e.target.value)}
            backgroundColor={colorMode === 'light' ? "brand.background.light" : "brand.surface.dark"}
            color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
            borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
            _placeholder={{
              color: colorMode === 'light' ? "gray.500" : "gray.400"
            }}
          />
          <Flex alignItems="center" gap={4}>
            <Box width="250px">
              <CategoriesDropdown
                categories={categoryNames}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </Box>
            <Flex gap={2}>
              <IconBox
                icon={LuGrid}
                size="48px"
                iconScale={0.4}
                borderThickness={3}
                bgColor={view === "grid" 
                  ? colorMode === 'light' ? "brand.secondary.light" : "brand.secondary.dark"
                  : colorMode === 'light' ? "brand.background.light" : "brand.surface.dark"
                }
                onClick={() => setView("grid")}
              />
              <IconBox
                icon={LuList}
                size="48px"
                iconScale={0.4}
                borderThickness={3}
                bgColor={view === "list" 
                  ? colorMode === 'light' ? "brand.secondary.light" : "brand.secondary.dark"
                  : colorMode === 'light' ? "brand.background.light" : "brand.surface.dark"
                }
                onClick={() => setView("list")}
              />
            </Flex>
          </Flex>
        </Flex>
        
        {/* Categories */}
        {paginatedCategories.length === 0 ? (
          <Center>
            <Box 
              fontSize="xl" 
              textAlign="center" 
              marginY={8}
              color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
            >
              No providers found. Try adjusting your search or selected category.
            </Box>
          </Center>
        ) : (
          <VStack spacing={6} width="100%">
            {paginatedCategories.map((category, index) => (
              <Suspense key={index} fallback={<LoadingSpinner />}>
                <CategoryCard
                  categoryName={category.name}
                  providers={category.providers}
                  view={view}
                />
              </Suspense>
            ))}
          </VStack>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </VStack>
    </Container>
  );
};

export default ProvidersPage;