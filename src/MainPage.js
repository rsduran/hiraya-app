import React, { useState } from 'react';
import { ChakraProvider, extendTheme, Flex, Box, VStack } from '@chakra-ui/react';
import '@fontsource-variable/karla/wght.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import QuestionPanel from './components/QuestionPanel';
import TopicBox from './components/TopicBox';
import DownloadBox from './components/DownloadBox';
import Breadcrumbs from './components/Breadcrumbs';

const theme = extendTheme({
  fonts: {
    body: '"Karla Variable", sans-serif',
  },
  components: {
    Button: {
      variants: {
        referral: {
          height: '48px',
          fontSize: '16px',
          px: '24px',
          borderRadius: 'full',
          border: '2px solid black',
          fontWeight: 700,
          textTransform: 'uppercase',
          transition: '0.3s',
          boxShadow: '0 4px 0 0 black',
          _hover: {
            transform: 'translateY(2px)',
            boxShadow: '0 2px 0 0 black',
          },
          _active: {
            transform: 'translateY(4px)',
            boxShadow: 'none',
          },
          borderRight: '0',
          _first: {
            borderTopLeftRadius: 'full',
            borderBottomLeftRadius: 'full',
          },
          _last: {
            borderRight: '2px solid black',
            borderTopRightRadius: 'full',
            borderBottomRightRadius: 'full',
          },
        },
      },
    },
  },
});

const MainPage = () => {
  const [isStarFilled, setIsStarFilled] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const questionNumber = 1;
  const totalQuestions = 10;
  const questionText = "A company is planning to run a global marketing application in the AWS Cloud. The application will feature videos that can be viewed by users. The company must ensure that all users can view these videos with low latency. Which AWS service should the company use to meet this requirement?";

  const toggleStar = (event) => {
    event.stopPropagation();
    setIsStarFilled(!isStarFilled);
  };

  const options = [
    "AWS Auto Scaling",
    "Amazon Kinesis Video Streams",
    "Elastic Load Balancing",
    "Amazon CloudFront"
  ];

  const answerData = {
    answer: "A",
    answerDescription: "",
    votes: [
      { answer: "A", count: 34, isMostVoted: true },
      { answer: "B", count: 18, isMostVoted: false },
      { answer: "D", count: 3, isMostVoted: false },
      { answer: "C", count: 1, isMostVoted: false }
    ],
  };

  const tabs = ['ALL QUESTIONS', 'FAVORITES', 'ANSWERED', 'UNANSWERED', 'INCORRECT'];

  const handleTabChange = (tab) => {
    console.log(`Tab changed to: ${tab}`);
  };

  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
  };

  const handleShuffle = () => {
    console.log('Shuffling questions');
  };

  const handleReset = () => {
    console.log('Resetting questions');
  };

  const handleSubmit = () => {
    console.log('Submitting answer');
    // Add your submit logic here
  };

  // Breadcrumbs data
  const breadcrumbsData = [
    { label: 'Providers', href: '/providers' },
    { label: 'Amazon', href: '/providers/amazon' },
    { label: 'AWS Certified Cloud Practitioner (CLF-C02)', href: '/providers/amazon/aws-certified-cloud-practitioner-clf-c02', isCurrentPage: true },
  ];

  return (
    <ChakraProvider theme={theme}>
      <Flex height="100vh">
        <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
        <Flex direction="column" flex={1} overflow="hidden">
          <Navbar activeItem={activeItem}>
            {activeItem === 'Actual Exam' && <Breadcrumbs items={breadcrumbsData} />}
          </Navbar>
          <Flex flex={1} overflow="auto" p={8}>
            {activeItem === 'Actual Exam' ? (
              <>
                <Flex flex={3} minWidth="300px" marginRight={8}>
                  <Box width="100%" maxWidth="1200px">
                    <QuestionPanel
                      width="100%"
                      onSearch={handleSearch}
                      onShuffle={handleShuffle}
                      onReset={handleReset}
                      onSubmit={handleSubmit}
                      tabs={tabs}
                      onTabChange={handleTabChange}
                      questionNumber={questionNumber}
                      totalQuestions={totalQuestions}
                      questionText={questionText}
                      isStarFilled={isStarFilled}
                      toggleStar={toggleStar}
                      options={options}
                      answer={answerData.answer}
                      answerDescription={answerData.answerDescription}
                      votes={answerData.votes}
                    />
                  </Box>
                </Flex>
                <VStack flex={1} minWidth="200px" spacing={8}>
                  <TopicBox
                    topicNumber={1}
                    courseName="CLF-C02"
                    courseFullName="AWS CERTIFIED CLOUD PRACTITIONER"
                  />
                  <Box width="100%" pt={6}>
                    <DownloadBox />
                  </Box>
                </VStack>
              </>
            ) : (
              <Box>Content for {activeItem}</Box>
            )}
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default MainPage;