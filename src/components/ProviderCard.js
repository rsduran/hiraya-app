import React, { useState } from 'react';
import { Box, Text, Flex, Input } from '@chakra-ui/react';
import ExamCard from './ExamCard';

const ProviderCard = ({ providerName, exams, view }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExams = exams.filter(exam => 
    exam.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Text fontSize={{ base: "24px", md: "26px", lg: "28px" }} fontWeight="bold">{providerName}</Text>
        <Input
          placeholder="Search exams..."
          size="md"
          width={{ base: "100%", sm: "200px", md: "250px", lg: "300px" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          backgroundColor="white"
        />
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
                view={view} // Pass the view prop to ExamCard
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
              view={view} // Pass the view prop to ExamCard
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProviderCard;