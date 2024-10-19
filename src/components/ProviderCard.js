import React, { useState } from 'react';
import { Box, Text, Flex, Input, Icon } from '@chakra-ui/react';
import { BsBookmarkFill } from 'react-icons/bs';
import ExamCard from './ExamCard';

const ProviderCard = ({ providerName, exams, view }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const filteredExams = exams.filter(exam => 
    exam.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularProviders = ['Amazon Web Services (AWS)', 'Microsoft Azure', 'Google Cloud'];
  const isPopular = popularProviders.includes(providerName);

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
      <Flex justifyContent="space-between" alignItems="center" marginBottom={6} flexWrap="wrap" gap={4}>
        <Flex alignItems="center" gap={4}>
          <Text fontSize={{ base: "24px", md: "26px", lg: "28px" }} fontWeight="bold">
            {providerName}
          </Text>
          {isPopular && (
            <Box
              px={2}
              py={0}
              borderRadius="full"
              display="inline-block"
              alignSelf="center"
              border="1px solid black"
              bgGradient="linear(to-r, #FFD700, #FFA500)"
            >
              <Text fontSize="14px" fontWeight="500" color="black">
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
            placeholder="Search exams..."
            size="md"
            width={{ base: "100%", sm: "200px", md: "250px", lg: "300px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            backgroundColor="white"
          />
        </Flex>
      </Flex>
      {view === 'grid' ? (
        <Box overflowX="auto" paddingBottom={4}>
          <Flex gap={6}>
            {filteredExams.map((exam, index) => (
              <ExamCard 
                key={index} 
                title={exam.title} 
                progress={exam.progress} 
                totalQuestions={exam.totalQuestions} 
                view={view}
              />
            ))}
          </Flex>
        </Box>
      ) : (
        <Box>
          {filteredExams.map((exam, index) => (
            <ExamCard 
              key={index} 
              title={exam.title} 
              progress={exam.progress} 
              totalQuestions={exam.totalQuestions} 
              view={view}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProviderCard;